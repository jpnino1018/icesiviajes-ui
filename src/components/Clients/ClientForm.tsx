import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { getAuthToken } from "../services/BackendService.tsx";
import '../styles/CreateForm.css'
import { useNavigate } from "react-router-dom";


const ClientForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<any>();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<any> = async (data) => {
        
        const config = {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`
            }
        }

        const dataWithDefaults = {
          idClie: -1,
          ...data,
          status: 'A',
        };
    
        try {
          const response = await axios.post('http://localhost:9091/api/v1/client/save', dataWithDefaults, config);
          console.log('Datos enviados correctamente:', response.data);
          alert(`Cliente ${response.data.name} creado exitosamente!`)
          navigate('/Clients')
        } catch (error) {
          console.error('Error al enviar los datos:', error);
        }
      };

  return (
    <div className='page'>
      <Navbar></Navbar>
      <div className='container'>
        <div className='welcome-text'>Crear Cliente</div>
        <form className='create-form' onSubmit={handleSubmit(onSubmit)}>
          <div className='form-row'>
              <label htmlFor="idTiid">Tipo de identificación:</label>
              <select id="idTiid" {...register("idTiid", { required: true })}>
              <option value="1">Cédula de Ciudadanía</option>
              <option value="2">Tarjeta de Identidad</option>
              <option value="3">Registro Civil</option>
              <option value="4">Cédula de Extranjería</option>
              </select>
              {errors.idTiid && <span>Este campo es obligatorio</span>}
          </div>
          
          <div className='form-row'>
              <label htmlFor="identificationNumber">Número de Identificación:</label>
              <input id="identificationNumber" {...register("identificationNumber", { required: true })} />
              {errors.identificationNumber && <span>Este campo es obligatorio</span>}
          </div>

          <div className='form-row'>
              <label htmlFor="lastName">Apellido:</label>
              <input id="lastName" {...register("lastName", { required: true })} />
              {errors.firstLastName && <span>Este campo es obligatorio</span>}
          </div>

          <div className='form-row'>
              <label htmlFor="name">Nombre:</label>
              <input id="name" {...register("name", { required: true })} />
              {errors.name && <span>Este campo es obligatorio</span>}
          </div>

          <div className='form-row'>
              <label htmlFor="phone1">Teléfono:</label>
              <input id="phone1" {...register("phone1", { required: true })} />
              {errors.phone && <span>Este campo es obligatorio</span>}
          </div>

          <div className='form-row'>
              <label htmlFor="email">Correo Electrónico:</label>
              <input id="email" type="email" {...register("email", { required: true })} />
              {errors.email && <span>Este campo es obligatorio y debe ser un correo válido</span>}
          </div>

          <div className='form-row'>
              <label htmlFor="gender">Género:</label>
              <select id="gender" {...register("gender", { required: true })}>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
              <option value="O">Otro</option>
              </select>
              {errors.gender && <span>Este campo es obligatorio</span>}
          </div>

          <div className='form-row'>
              <label htmlFor="birthdate">Fecha de Nacimiento:</label>
              <input id="birthdate" type="date" {...register("birthdate", { required: true })} />
              {errors.birthdate && <span>Este campo es obligatorio</span>}
          </div>
          <div className='btn-container'>
          <button className='send-form-btn' type="submit">Enviar</button>
          </div>
          </form>
      </div>
    </div>
  )
}

export default ClientForm