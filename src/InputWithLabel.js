import React from "react";
import { useRef, useEffect } from "react";

function InputWithLabel(props) {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <>
      <label htmlFor="todoTitle">{props.children}</label>
      <input
        ref={inputRef}
        id="todoTitle"
        type="text"
        value={props.value}
        onChange={props.onChange}
        name="title"
      ></input>
    </>
  );
}

export default InputWithLabel;
