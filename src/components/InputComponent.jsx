import React from 'react';

export const InputComponent = ({
    inputType,
    inputValue,
    onChangeHandler,
    classes,
    labelText
}) =>{

    return(
    <div className={classes}>
        <label>{labelText}</label>
        <input 
          type={inputType}
          value={inputValue}
          onChange={onChangeHandler}
        />
    </div>
    )
}
