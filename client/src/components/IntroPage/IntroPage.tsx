import React from 'react';
import { IntroPageIcon } from 'Src/components/SvgIcons/IntroPageIcon';
import { LockIcon } from 'Src/components/SvgIcons/LockIcon';
import './IntroPage.scss';

export const IntroPage = () => {
  return (
    <div className="intro-page">
      <IntroPageIcon />

      <div className="intro-page__text">
        <h1>WhatsApp Web</h1>
        <p>Отправляйте и получайте сообщения без необходимости оставлять телефон подключенным.</p>
        <p>Используйте Whats App одновременно на четырёх связанных устройствах и одном телефоне.</p>
      </div>

      <span className="intro-page__encrypted-protect-text">
        <LockIcon />
        Защищено сквозным шифрованием
      </span>
    </div>
  );
};
