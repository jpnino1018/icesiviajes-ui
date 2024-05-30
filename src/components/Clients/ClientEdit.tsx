import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { getAuthToken } from "../services/BackendService.tsx";
import ServiceClient from '../services/ServiceClient';
import { useForm, SubmitHandler } from 'react-hook-form';





const ClientEdit = () => {
  const location = useLocation();
  let clientObj = location.state.clientInfo;
  const { register, handleSubmit, formState: { errors } } = useForm<any>();


  const [formData, setFormData] = useState({
    idTiid: clientObj.idTiid,
    identificationNumber: clientObj.identificationNumber,
    name: clientObj.name,
    firstLastName: clientObj.lastName,
    secondLastName: '',
    phone1: clientObj.phone1,
    phone2: '',
    email: clientObj.email,
    gender: clientObj.gender,
    birthdate: clientObj.birthdate
});

const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
};


const onSubmit: SubmitHandler<any> = async (data) => {
        
  const config = {
      headers: {
          Authorization: `Bearer ${getAuthToken()}`
      }
  }

  const dataWithDefaults = {
    idClie: clientObj.idClie,
    ...data,
    creationDate: new Date().toISOString(),
    modificationDate: '',
    creatorUser: 'admin',
    modifierUser: '',
    status: 'A',
    idTiid: clientObj.idTiid
  };

  try {
    const response = await axios.post('http://localhost:9091/api/v1/client/update', dataWithDefaults, config);
    console.log('Datos enviados correctamente:', response.data);
  } catch (error) {
    console.error('Error al enviar los datos:', error);
  }
};

  return (
    <div className='page'>
      <Navbar />
      <div className='container'>
        <div className='welcome-text'>Editar Cliente</div>
        <form className='create-form' onSubmit={(handleSubmit(onSubmit))}>
          <div className='form-row'>
              <label htmlFor="identificationNumber">Número de Identificación:</label>
              <input id="identificationNumber" name="identificationNumber" value={formData.identificationNumber} onChange={handleChange}/>
          </div>

          <div className='form-row'>
              <label htmlFor="lastName">Apellido:</label>
              <input id="lastName" name="firstLastName" value={formData.firstLastName} onChange={handleChange}/>
              
          </div>
          <div className='form-row'>
              <label htmlFor="name">Nombre:</label>
              <input id="name" name="name" value={formData.name} onChange={handleChange}/>
              
          </div>

          <div className='form-row'>
              <label htmlFor="phone">Teléfono:</label>
              <input id="phone" name="phone1" value={formData.phone1} onChange={handleChange} />
              
          </div>

          <div className='form-row'>
              <label htmlFor="email">Correo Electrónico:</label>
              <input id="email" type="email"name="email" value={formData.email} onChange={handleChange} />
              
          </div>

          <div className='form-row'>
              <label htmlFor="gender">Género:</label>
              <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
                <option value="O">Otro</option>
              </select>
              
          </div>

          <div className='form-row'>
              <label htmlFor="birthdate">Fecha de Nacimiento:</label>
              <input id="birthdate" type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} />
              </div>
          <div className='btn-container'>
            <button className='send-form-btn' type="submit">Actualizar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientEdit;