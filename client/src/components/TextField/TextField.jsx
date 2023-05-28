import React from 'react';
import './TextField.scss';

export const TextField = (props) => {
  const { label = '', tip, value, onChange, node = undefined, darkMode = false } = props;
  const isTipExist = typeof tip !== 'undefined' && tip !== '';

  return (
    <div className={darkMode ? 'textfield textfield--dark' : 'textfield'}>
      <input value={value} onChange={onChange} ref={node} />
      <label>{label}</label>

      {isTipExist && <p>{tip}</p>}
    </div>
  );
};
