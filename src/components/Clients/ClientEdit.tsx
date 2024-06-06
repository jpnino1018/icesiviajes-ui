import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { getAuthToken } from "../services/BackendService.tsx";
import ServiceClient from '../services/ServiceClient';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from "react-router-dom";

const ClientEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();

  let clientObj = location.state.clientInfo;
  const { register, handleSubmit, formState: { errors } } = useForm<any>();


  const [formData, setFormData] = useState({
    idTiid: clientObj.idTiid,
    identificationNumber: clientObj.identificationNumber,
    name: clientObj.name,
    lastName: clientObj.lastName,
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
    birthdate: clientObj.birthdate,
    status: clientObj.status,
    idTiid: clientObj.idTiid
  };

  try {
    const response = await axios.put('http://localhost:9091/api/v1/client/update', dataWithDefaults, config);
    alert(`Cliente ${response.data.name} editado exitosamente!`)
    navigate('/Clients')
  } catch (error) {
    console.error('Error al enviar los datos:', error);
  }
};

const handleDelete = async (idPost) => {
  const config = {
    headers: {
        Authorization: `Bearer ${getAuthToken()}`
    }
  }
  
  try {

      const response = await axios.delete(`http://localhost:9091/api/v1/client/delete/${idPost}`, config);

      alert(`Cliente eliminado exitosamente`);
      navigate('/Clients')

  } catch (error) {
      console.error('Ocurrió un problema con la eliminación:', error);
  }
};

  return (
    <div className='page'>
      <Navbar />
      <div className='container'>
        <div className='welcome-text'>Editar Cliente</div>
        <form className='create-form' onSubmit={handleSubmit(onSubmit)}>
          <div className='form-row'>
              <label htmlFor="identificationNumber">Número de Identificación:</label>
              <input id="identificationNumber" {...register("identificationNumber", { required: true })} value={formData.identificationNumber} onChange={handleChange} />
          </div>

          <div className='form-row'>
              <label htmlFor="lastName">Apellido:</label>
              <input id="lastName" {...register("lastName", { required: true })} value={formData.lastName} onChange={handleChange}/>
              
          </div>
          <div className='form-row'>
              <label htmlFor="name">Nombre:</label>
              <input id="name" {...register("name", { required: true })} value={formData.name} onChange={handleChange}/>
              
          </div>

          <div className='form-row'>
              <label htmlFor="phone1">Teléfono:</label>
              <input id="phone1" {...register("phone1", { required: true })} value={formData.phone1} onChange={handleChange} />
              
          </div>

          <div className='form-row'>
              <label htmlFor="email">Correo Electrónico:</label>
              <input id="email" type="email" {...register("email", { required: true })} value={formData.email} onChange={handleChange} />
              
          </div>

          <div className='form-row'>
              <label htmlFor="gender">Género:</label>
              <select id="gender" {...register("gender", { required: true })} value={formData.gender} onChange={handleChange}>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
                <option value="O">Otro</option>
              </select>
              
          </div>
          
          <div className='btn-container'>
            <button className='send-form-btn' type="submit">Actualizar</button>
            <svg className='deleteBtn'style={{ margin: '1.5rem 2vh' }} onClick={() => handleDelete(clientObj.idClie)} xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="30px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
          </div>
    
        </form>
      </div>
    </div>
  );
};

export default ClientEdit;