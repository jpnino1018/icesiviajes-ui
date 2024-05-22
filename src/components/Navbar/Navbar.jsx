import React from 'react'
import icesi_logo from '../assets/logo.svg'
import { useNavigate } from "react-router-dom";
import './Navbar.css';
import logout from '../assets/logout.svg'
import { setAuthHeader } from '../services/BackendService.tsx';


const Navbar = () => {

    const navigate = useNavigate();
    const handleLogout = () => {
      setAuthHeader(null)
      {navigate('/Login')}
  }

  return (
    <div className='headbar'>
      <img onClick={() => {navigate('/Home')}} src={icesi_logo} className='logo' alt="Logo" />
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
  )
}

export default Navbar