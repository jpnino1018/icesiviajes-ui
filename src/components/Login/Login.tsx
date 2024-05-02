import React from 'react'
import './Login.css'
import { useNavigate } from "react-router-dom"
import { setAuthHeader } from "../services/BackendService.tsx"
import { useState } from "react";

function Login() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetch("http://localhost:9091/login", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({login: login, password: password})
        }).then(response => {
            if (response.status == 200) {
                return response.json();

            } else {
                return null;
            }
        }).then(data => {
            if (data !== null) {
                setAuthHeader(data["token"]);
            } else {
                setAuthHeader(null);
            }
        });
    }
  return (
    <div className='page'>
        <div className='headbar'>
        </div>
        <div className='container'>
            <div className='welcome-text'>Bienvenido</div>
            <form className='input-field' onSubmit={onSubmit}>
                <div className='input'>
                    <label className='label'>Usuario</label>
                    <input type='text' onChange={(event) => setLogin(event.target.value)}/>
                </div>
                <div className='input'>
                    <label className='label'>Contraseña</label>
                    <input type='password' onChange={(event) => setPassword(event.target.value)}/>
                </div>
                <button className='submit' type='submit'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login