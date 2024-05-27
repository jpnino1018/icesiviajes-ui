import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Navbar from '../Navbar/Navbar';
import { getAuthToken } from "../services/BackendService.tsx";



const ClientEdit = () => {
  const { id } = useParams();
  const [clientData, setClientData] = useState({});
  const location = useLocation();
  let clientObj = location.state.clientInfo;
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {

    const fetchClient = async () => {

      const config = {
        headers: {
            Authorization: `Bearer ${getAuthToken()}`
        }
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
              <input id="identificationNumber" value={clientObj.identificationNumber} />
              {errors.identificationNumber && <span>Este campo es obligatorio</span>}
          </div>

          <div className='form-row'>
              <label htmlFor="lastName">Apellido:</label>
              <input id="lastName" value={clientObj.lastName} />
              {errors.lastName && <span>Este campo es obligatorio</span>}
          </div>

          <div className='form-row'>
              <label htmlFor="name">Nombre:</label>
              <input id="name" value={clientObj.name}/>
              {errors.name && <span>Este campo es obligatorio</span>}
          </div>

          <div className='form-row'>
              <label htmlFor="phone">Teléfono:</label>
              <input id="phone" value={clientObj.phone1} />
              {errors.phone && <span>Este campo es obligatorio</span>}
          </div>

          <div className='form-row'>
              <label htmlFor="email">Correo Electrónico:</label>
              <input id="email" type="email"value={clientObj.email} />
              {errors.email && <span>Este campo es obligatorio y debe ser un correo válido</span>}
          </div>

          <div className='form-row'>
              <label htmlFor="gender">Género:</label>
              <select id="gender" value={clientObj.gender}>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
                <option value="O">Otro</option>
              </select>
              {errors.gender && <span>Este campo es obligatorio</span>}
          </div>

          <div className='form-row'>
              <label htmlFor="birthdate">Fecha de Nacimiento:</label>
              <input id="birthdate" type="date" value={clientObj.birthdate} />
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