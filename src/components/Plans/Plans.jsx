import React from 'react'
import './Plans.css'
import icesi_logo from '../assets/logo.svg'
import { useNavigate } from "react-router-dom";
import Navbar from '../Navbar/Navbar';
function Plans() {
    let navigate = useNavigate();
  return (
    <div className='page'>
        <Navbar></Navbar>
        <button onClick={() => {navigate('/Plans/Create')}} className="add-plan-button">
                    Agregar Plan
        </button>
        <div className='container'>
            <div className='welcome-text'>Planes</div>
        </div>
    </div>
  )
}

export default Plans