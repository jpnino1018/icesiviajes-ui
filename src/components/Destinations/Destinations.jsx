import React from 'react'
import './Destinations.css'
import icesi_logo from '../assets/logo.svg'
function Destinations() {
  return (
    <div className='page'>
        <div className='headbar'>
            <img src={icesi_logo}/>
            <div className='headbar-container'>
                <div className='clients'>Clientes</div>
            </div>
            <div className='headbar-container'>
                <div className='plans'>Planes</div>
            </div>
            <div className='headbar-container'>
                <div className='destinations'>Destinos</div>
            </div>
        </div>
        <div className='container'>
            <div className='welcome-text'>Destinos</div>
        </div>
    </div>
  )
}

export default Destinations