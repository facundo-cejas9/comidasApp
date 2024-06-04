
import { useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets'


export const LoginPopup = ({ setShowLogin }) => {



    const [currentState, setCurrentState] = useState("Iniciar Sesion")


  return (
    <div className='login-popup'>
        <form className='login-popup-container'>
            <div className='login-popup-title'>
            <h2>{ currentState }</h2>
            <img onClick={()=> setShowLogin(false)} src={ assets.cross_icon } />
            </div>

            <div className='login-popup-inputs'>
                {currentState === "Iniciar Sesion" ? <></> : <input type='text' placeholder='Tu nombre' />}
            <input type='text' placeholder='Username' />
            <input type='password' placeholder='Password' />
            </div>
           
            
            <button type='submit'>{ currentState === "Iniciar Sesion" ? "Iniciar Sesion" : "Crear Cuenta" }</button>
            
                {
                    currentState === "Crear Cuenta" ? (
                        <div className='login-popup-condition'>
                        <input type='checkbox' />
                        <p>Acepta los términos y condiciones para continuar.</p>
                        </div>
                    ) : (
                        ""
                    )
                    
                }
                
        
            {
                currentState === "Iniciar Sesion" ? (
                    <p>No tienes Cuenta? <span  onClick={()=> setCurrentState("Crear Cuenta")}>Crea tu cuenta aqui.</span> </p>
                ) : (
                    <p>Ya tienes cuenta? <span  onClick={()=> setCurrentState("Iniciar Sesion")}>Inicia sesión</span></p>
                )
            }
        </form>
    </div>
  )
}
