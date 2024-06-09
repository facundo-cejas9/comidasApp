
import { useContext, useEffect, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios'


export const LoginPopup = ({ setShowLogin }) => {


    const [currentState, setCurrentState] = useState("Iniciar Sesion")
    const { url, setToken } = useContext(StoreContext)

    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })
    
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setData((data) => ({
           ...data,
            [name]: value,
        }))
    }


    const handleLogin = async(e) => {
        e.preventDefault()
        let newUrl = url

        if (currentState === 'Iniciar Sesion') {
            newUrl += "/api/user/login"
        }

        else {
            newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl, data)

        if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem('token', response.data.token)
            setShowLogin(false)
        } else {
            alert(response.data.message)
        }
    }


  return (
    <div className='login-popup'>
        <form onSubmit={handleLogin} className='login-popup-container'>
            <div className='login-popup-title'>
            <h2>{ currentState }</h2>
            <img onClick={()=> setShowLogin(false)} src={ assets.cross_icon } />
            </div>

            <div className='login-popup-inputs'>
                {currentState === "Iniciar Sesion" ? <></> : <input type='text' placeholder='Tu nombre' name='name'  onChange={handleChange} value={data.name} />}
            <input onChange={handleChange} value={data.email} type='text' placeholder='email' name='email' />
            <input  onChange={handleChange} value={data.password} type='password' placeholder='Password' name='password' />
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
