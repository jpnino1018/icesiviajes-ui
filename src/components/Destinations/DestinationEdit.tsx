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

const handleDelete = async (idDest) => {
  const config = {
    headers: {
        Authorization: `Bearer ${getAuthToken()}`
    }
  }
  
  try {

      const response = await axios.delete(`http://localhost:9091/api/v1/destination/delete/${idDest}`, config);

      alert(`Destino eliminado exitosamente`);
      navigate('/Destinations')

  } catch (error) {
      console.error('Ocurrió un problema con la eliminación:', error);
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
      <svg className='deleteBtn'style={{ margin: '1.5rem 2vh' }} onClick={() => handleDelete(destinationObj.idDest)} xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="30px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
    </div>
  </form>

  </div>

</div>
  );
};

export default DestinationEdit;