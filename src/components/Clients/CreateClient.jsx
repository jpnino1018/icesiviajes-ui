import React, { useState, useEffect } from 'react';
import '../MainContainer/MainContainer.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import ServiceClient from '../services/ServiceClient';
import Navbar from '../Navbar/Navbar.jsx'



function CreateClient() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        idTiid: '',
        identificationNumber: '',
        name: '',
        firstLastName: '',
        secondLastName: '',
        phone1: '',
        phone2: '',
        email: '',
        gender: '',
        birthdate: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const creationDate = new Date().toISOString();
        const creatorUser = 'admin';

        // Añadir los datos adicionales a formData
        const dataToSend = {
            ...formData,
            creationDate,
            creatorUser
        };
        ServiceClient.createAClient(formData.idTiid,formData.identificationNumber,formData.name,formData.firstLastName,formData.secondLastName,
            formData.phone1, formData.phone2, formData.email,formData.gender,formData.birthdate,creationDate,creatorUser).then(
                (response) => {
    
                    console.log(response)
    
                }).catch(
                (error) => {
                    console.log(error)
                });
    };


    return (
        <div className='page'>
            <Navbar></Navbar>
            <div className='container'>
                <div className='welcome-text' id='clients-text'>Formulario</div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="idTiid">Tipo de Documento de Identidad:</label>
                    <select id="idTiid" name="idTiid" value={formData.idTiid} onChange={handleChange} required>
                        <option value="">Seleccione...</option>
                        <option value="cedula">Cédula</option>
                        <option value="pasaporte">Pasaporte</option>
                        <option value="otro">Otro</option>
                    </select>
                    <br />
                    <label htmlFor="identificationNumber">Número de Identificación:</label>
                    <input type="text" id="identificationNumber" name="identificationNumber" value={formData.identificationNumber} onChange={handleChange} required />
                    <br />
                    <label htmlFor="name">Nombre:</label><br />
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                    <br />
                    <label htmlFor="firstLastName">Primer Apellido:</label><br />
                    <input type="text" id="firstLastName" name="firstLastName" value={formData.firstLastName} onChange={handleChange} required />
                    <br />
                    <label htmlFor="secondLastName">Segundo Apellido:</label><br />
                    <input type="text" id="secondLastName" name="secondLastName" value={formData.secondLastName} onChange={handleChange} required />
                    <br />
                    <label htmlFor="phone1">Teléfono 1:</label><br />
                    <input type="text" id="phone1" name="phone1" value={formData.phone1} onChange={handleChange} required />
                    <br />
                    <label htmlFor="phone1">Teléfono 2(opcional):</label><br />
                    <input type="text" id="phone2" name="phone2" value={formData.phone2} onChange={handleChange} />
                    <br />
                    <label htmlFor="email">Correo Electrónico:</label><br />
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    <br />
                    <label htmlFor="gender">Género:</label><br />
                    <input type="radio" id="male" name="gender" value="masculino" onChange={handleChange} required />
                    <label htmlFor="male">Masculino</label>
                    <input type="radio" id="female" name="gender" value="femenino" onChange={handleChange} />
                    <label htmlFor="female">Femenino</label><br />
                    <label htmlFor="birthdate">Fecha de Nacimiento:</label><br />
                    <input type="date" id="birthdate" name="birthdate" value={formData.birthdate} onChange={handleChange} required />
                    <br />
                    <input type="submit" value="Enviar" />
                </form>
            </div>
        </div>
    );
}

export default CreateClient;
