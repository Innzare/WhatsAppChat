import React, { useState } from 'react';
import { classnames } from 'Src/helpers/classnames';
import './Drawer.scss';

export const Drawer = (props) => {
  const { isOpen, children } = props;

  const classes = classnames({
    drawer: true,
    'drawer--open': isOpen
  });

  return <div className={classes}>{children}</div>;
};
