import React from 'react';
import './PanelActionButton.scss';

export const PanelActionButton = (props) => {
  const { children, onClick } = props;

  return (
    <div role="button" className="panel-action-button" onClick={onClick}>
      {children}
    </div>
  );
};
