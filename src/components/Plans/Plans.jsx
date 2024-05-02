import React from 'react'
import './Plans.css'
import icesi_logo from '../assets/logo.svg'
function Plans() {
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
            <div className='welcome-text'>Planes</div>
        </div>
    </div>
  )
}

export default Plans