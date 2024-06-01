import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { getAuthToken } from "../services/BackendService.tsx";
import ServiceClient from '../services/ServiceClient';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from "react-router-dom";

const PlanEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();

  let planObj = location.state.planInfo;
  const { register, handleSubmit, formState: { errors } } = useForm<any>();


  const [formData, setFormData] = useState({
    idPlan: planObj.idPlan,
    code: planObj.code,
    requestDescription: planObj.requestDescription,
    name: planObj.name,
    personCount: planObj.personCount,
    requestDate: planObj.requestDate,
    startTravelDate: planObj.startTravelDate,
    endTravelDate: planObj.endTravelDate,
    totalValue: planObj.totalValue
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
    idPlan: planObj.idPlan,
    ...data,
    requestDate: planObj.requestDate,
    startTravelDate: planObj.startTravelDate,
    endTravelDate: planObj.endTravelDate,
    creationDate: planObj.creationDate,
    modificationDate: new Date().toISOString(),
    creatorUser: planObj.creatorUser,
    modifierUser: 'admin',
    status: planObj.status,
    idClie: planObj.idClie,
    idUser: planObj.idUser
  };
  

  try {
    const response = await axios.put('http://localhost:9091/api/v1/plan/update', dataWithDefaults, config);
    alert(`Plan ${response.data.name} editado exitosamente!`)
    navigate('/Plans')
  } catch (error) {
    console.error('Error al enviar los datos:', error);
    console.log('Error al enviar los datos:', dataWithDefaults)
  }
};


return (
<div className='page'>
<Navbar></Navbar>
<div className='container'>
<div className='welcome-text' id='clients-text'>Editar Plan</div>
  <form className='create-form' onSubmit={handleSubmit(onSubmit)}>
  <div className='form-row'>
      <label htmlFor="code">Código:</label>
      <input id="code" {...register("code", { required: true })} value={formData.code} onChange={handleChange} />
      {errors.code && <span>Este campo es obligatorio</span>}
  </div>

  <div className='form-row'>
      <label htmlFor="requestDescription">Descripción de la solicitud:</label>
      <input id="requestDescription" {...register("requestDescription", { required: true })} value={formData.requestDescription} onChange={handleChange} />
      {errors.requestDescription && <span>Este campo es obligatorio</span>}
  </div>

  <div className='form-row'>
      <label htmlFor="name">Nombre:</label>
      <input id="name" {...register("name", { required: true })} value={formData.name} onChange={handleChange} />
      {errors.name && <span>Este campo es obligatorio</span>}
  </div>

  <div className='form-row'>
      <label htmlFor="personCount">Número de personas:</label>
      <input id="personCount" type="number" {...register("personCount", { required: true, min: 1 })} value={formData.personCount} onChange={handleChange} />
      {errors.personCount && <span>Este campo es obligatorio y debe ser al menos 1</span>}
  </div>

  <div className='form-row'>
      <label htmlFor="totalValue">Valor total:</label>
      <input id="totalValue" type="number" step="0.01" {...register("totalValue", { required: true, min: 0 })} value={formData.totalValue} onChange={handleChange} />
      {errors.totalValue && <span>Este campo es obligatorio y debe ser un número positivo</span>}
  </div>
  <div className='btn-container'>
  <button className='send-form-btn' type="submit">Actualizar</button>
  </div>
  </form>
</div>
</div>
)
}

export default PlanEdit;