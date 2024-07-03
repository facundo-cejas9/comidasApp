import React from 'react'

export const InputForgotPassword = ({ onChange, valueEmail, placeholderEmail, nameEmail }) => {
  return (
    <>
         <input
                onChange={onChange}
                value={valueEmail}
                type="text"
                placeholder={ placeholderEmail }
                name={nameEmail}
              />
    </>
  )
}
