import React from "react";

const Search = ({
  type = "text",
  id,
  onInputChange,
  value,
  children,
  isFocused,
}) => {
  const inputRef = React.useRef();

  React.useEffect(() => {
    if(isFocused && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isFocused])

  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input
        type={type}
        id={id}
        onChange={onInputChange}
        value={value}
        autoFocus={isFocused}
        ref={inputRef}
      />
    </>
  );
};

export default Search;
