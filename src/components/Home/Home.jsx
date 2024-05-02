import React from 'react'
import './Home.css'
import icesi_logo from '../assets/logo.svg'
import { useNavigate } from "react-router-dom";
function Home() {
    let navigate = useNavigate();
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
        </div>
        <div className='container'>
            <div className='welcome-text'>Bienvenido Usuario</div>
        </div>
    </div>
  )
}

export default Home