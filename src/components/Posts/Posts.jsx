import React from 'react'
import axios from 'axios'
import { getAuthToken } from "../services/BackendService.tsx";
import './Posts.css'
import { useNavigate } from "react-router-dom";




    const Posts = ({posts, loading, entityType, idKey }) => {
      let navigate = useNavigate();

    if(loading) {
        return <div className='loading'> Loading... </div>
    }
    

    const handleDelete = async (idPost) => {
      console.log(idPost)
      const config = {
        headers: {
            Authorization: `Bearer ${getAuthToken()}`
        }
      }
      
      try {

          const response = await axios.delete(`http://localhost:9091/api/v1/${entityType}/delete/${idPost}`, config);

          alert(`${entityType} eliminado exitosamente`);

          window.location.reload()

      } catch (error) {
          console.error('Hubo un problema con la eliminación:', error);
      }
    };

    if (entityType==='client') {
      return (
        <table className='list-group'>
          <tr className='headers'>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Identificación</th>
              <th>Correo</th>
          </tr>
          {posts.map(post => (
          <tr key={post[idKey]} className='list-group-item'>
              <td>{post.name}</td>
              <td>{post.lastName}</td>
              <td>{post.identificationNumber}</td>
              <td>{post.email}</td>
              <div className='row-buttons'>
                <svg className='checkBtn'xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFF"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Z"/></svg>
                <svg className='editBtn' onClick={() => navigate('/Clients/Edit/', { state: {clientInfo: post}})} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
              </div>
          </tr>
          ))}
        </table>
      )
    }
    else if (entityType==='plan') {
      return (
        <table className='list-group'>
          <tr className='headers'>
              <th>Nombre</th>
              <th># Personas</th>
              <th>Comienzo</th>
              <th>Fin</th>
              <th>Valor</th>
          </tr>
          {posts.map(post => (
          <tr key={post[idKey]} className='list-group-item'>
              <td>{post.name}</td>
              <td>{post.personCount}</td>
              <td>{post.startTravelDate}</td>
              <td>{post.endTravelDate}</td>
              <td>{post.totalValue}</td>
              <div className='row-buttons'>
                <svg className='checkBtn'xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFF"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Z"/></svg>
                <svg className='editBtn' onClick={() => navigate('/Plans/Edit/', { state: {planInfo: post}})} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
              </div>
          </tr>
          ))}
        </table>
      )
    }
    else if (entityType==='destination') {
      return (
        <table className='list-group'>
          <tr className='headers'>
              <th>Código</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Estado</th>
          </tr>
          {posts.map(post => (
          <tr key={post[idKey]} className='list-group-item'>
              <td>{post.code}</td>
              <td>{post.name}</td>
              <td>{post.description}</td>
              <td>{post.status}</td>
              <div className='row-buttons'>
                <svg className='checkBtn'xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFF"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Z"/></svg>
                <svg className='editBtn' onClick={() => navigate('/Destinations/Edit/', { state: {destinationInfo: post}})} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
              </div>
          </tr>
          ))}
        </table>
      )
    }
    return (
      <div>ERROR</div>
    )
}

export default Posts
