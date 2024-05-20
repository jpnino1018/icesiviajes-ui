import React from 'react'
import icesi_logo from '../assets/logo.svg'
import { useNavigate } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {

    const navigate = useNavigate();

  return (
    <div className='headbar'>
                <img onClick={() => {navigate('/Home')}} src={icesi_logo} className='logo' alt="Logo" />
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
  )
}

export default Navbar