const express = require('express');
const whatsAppClient = require("@green-api/whatsapp-api-client");
const app = express();
const PORT = 8081;

const http = require('http').Server(app);
const cors = require('cors');
const socketIO = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:8080'
  }
});

let id;
let token;

const startReceiveNotifications = async () => {
  
  let restAPI = whatsAppClient.restAPI(({
    idInstance: id,
    apiTokenInstance: token
  }));

  try {
        console.log( "Waiting incoming notifications...");
        let response;
        while (response = await restAPI.webhookService.receiveNotification()) {
          let webhookBody = response.body;

          console.log(webhookBody);
          

          switch (true) {
            case webhookBody.typeWebhook === 'incomingMessageReceived':
              console.log('incomingMessageReceived:', webhookBody);
              socketIO.emit('incomingMessageReceived', webhookBody);
              
              await restAPI.webhookService.deleteNotification(response.receiptId);

              break;
            
            case webhookBody.typeWebhook === 'outgoingMessageReceived':
              console.log('outgoingMessageReceived:', webhookBody);
              
              await restAPI.webhookService.deleteNotification(response.receiptId);

              break;

            case webhookBody.typeWebhook === 'outgoingMessageStatus':
              console.log('outgoingMessageStatus:', webhookBody);
              
              await restAPI.webhookService.deleteNotification(response.receiptId);

              break;
        
            default:
              await restAPI.webhookService.deleteNotification(response.receiptId);

              break;
          };
        };
    } catch (ex) {
        console.error(ex.toString());
    }

  console.log("End");
  startReceiveNotifications();
};

socketIO.on('connection', (socket) => {
  console.log('user connected', socket.id);

  socket.on('auth', (userData) => {
    console.log('userData', userData);
    id = userData.id;
    token = userData.token;

    startReceiveNotifications(id, token);
  })

  socket.on('disconnect', (socket) => {
    console.log(`${socket.id} user disconnected`);
  })
});

http.listen(PORT, () => {
  console.log('Server is working');
});