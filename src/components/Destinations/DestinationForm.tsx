import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { getAuthToken } from "../services/BackendService.tsx";
import '../styles/CreateForm.css'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import uploadImageCloudinary from "../services/uploadImageCloudinary.ts";


const DestinationForm = () => {
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<any>();
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState<any>(null);


    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setValue("input_file", file);  // Actualiza el valor del input de archivo
      
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setImagePreview(null);
      }
    };

    const selectedFile = watch("input_file");

    const onSubmit: SubmitHandler<any> = async (data) => {

      const [status, img_reponse] = await uploadImageCloudinary(selectedFile)
      
      console.log(img_reponse)

      if(!status){
        alert('Error al subir la imagen')
        return
      }

      console.log(img_reponse.secure_url)

      const config = {
        headers: {
            Authorization: `Bearer ${getAuthToken()}`
        }
      }
      
      const dataWithDefaults = {
        idDest: -1,
        ...data,
        creationDate: new Date().toISOString(),
        modificationDate: '',
        creatorUser: 'admin',
        modifierUser: '',
        status: 'A',
        idTide: -1,
      };

      try {
        const response = await axios.post('http://localhost:9091/api/v1/destination/save', dataWithDefaults, config);
        alert(`Destino ${response.data.name} creado exitosamente!`)
        navigate('/Destinations')
      } catch (error) {
        console.error('Error al enviar los datos:', dataWithDefaults);
      }
    };

  return (
    <div className='page'>
      <Navbar></Navbar>
      <div className='container'>
        <div className='welcome-text' id='clients-text'>Crear Destino</div>
        <form className='create-form' onSubmit={handleSubmit(onSubmit)}>
        
        <input type="file" id="input_file" name="input_file" accept=".jpg" onChange={handleFileChange} />

        {imagePreview && (
        <div className='image-preview'>
          <img src={imagePreview} alt="Vista previa" />
        </div>
        )}

        <div className='form-row'>
          <label htmlFor="code">Código:</label>
          <input id="code" {...register("code", { required: true, maxLength: 5 })} />
          {errors.code && <span>Este campo es obligatorio y debe tener máximo 5 caracteres</span>}
        </div>

        <div className='form-row'>
          <label htmlFor="name">Nombre:</label>
          <input id="name" {...register("name", { required: true, maxLength: 100 })} />
          {errors.name && <span>Este campo es obligatorio y debe tener máximo 100 caracteres</span>}
        </div>

        <div className='form-row'>
          <label htmlFor="description">Descripción:</label>
          <input id="description" {...register("description", { required: true, maxLength: 300 })} />
          {errors.description && <span>Este campo es obligatorio y debe tener máximo 300 caracteres</span>}
        </div>

        <div className='form-row'>
          <label htmlFor="land">Terrestre:</label>
          <input id="land" {...register("land", { required: true, maxLength: 1 })} />
          {errors.land && <span>Este campo es obligatorio y debe tener máximo 1 carácter</span>}
        </div>

        <div className='form-row'>
          <label htmlFor="air">Aéreo:</label>
          <input id="air" {...register("air", { required: true, maxLength: 1 })} />
          {errors.air && <span>Este campo es obligatorio y debe tener máximo 1 carácter</span>}
        </div>

        <div className='form-row'>
          <label htmlFor="sea">Marítimo:</label>
          <input id="sea" {...register("sea", { required: true, maxLength: 1 })} />
          {errors.sea && <span>Este campo es obligatorio y debe tener máximo 1 carácter</span>}
        </div>
        <div className='btn-container'>
        <button className='send-form-btn' type="submit">Enviar</button>
        </div>
        </form>

      </div>

    </div>
  
  )
}

export default DestinationForm