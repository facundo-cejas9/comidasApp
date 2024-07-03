import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Link, useNavigate } from "react-router-dom";

export const RecoveryPage = () => {
  const { url, setRecoveryEmail, setPasswordToken } = useContext(StoreContext);
  const [storedEmail, setStoredEmail] = useState("");

  useEffect(() => {
    const emailFromStorage = localStorage.getItem("recoveryEmail");
    if (emailFromStorage) {
      setStoredEmail(emailFromStorage);
      setRecoveryEmail(emailFromStorage); // Actualiza el email de recuperación en el contexto si es necesario
    }
  }, [setRecoveryEmail]);

  const navigate = useNavigate()

  const handleBack = () => {
    setRecoveryEmail("")
    localStorage.getItem("passwordResetToken")
    localStorage.removeItem("recoveryEmail"); // Elimina el email de recuperación de la memoria local si se vuelve a la página de inicio
    navigate('/')
  }

  return (
    <div className="container">
      <div className="error-page">
        <div className="error">
          <h1>Correo enviado a {storedEmail}</h1>
          <p>Revisa tu bandeja de spam para recuperar tu contraseña</p>
          <Link to={'/'} onClick={handleBack}>
            <button>Volver al Login</button>
           </Link>
        </div>
      </div>
    </div>
  );
};