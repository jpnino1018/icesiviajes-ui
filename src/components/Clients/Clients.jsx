import React from 'react'
import './Clients.css'
import icesi_logo from '../assets/logo.svg'
import { useNavigate } from "react-router-dom";
function Clients() {
    let navigate = useNavigate();
  return (
    <div className='page'>
        <div className='headbar'>
            <img onClick={() => {navigate('/Home')}} src={icesi_logo} className='logo'/>
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
            <div className='welcome-text'>Clientes</div>
        </div>
    </div>
  )
}

export default Clients