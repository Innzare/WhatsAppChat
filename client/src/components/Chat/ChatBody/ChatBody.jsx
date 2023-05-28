import React, { useEffect, useRef } from 'react';
import propz from 'propz';
import { classnames } from 'Src/helpers/classnames';
import { formatTime } from 'Src/helpers/messages';
import { ClockIcon } from 'Src/components/SvgIcons/ClockIcon';
import { Loader } from 'Src/components/Loader';
import './ChatBody.scss';

export const ChatBody = (props) => {
  const { messages, isLoading } = props;
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (!isLoading) {
      scrollToBottom();
    }
  }, [isLoading]);

  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  };

  const renderMessages = () => {
    return messages.map((item, index, array) => {
      const timestamp = propz.get(item, ['timestamp'], new Date().getTime());

      const nextItem = array[index + 1];
      const prevItem = array[index - 1];

      const senderId = propz.get(item, ['senderId']);
      const nextMessageSenderId = propz.get(nextItem, ['senderId']);
      const prevMessageSenderId = propz.get(prevItem, ['senderId']);

      const type = propz.get(item, ['type'], '');
      const nextMessageType = propz.get(nextItem, ['type'], '');
      const prevMessageType = propz.get(prevItem, ['type'], '');

      const idMessage = propz.get(item, ['idMessage'], '');
      const typeMessage = propz.get(item, ['typeMessage'], '');
      const fileName = propz.get(item, ['fileName'], '');
      const textMessage = propz.get(item, ['textMessage'], '');

      const isTemplate = propz.get(item, ['isTemplate'], false);

      const hours = new Date(timestamp).getHours();
      const minutes = new Date(timestamp).getMinutes();

      const hoursFormatted = formatTime(hours);
      const minutesFormatted = formatTime(minutes);
      const time = `${hoursFormatted}:${minutesFormatted}`;

      const text = typeMessage === 'documentMessage' ? fileName : textMessage;

      const isFirstItem = index === 0;
      const isLastItem = array.length - 1 === index;

      const isCurrentMessageTypeIncoming = type === 'incoming';
      const isNextMessageTypeIncoming = nextMessageType === 'incoming';
      const isCurrentMessageTypeOutgoing = type === 'outgoing';

      const isPrevSenderSame = prevMessageSenderId === senderId;
      const isNextSenderSame = nextMessageSenderId === senderId;
      const isPrevMessageTypeSame = prevMessageType === type;

      const isNextSenderSameAndNotLast = !isLastItem && isNextSenderSame;
      const isPrevSenderOther =
        isFirstItem || !isPrevMessageTypeSame || (isCurrentMessageTypeIncoming && !isPrevSenderSame);

      const classes = classnames({
        'chat-message-wrapper': true,
        'chat-last-message-wrapper': isLastItem,
        'chat-outgoing-message-wrapper': isCurrentMessageTypeOutgoing,
        'chat-last-outgoing-message-wrapper': isCurrentMessageTypeOutgoing && !isLastItem && isNextMessageTypeIncoming,
        'chat-same-message-wrapper': isNextSenderSameAndNotLast
      });

      return (
        <div key={idMessage + index} className={classes}>
          <div className={isPrevSenderOther ? 'chat-message chat-first-message' : 'chat-message'}>
            {text}
            <span>{isTemplate ? <ClockIcon /> : time}</span>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="chat-body-wrapper">
      <div className="chat-body" ref={chatBodyRef}>
        {isLoading ? <Loader /> : renderMessages()}
      </div>
    </div>
  );
};
