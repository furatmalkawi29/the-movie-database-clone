import React from 'react';

export const DropdownMenu = ({ menuClass, content }) => {
  return (
    <div className={menuClass}>
      {content.map((item) => {
        return <div key={item}>{item}</div>;
      })}
    </div>
  );
};
