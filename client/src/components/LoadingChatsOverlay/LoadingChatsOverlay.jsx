import React from 'react';
import { LineLoader } from 'Src/components/LineLoader';
import { LoadingChatsIcon } from 'Src/components/SvgIcons/LoadingChatsIcon';
import './LoadingChatsOverlay.scss';

export const LoadingChatsOverlay = () => {
  return (
    <div className="loading-chats-overlay-wrapper">
      <div className="loading-chats-overlay">
        <LoadingChatsIcon />
        <LineLoader />
      </div>
    </div>
  );
};
