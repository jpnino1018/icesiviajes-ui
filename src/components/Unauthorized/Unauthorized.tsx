import React from 'react'
import './Unauthorized.css'
import Navbar from '../Navbar/Navbar'
import errorIMG from '../assets/error_401.png';


const Unauthorized = () => {
  return (
    <div className='page'>
        <Navbar></Navbar>
        <div className='container'>
        <img src={errorIMG} alt='error 401: unauthorized'></img>
        </div>
    </div>
  )
}

export default Unauthorized