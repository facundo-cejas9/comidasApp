import React from "react";

export const InputRegister = ({placeholderName, name, onChange, valueName, placeholderEmail, nameEmail, valueEmail, valuePassword, placeholderPassword, namePassword}) => {
  return (
    <>
      <input
        type="text"
        placeholder={placeholderName}
        name={name}
        onChange={onChange}
        value={valueName}
      />

      <input
        onChange={onChange}
        value={valueEmail}
        type="text"
        placeholder={placeholderEmail}
        name={nameEmail}
      />
      <input
        onChange={onChange}
        value={valuePassword}
        type="password"
        placeholder={ placeholderPassword }
        name={namePassword}
      />
    </>
  );
};
