import React, { useState } from 'react';
import { SearchIcon } from 'Src/components/SvgIcons/SearchIcon';
import { ArrowIcon } from 'Src/components/SvgIcons/ArrowIcon';
import { RemoveIcon } from 'Src/components/SvgIcons/RemoveIcon';
import './ChatSearchPanel.scss';

export const ChatSearchPanel = (props) => {
  const { onSearch } = props;

  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
    onSearch(event.target.value);
  };

  const onClearClick = () => {
    setValue('');
    onSearch('');
  };

  return (
    <div className="chat-search-panel">
      <div className="search-field-wrapper">
        <button>{isFocus ? <ArrowIcon /> : <SearchIcon />}</button>

        <input
          type="text"
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          placeholder="Поиск или новый чат"
          className="chat-search-panel__input"
        />

        {value !== '' && (
          <button onClick={onClearClick}>
            <RemoveIcon />
          </button>
        )}
      </div>
    </div>
  );
};
