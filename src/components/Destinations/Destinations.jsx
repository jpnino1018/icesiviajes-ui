import React from 'react'
import './Destinations.css'
import Navbar from '../Navbar/Navbar';
import { useNavigate } from "react-router-dom";


function Destinations() {
    let navigate = useNavigate();

    return (
        <div className='page'>
            <Navbar></Navbar>
            <div className='container'>
                <div className='welcome-text'>Destinos</div>
            </div>
            <button onClick={() => {navigate('/Destinations/Create')}} className="add-destination-button">
                    Agregar Destino
        </button>
        </div>
    )
}

export default Destinations