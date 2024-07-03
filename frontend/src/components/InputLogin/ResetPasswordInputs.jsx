import React from "react";

export const ResetPasswordInputs = ({ onChange, valuePassword, placeholderPassword, namePassword, valueRepeatPassword, placeholderRepeatPassword, nameRepeatPassword }) => {
  return (
    <>
      <input
        onChange={onChange}
        value={valuePassword}
        type="password"
        placeholder={placeholderPassword}
        name={namePassword}
      />

      <input
        onChange={onChange}
        value={valueRepeatPassword}
        type="password"
        placeholder={placeholderRepeatPassword}
        name={nameRepeatPassword}
      />
    </>
  );
};
