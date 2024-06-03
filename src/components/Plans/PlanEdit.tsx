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
    name: planObj.name,
    personCount: planObj.personCount,
    startTravelDate: planObj.startTravelDate,
    endTravelDate: planObj.endTravelDate,
    totalValue: planObj.totalValue,
    meal: planObj.meal,
    transport: planObj.transport,
    nightCount: planObj.nightCount,
    dayCount: planObj.dayCount,
    status: planObj.status
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

  <div className='form-row'>
      <label htmlFor="meal">Comida:</label>
      <input id="meal" {...register("meal", { required: true })} value={formData.meal} onChange={handleChange} />
      {errors.meal && <span>Este campo es obligatorio</span>}
  </div>

  <div className='form-row'>
      <label htmlFor="transport">Comida:</label>
      <input id="transport" {...register("transport", { required: true })} value={formData.transport} onChange={handleChange} />
      {errors.transport && <span>Este campo es obligatorio</span>}
  </div>

  <div className='form-row'>
      <label htmlFor="nightCount">Cantidad noches:</label>
      <input id="nightCount" type="number" step="1" {...register("nightCount", { required: true})} value={formData.nightCount} onChange={handleChange} />
      {errors.nightCount && <span>Este campo es obligatorio y debe ser un número positivo</span>}
  </div>

  <div className='form-row'>
      <label htmlFor="dayCount">Cantidad dias:</label>
      <input id="dayCount" type="number" step="1" {...register("dayCount", { required: true})} value={formData.dayCount} onChange={handleChange} />
      {errors.dayCount && <span>Este campo es obligatorio y debe ser un número positivo</span>}
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
)
}

export default PlanEdit;