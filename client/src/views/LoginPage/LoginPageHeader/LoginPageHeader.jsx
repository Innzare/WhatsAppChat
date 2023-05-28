import React from 'react';
import { WhatsAppIcon } from 'Src/components/SvgIcons/WhatsAppIcon';
import './LoginPageHeader.scss';

export const LoginPageHeader = () => {
  return (
    <header className="login-page-header">
      <WhatsAppIcon />
      <div>WHATSAPP WEB</div>
    </header>
  );
};
