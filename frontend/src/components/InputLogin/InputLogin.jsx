import React from 'react'

export const InputLogin = ({ onChange, valueEmail, nameEmail, placeholderEmail,valuePassword, placeholderPassword,namePassword  }) => {
  return (
    <>
              
              <input
                onChange={onChange}
                value={valueEmail}
                type="text"
                placeholder={ placeholderEmail }
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
  )
}
