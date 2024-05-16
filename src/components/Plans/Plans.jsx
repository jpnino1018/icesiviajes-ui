import React from 'react'
import './Plans.css'
import icesi_logo from '../assets/logo.svg'
import { useNavigate } from "react-router-dom";
function Plans() {
    let navigate = useNavigate();
  return (
    <div className='page'>
        <div className='headbar'>
            <img onClick={() => {navigate('/Home')}} src={icesi_logo} className='logo'/>
            <div className='headbar-container' onClick={() => {navigate('/Clients')}}>
                <div className='clients'>Clientes</div>
            </div>
            <div className='headbar-container' onClick={() => {navigate('/Plans')}}>
                <div className='plans'>Planes</div>
            </div>
            <div className='headbar-container' onClick={() => {navigate('/Destinations')}}>
                <div className='destinations'>Destinos</div>
            </div>
        </div>
        <div className='container'>
            <div className='welcome-text'>Planes</div>
        </div>
    </div>
  )
}

export default Plans