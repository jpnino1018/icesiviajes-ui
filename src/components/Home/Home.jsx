import React from 'react'
import './Home.css'
import icesi_logo from '../assets/logo.svg'
import logout from '../assets/logout.svg'
import { useNavigate } from "react-router-dom";
import { setAuthHeader } from '../services/BackendService.tsx';
function Home() {
    let navigate = useNavigate();
    const handleLogout = () => {
        setAuthHeader(null)
        {navigate('/Login')}
    }
  return (
    <div className='page'>
        <div className='headbar'>
            <img src={icesi_logo}/>
            <div className='headbar-container'>
                <div className='clients' onClick={() => {navigate('/Clients')}}>Clientes</div>
            </div>
            <div className='headbar-container'>
                <div className='plans' onClick={() => {navigate('/Plans')}}>Planes</div>
            </div>
            <div className='headbar-container'>
                <div className='destinations' onClick={() => {navigate('/Destinations')}}>Destinos</div>
            </div>
            <img className='logout' onClick={handleLogout} src={logout}/>
        </div>
        <div className='container'>
            <div className='welcome-text'>Bienvenido Usuario</div>
        </div>
    </div>
  )
}

export default Home