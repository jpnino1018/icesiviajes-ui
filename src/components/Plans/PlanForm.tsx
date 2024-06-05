import React, { useEffect } from 'react'
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { getAuthToken } from "../services/BackendService.tsx";
import { useNavigate } from "react-router-dom";
import { TextField, Container, Stack, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import './PlansForm.css'

const PlanForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<any>();
    const navigate = useNavigate();
    const [Clients, setClients] = useState([])
    const [Destiny, setDestiny] = useState([])
    const [selectedClient, setSelectedClient] = useState("");
    const [selectedDestination, setSelectedDestination] = useState("");


    useEffect(() => {
      const fetchPosts = async () => {


          const config = {
              headers: {
                  Authorization: `Bearer ${getAuthToken()}`
              }
          }

          const res = await axios.get('http://localhost:9091/api/v1/client/all', config)
          setClients(res.data)
          const res2 = await axios.get('http://localhost:9091/api/v1/destination/all', config)
          setDestiny(res2.data)
      }

      fetchPosts()
  }, [])

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
          idClie: selectedClient,
          idDest: selectedDestination
        };
        
    
        try {
          const response = await axios.post('http://localhost:9091/api/v1/plan/save', dataWithDefaults, config);
          alert(`Plan ${response.data.name} creado exitosamente!`)
          navigate('/Plans')
        } catch (error) {
          console.error('Error al enviar los datos:', dataWithDefaults);
        }
      };
    
      const handleClientChange = (event) => {
        setSelectedClient(event.target.value);
      };
      
      const handleDestinationChange = (event) => {
        setSelectedDestination(event.target.value);
      };



  return (
    <div className='page'>
      <Navbar></Navbar>
      <div className='container'>
      <div className='welcome-text' id='clients-text'>Crear Plan</div>
        <form className='create-form' onSubmit={handleSubmit(onSubmit)}>
          
        <div className='form-row' style={{height: 'auto'}}>
            <input id="code" {...register("code", { required: true })} placeholder='Codigo' className='inputs'/>
            {errors.code && <span>Este campo es obligatorio</span>}

            <input id="name" {...register("name", { required: true })} placeholder='Nombre' />
            {errors.name && <span>Este campo es obligatorio</span>}
        </div>

        <div className='form-row'>
            <input id="personCount" type="number" {...register("personCount", { required: true, min: 1 })} placeholder='Número de personas' className='inputs' style={{width: '100%'}}/>
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
            <input id="meal" {...register("meal", { required: true, maxLength: 1 })} placeholder='Comida' className='inputs'/>
            {errors.meal && <span>Este campo es obligatorio</span>}

            <input id="transport" {...register("transport", { required: true , maxLength: 1})} placeholder='Transporte'className='inputs'/>
            {errors.transport && <span>Este campo es obligatorio</span>}
        </div>

        <div className='form-row'>
            <input id="nightCount" type="number" step="1" {...register("nightCount", { required: true })} placeholder='Cantidad de noches' className='inputs'/>
            {errors.nightCount && <span>Este campo es obligatorio y debe ser un número positivo</span>}
        
            <input id="dayCount" type="number" step="1" {...register("dayCount", { required: true })} placeholder='Cantidad de dias'className='inputs'/>
            {errors.dayCount && <span>Este campo es obligatorio y debe ser un número positivo</span>}
        </div>

        <div className='form-row'>
            <input id="totalValue" type="number" step="0.01" {...register("totalValue", { required: true, min: 0 })} placeholder='Valor Total'className='inputs'style={{width: '100%'}}/>
            {errors.totalValue && <span>Este campo es obligatorio y debe ser un número positivo</span>}
        </div>
        <div className='form-row'>
          <select className='clientes' onChange={handleClientChange} value={selectedClient} style={{width: '100%'}}>
            {Clients.map(client => (
              <option key={client.idClie} value={client.idClie}>{client.name}</option>
            ))}
        </select>
        {errors.totalValue && <span>Este campo es obligatorio y debe ser un número positivo</span>}
        </div>

        <div className='form-row'>
          <select className='destinys' onChange={handleDestinationChange} value={selectedDestination} style={{width: '100%'}}>
            {Destiny.map(destination => (
              <option key={destination.id} value={destination.id}>{destination.name}</option>
            ))}
          </select>
            {errors.totalValue && <span>Este campo es obligatorio y debe ser un número positivo</span>}
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