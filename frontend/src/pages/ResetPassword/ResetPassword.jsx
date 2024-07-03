import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ResetPasswordInputs } from "../../components/InputLogin/ResetPasswordInputs";
import "./ResetPassword.css";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

export const ResetPassword = () => {
  const { url, setPasswordToken, passwordToken } = useContext(StoreContext);
  const { id: urlId, token: urlToken } = useParams(); // Obtiene id y token de la URL
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const storedPasswordToken = localStorage.getItem('passwordResetToken');
    
    // Verifica si el token almacenado coincide con el token de la URL y el contexto
    if (storedPasswordToken !== urlToken || urlId !== urlId) {
      navigate('/error');
    }
  }, [urlToken, passwordToken, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (formValue.password !== formValue.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (formValue.password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    try {
      const response = await fetch(`${url}/api/user/login/recoverypassword/${urlId}/${urlToken}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: formValue.password }),
      });

      if (!response.ok) {
        const result = await response.json();
        setError(result.message);
        return;
      }

      const result = await response.json();
      setError(result.message);

      if (result.success) {
        toast.success("Contraseña cambiada con éxito");
        localStorage.removeItem("passwordResetToken");
        navigate('/login');
      }
    } catch (error) {
      setError("Error en el restablecimiento de la contraseña.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="jose">
          <h2>Regístrate hoy y accede a nuestros descuentos!</h2>
        </div>

        <div className="login-form">
          <form onSubmit={handleSubmit} className="form">
            <div className="form-title">
              <h2>Restablece tu contraseña</h2>
            </div>

            <div className="form-inputs">
              <ResetPasswordInputs
                namePassword="password"
                nameRepeatPassword="confirmPassword"
                onChange={handleChange}
                placeholderPassword="Ingresa tu contraseña"
                placeholderRepeatPassword="Repite tu contraseña"
                valuePassword={formValue.password}
                valueRepeatPassword={formValue.confirmPassword}
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button
              disabled={
                formValue.password.length < 8 ||
                (formValue.confirmPassword.length < 8 && error)
              }
              type="submit"
            >
              Restablecer Contraseña
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
