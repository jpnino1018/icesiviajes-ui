import React from 'react';
import { ReactComponent as MySVG } from '../assets/logo.svg';
import { setAuthHeader } from "../services/BackendService.tsx";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Login.css';

interface LoginProps {
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

function Login({ setToken }: LoginProps) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetch("http://localhost:9091/login", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ login: login, password: password })
        }).then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                document.getElementById("message")!.textContent = "Credenciales Erroneas";
                return null;
            }
        }).then(data => {
            if (data !== null) {
                const userId = data.idUsua;
                localStorage.setItem('userId', userId);
                setAuthHeader(data["token"]);
                setToken(data["token"]); // Actualizar el token
                navigate("/Home");
            } else {
                setAuthHeader(null);
                setToken(null); // Limpiar el token en caso de error
            }
        });
    };

    return (
        <div className='page'>
            <div className='headbar'>
                <MySVG />
            </div>
            <div className='login-container'>
                <div className='welcome-text' id='welcome'>Bienvenido</div>
                <div className='login-message' id='message'></div>
                <form className='input-field' onSubmit={onSubmit}>
                    <div className='input'>
                        <label className='label'>Usuario</label>
                        <input type='text' onChange={(event) => setLogin(event.target.value)} />
                    </div>
                    <div className='input'>
                        <label className='label'>Contraseña</label>
                        <input type='password' onChange={(event) => setPassword(event.target.value)} />
                    </div>
                    <button className='submit' id='btn' type='submit'>Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
