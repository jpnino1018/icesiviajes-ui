import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { getAuthToken } from "../services/BackendService.tsx";
import { useNavigate } from "react-router-dom";

const PlanForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<any>();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<any> = async (data) => {

        const config = {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`
            }
        }

        const dataWithDefaults = {
          idPlan: -1,
          ...data,
          status: 'A',
          idClie: -1,
          idDest: -1
        };
        
    
        try {
          const response = await axios.post('http://localhost:9091/api/v1/plan/save', dataWithDefaults, config);
          alert(`Plan ${response.data.name} creado exitosamente!`)
          navigate('/Plans')
        } catch (error) {
          console.error('Error al enviar los datos:', dataWithDefaults);
        }
      };


  return (
    <div className='page'>
      <Navbar></Navbar>
      <div className='container'>
      <div className='welcome-text' id='clients-text'>Crear Plan</div>
        <form className='create-form' onSubmit={handleSubmit(onSubmit)}>
        <div className='form-row'>
            <label htmlFor="code">Código:</label>
            <input id="code" {...register("code", { required: true })} />
            {errors.code && <span>Este campo es obligatorio</span>}
        </div>

        <div className='form-row'>
            <label htmlFor="name">Nombre:</label>
            <input id="name" {...register("name", { required: true })} />
            {errors.name && <span>Este campo es obligatorio</span>}
        </div>

        <div className='form-row'>
            <label htmlFor="personCount">Número de personas:</label>
            <input id="personCount" type="number" {...register("personCount", { required: true, min: 1 })} />
            {errors.personCount && <span>Este campo es obligatorio y debe ser al menos 1</span>}
        </div>

        <div className='form-row'>
            <label htmlFor="startTravelDate">Fecha de inicio del viaje:</label>
            <input id="startTravelDate" type="date" {...register("startTravelDate", { required: true })} />
            {errors.startTravelDate && <span>Este campo es obligatorio</span>}
        </div>

        <div className='form-row'>
            <label htmlFor="endTravelDate">Fecha de fin del viaje:</label>
            <input id="endTravelDate" type="date" {...register("endTravelDate", { required: true })} />
            {errors.endTravelDate && <span>Este campo es obligatorio</span>}
        </div>

        <div className='form-row'>
            <label htmlFor="totalValue">Valor total:</label>
            <input id="totalValue" type="number" step="0.01" {...register("totalValue", { required: true, min: 0 })} />
            {errors.totalValue && <span>Este campo es obligatorio y debe ser un número positivo</span>}
        </div>

        <div className='form-row'>
            <label htmlFor="meal">Comida (S/N):</label>
            <input id="meal" {...register("meal", { required: true, maxLength: 1 })} />
            {errors.meal && <span>Este campo es obligatorio</span>}
        </div>

        <div className='form-row'>
            <label htmlFor="transport">Transporte (S/N):</label>
            <input id="transport" {...register("transport", { required: true , maxLength: 1})} />
            {errors.transport && <span>Este campo es obligatorio</span>}
        </div>

        <div className='form-row'>
            <label htmlFor="nightCount">Cantidad noches:</label>
            <input id="nightCount" type="number" step="1" {...register("nightCount", { required: true })} />
            {errors.nightCount && <span>Este campo es obligatorio y debe ser un número positivo</span>}
        </div>

        <div className='form-row'>
            <label htmlFor="dayCount">Cantidad dias:</label>
            <input id="dayCount" type="number" step="1" {...register("dayCount", { required: true })} />
            {errors.dayCount && <span>Este campo es obligatorio y debe ser un número positivo</span>}
        </div>

        <div className='btn-container'>
        <button className='send-form-btn' type="submit">Enviar</button>
        </div>
        
        </form>
    
      </div>
    </div>
  )
}

export default PlanForm;