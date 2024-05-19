import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { getAuthToken } from "../services/BackendService.tsx";

const PlanForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<any>();

    const onSubmit: SubmitHandler<any> = async (data) => {

        const config = {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`
            }
        }

        const dataWithDefaults = {
          idPlan: -1,
          ...data,
          creationDate: new Date().toISOString(),
          modificationDate: '',
          creatorUser: 'admin',
          modifierUser: '',
          status: 'A',
          idClie: -1,
          idUser: -1
        };
        
    
        try {
          const response = await axios.post('http://localhost:9091/api/v1/plan/save', dataWithDefaults, config);
          console.log('Datos enviados correctamente:', response.data);
        } catch (error) {
          console.error('Error al enviar los datos:', error);
        }
      };


  return (
    <div className='page'>
      <Navbar></Navbar>
      <div className='container'>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <label htmlFor="code">Código:</label>
            <input id="code" {...register("code", { required: true })} />
            {errors.code && <span>Este campo es obligatorio</span>}
        </div>

        <div>
            <label htmlFor="requestDescription">Descripción de la solicitud:</label>
            <input id="requestDescription" {...register("requestDescription", { required: true })} />
            {errors.requestDescription && <span>Este campo es obligatorio</span>}
        </div>

        <div>
            <label htmlFor="name">Nombre:</label>
            <input id="name" {...register("name", { required: true })} />
            {errors.name && <span>Este campo es obligatorio</span>}
        </div>

        <div>
            <label htmlFor="personCount">Número de personas:</label>
            <input id="personCount" type="number" {...register("personCount", { required: true, min: 1 })} />
            {errors.personCount && <span>Este campo es obligatorio y debe ser al menos 1</span>}
        </div>

        <div>
            <label htmlFor="requestDate">Fecha de solicitud:</label>
            <input id="requestDate" type="date" {...register("requestDate", { required: true })} />
            {errors.requestDate && <span>Este campo es obligatorio</span>}
        </div>

        <div>
            <label htmlFor="startTravelDate">Fecha de inicio del viaje:</label>
            <input id="startTravelDate" type="date" {...register("startTravelDate", { required: true })} />
            {errors.startTravelDate && <span>Este campo es obligatorio</span>}
        </div>

        <div>
            <label htmlFor="endTravelDate">Fecha de fin del viaje:</label>
            <input id="endTravelDate" type="date" {...register("endTravelDate", { required: true })} />
            {errors.endTravelDate && <span>Este campo es obligatorio</span>}
        </div>

        <div>
            <label htmlFor="totalValue">Valor total:</label>
            <input id="totalValue" type="number" step="0.01" {...register("totalValue", { required: true, min: 0 })} />
            {errors.totalValue && <span>Este campo es obligatorio y debe ser un número positivo</span>}
        </div>

        <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  )
}

export default PlanForm;