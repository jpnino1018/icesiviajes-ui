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

const handleDelete = async (idPlan) => {
    const config = {
      headers: {
          Authorization: `Bearer ${getAuthToken()}`
      }
    }
    
    try {
  
        const response = await axios.delete(`http://localhost:9091/api/v1/plan/delete/${idPlan}`, config);
  
        alert(`Plan eliminado exitosamente`);
        navigate('/Plans')
  
    } catch (error) {
        console.error('Ocurrió un problema con la eliminación:', error);
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
    <svg className='deleteBtn'style={{ margin: '1.5rem 2vh' }} onClick={() => handleDelete(planObj.idPlan)} xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="30px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>

  </div>

  </form>
</div>
</div>
)
}

export default PlanEdit;