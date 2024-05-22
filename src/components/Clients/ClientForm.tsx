import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { getAuthToken } from "../services/BackendService.tsx";
import '../styles/CreateForm.css'


const ClientForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<any>();
    
    const onSubmit: SubmitHandler<any> = async (data) => {
        
        const config = {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`
            }
        }

        const dataWithDefaults = {
          idClie: -1,
          ...data,
          creationDate: new Date().toISOString(),
          modificationDate: '',
          creatorUser: 'admin',
          modifierUser: '',
          status: 'A',
          idTiid: -1
        };
    
        try {
          const response = await axios.post('http://localhost:9091/api/v1/client/save', dataWithDefaults, config);
          console.log('Datos enviados correctamente:', response.data);
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
              <label htmlFor="identificationNumber">Número de Identificación:</label>
              <input id="identificationNumber" {...register("identificationNumber", { required: true })} />
              {errors.identificationNumber && <span>Este campo es obligatorio</span>}
          </div>

          <div className='form-row'>
              <label htmlFor="firstLastName">Primer Apellido:</label>
              <input id="firstLastName" {...register("firstLastName", { required: true })} />
              {errors.firstLastName && <span>Este campo es obligatorio</span>}
          </div>

          <div className='form-row'>
              <label htmlFor="secondLastName">Segundo Apellido:</label>
              <input id="secondLastName" {...register("secondLastName", { required: true })} />
              {errors.secondLastName && <span>Este campo es obligatorio</span>}
          </div>

          <div className='form-row'>
              <label htmlFor="name">Nombre:</label>
              <input id="name" {...register("name", { required: true })} />
              {errors.name && <span>Este campo es obligatorio</span>}
          </div>

          <div className='form-row'>
              <label htmlFor="phone1">Teléfono 1:</label>
              <input id="phone1" {...register("phone1", { required: true })} />
              {errors.phone1 && <span>Este campo es obligatorio</span>}
          </div>

          <div className='form-row'>
              <label htmlFor="phone2">Teléfono 2:</label>
              <input id="phone2" {...register("phone2")} />
              {errors.phone2 && <span>Este campo es opcional</span>}
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