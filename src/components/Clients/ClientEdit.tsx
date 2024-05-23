import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Navbar from '../Navbar/Navbar';


const ClientEdit = () => {
  const { id } = useParams();
  const [clientData, setClientData] = useState({});
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {

    const fetchClient = async () => {
      try {
        const response = await axios.get('http://localhost:9091/api/v1/clients/${id}');
        const client = response.data;
        // Aquí debes usar setValue para cada campo del formulario
        setValue('name', client.name);
        setValue('lastName', client.lastName);
        setValue('identificationNumber', client.identificationNumber);
        setValue('email', client.email);
        setValue('phone', client.phone1);
        setValue('gender', client.gender);
        setValue('birthdate', client.birthdate);
      } catch (error) {
        console.error('Error fetching client', error);
      }
    };

    fetchClient();
  }, [id, setValue]);

  const onSubmit = data => {
    console.log(data);
    // Aquí iría la lógica para enviar los datos actualizados al servidor
  };

  return (
    <div className='page'>
      <Navbar />
      <div className='container'>
        <div className='welcome-text'>Editar Cliente</div>
        <form className='create-form' onSubmit={handleSubmit(onSubmit)}>
          <div className='form-row'>
              <label htmlFor="identificationNumber">Número de Identificación:</label>
              <input id="identificationNumber" {...register("identificationNumber", { required: true })} />
              {errors.identificationNumber && <span>Este campo es obligatorio</span>}
          </div>

          <div className='form-row'>
              <label htmlFor="lastName">Apellido:</label>
              <input id="lastName" {...register("lastName", { required: true })} />
              {errors.lastName && <span>Este campo es obligatorio</span>}
          </div>

          <div className='form-row'>
              <label htmlFor="name">Nombre:</label>
              <input id="name" {...register("name", { required: true })} />
              {errors.name && <span>Este campo es obligatorio</span>}
          </div>

          <div className='form-row'>
              <label htmlFor="phone">Teléfono:</label>
              <input id="phone" {...register("phone", { required: true })} />
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
            <button className='send-form-btn' type="submit">Actualizar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientEdit;