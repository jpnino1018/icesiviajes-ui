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
            <div className='headbar-container' onClick={() => {navigate('/Clients')}}>
                <div className='clients'>Clientes</div>
            </div>
            <div className='headbar-container' onClick={() => {navigate('/Plans')}}>
                <div className='plans'>Planes</div>
            </div>
            <div className='headbar-container' onClick={() => {navigate('/Destinations')}}>
                <div className='destinations'>Destinos</div>
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