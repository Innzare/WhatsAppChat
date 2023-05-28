import React, { useState, useEffect, useRef } from 'react';
import './Popover.scss';

export const Popover = (props) => {
  const { triggerNode, actions = [] } = props;
  const popoverNode = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const onClickOutside = (event) => {
    if (!popoverNode.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.document.addEventListener('click', onClickOutside);

    return () => {
      window.document.removeEventListener('click', onClickOutside);
    };
  }, []);

  return (
    <div className="popover" ref={popoverNode}>
      <div className="popover-trigger" onClick={() => setIsOpen((prev) => !prev)}>
        {triggerNode}
      </div>

      {isOpen && (
        <div className="popover-inner">
          <ul>
            {actions.map((item) => {
              return (
                <li
                  key={item.text}
                  onClick={() => {
                    item.action();
                    setIsOpen(false);
                  }}
                >
                  {item.text}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
