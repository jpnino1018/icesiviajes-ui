import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { getAuthToken } from "../services/BackendService.tsx";
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from "react-router-dom";

const DestinationEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();

  let destinationObj = location.state.destinationInfo;
  const { register, handleSubmit, formState: { errors } } = useForm<any>();


  const [formData, setFormData] = useState({
    idDest: destinationObj.idDest,
    code: destinationObj.code,
    name: destinationObj.name,
    description: destinationObj.description,
    status: destinationObj.status
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
    idDest: destinationObj.idDest,
    ...data,
    imgUrl: destinationObj.imgUrl,

  };

  try {
    const response = await axios.put('http://localhost:9091/api/v1/destination/update', dataWithDefaults, config);
    alert(`Destino ${response.data.name} editado exitosamente!`)
    navigate('/Destinations')
  } catch (error) {
    console.error('Error al enviar los datos:', error);
    console.log('Error al enviar los datos:', dataWithDefaults)
  }
};

return (
<div className='page'>
  <Navbar></Navbar>
  <div className='container'>
    <div className='welcome-text' id='clients-text'>Editar Destino</div>
    <form className='create-form' onSubmit={handleSubmit(onSubmit)}>
    <div className='form-row'>
      <label htmlFor="code">Código:</label>
      <input id="code" {...register("code", { required: true, maxLength: 5 })} value={formData.code} onChange={handleChange} />
      {errors.code && <span>Este campo es obligatorio y debe tener máximo 5 caracteres</span>}
    </div>

    <div className='form-row'>
      <label htmlFor="name">Nombre:</label>
      <input id="name" {...register("name", { required: true, maxLength: 100 })} value={formData.name} onChange={handleChange} />
      {errors.name && <span>Este campo es obligatorio y debe tener máximo 100 caracteres</span>}
    </div>

    <div className='form-row'>
      <label htmlFor="description">Descripción:</label>
      <input id="description" {...register("description", { required: true, maxLength: 300 })} value={formData.description} onChange={handleChange} />
      {errors.description && <span>Este campo es obligatorio y debe tener máximo 300 caracteres</span>}
    </div>

    <div className='form-row'>
      <label htmlFor="status">Status (A/I):</label>
      <input id="status" {...register("status", { required: true, maxLength: 1 })} value={formData.status} onChange={handleChange} />
      {errors.status && <span>Este campo es obligatorio y debe tener máximo 1 caracteres</span>}
    </div>

    <div className='btn-container'>
    <button className='send-form-btn' type="submit">Actualizar</button>
    </div>
  </form>

  </div>

</div>
  );
};

export default DestinationEdit;