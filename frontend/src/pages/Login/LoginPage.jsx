import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import { InputLogin } from "../../components/InputLogin/InputLogin";
import { InputRegister } from "../../components/InputLogin/InputRegister";
import { InputForgotPassword } from "../../components/InputLogin/InputForgotPassword";

export const LoginPage = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Iniciar Sesion");
  const { url, setToken, setRecoveryEmail, passwordToken, setPasswordToken } =
    useContext(StoreContext);
  const [checkbox, setCheckbox] = useState(false);

  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormValue((formValue) => ({
      ...formValue,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let newUrl = url; // URL base para la solicitud POST

    if (currentState === "Iniciar Sesion") {
      newUrl += "/api/user/login";
     
    } else if (currentState === "Crear Cuenta") {
      newUrl += "/api/user/register";
    } else if (currentState === "Recuperar Contraseña") {
      newUrl += "/api/user/login/forgotpassword"; // Agrega la ruta para recuperar contraseña
    }

    try {
      const response = await axios.post(newUrl, formValue);
      setRecoveryEmail(response.data.email);

      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.removeItem("recoveryEmail");
        localStorage.removeItem("passwordResetToken");
       
        if (currentState === "Recuperar Contraseña") {
          localStorage.setItem("recoveryEmail", response.data.email);
          localStorage.setItem("passwordResetToken", response.data.token);
          navigate(`/recovery`);
          setToken(""); // Limpia el token en el contexto
          localStorage.removeItem("token"); // Elimina el token del localStorage
        } else {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          navigate("/");
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Ocurrió un error. Por favor, intenta de nuevo.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="jose">
          <h2>Registrate hoy y accede a nuestros descuentos!</h2>
        </div>

        <div className="login-form">
          <form onSubmit={handleLogin} className="form">
            <div className="form-title">
              <h2>{currentState}</h2>
              <Link to={"/"}>
                <img
                  onClick={() => setShowLogin(false)}
                  src={assets.cross_icon}
                  alt="Cerrar"
                />
              </Link>
            </div>

            <div className="form-inputs">
              {currentState === "Iniciar Sesion" ? (
                <InputLogin
                  nameEmail={"email"}
                  namePassword="password"
                  type="text"
                  placeholderEmail="Nombre completo"
                  placeholderPassword={"Tu contraseña"}
                  valueEmail={formValue.email}
                  valuePassword={formValue.password}
                  onChange={handleChange}
                />
              ) : currentState === "Crear Cuenta" ? (
                <InputRegister
                  name={"name"}
                  nameEmail={"email"}
                  namePassword={"password"}
                  onChange={handleChange}
                  placeholderEmail={"Ingresa tu email"}
                  placeholderName={"Tu nombre"}
                  placeholderPassword={"Ingresa una contraseña"}
                  valueEmail={formValue.email}
                  valueName={formValue.name}
                  valuePassword={formValue.password}
                />
              ) : null}

              {currentState !== "Iniciar Sesion" &&
                currentState !== "Crear Cuenta" && (
                  <InputForgotPassword
                    nameEmail={"email"}
                    onChange={handleChange}
                    placeholderEmail={"Tu cuenta"}
                    valueEmail={formValue.email}
                  />
                )}
            </div>

            <button
              disabled={
                currentState === "Crear Cuenta"
                  ? checkbox === false ||
                    formValue.name.length < 5 ||
                    formValue.email.length < 5 ||
                    formValue.password.length < 6
                  : formValue.email.length < 5 || formValue.password.length < 6
              }
              type="submit"
            >
              {currentState === "Iniciar Sesion"
                ? "Iniciar Sesion"
                : currentState === "Crear Cuenta"
                ? "Crear Cuenta"
                : "Recuperar contraseña"}
            </button>

            {currentState === "Crear Cuenta" ? (
              <div className="login-condition">
                <input onClick={() => setCheckbox(!checkbox)} type="checkbox" />
                <p>Acepta los términos y condiciones para continuar.</p>
              </div>
            ) : null}

            {currentState === "Iniciar Sesion" ? (
              <>
                <p>
                  No tienes Cuenta?{" "}
                  <span onClick={() => setCurrentState("Crear Cuenta")}>
                    Crea tu cuenta aqui.
                  </span>
                </p>

                <p>
                  <span onClick={() => setCurrentState("Recuperar Contraseña")}>
                    ¿Olvidaste tu contraseña?
                  </span>
                </p>
              </>
            ) : (
              <p>
                Ya tienes cuenta?{" "}
                <span onClick={() => setCurrentState("Iniciar Sesion")}>
                  Inicia sesión
                </span>
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
