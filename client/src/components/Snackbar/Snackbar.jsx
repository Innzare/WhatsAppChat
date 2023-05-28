import React from 'react';
import './Snackbar.scss';

export const Snackbar = (props) => {
  const { children, isOpen } = props;

  return <div className={isOpen ? 'snackbar snackbar--open' : 'snackbar'}>{children}</div>;
};
