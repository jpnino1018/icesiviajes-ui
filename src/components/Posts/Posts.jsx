import React from 'react'
import axios from 'axios'
import { getAuthToken } from "../services/BackendService.tsx";
import './Posts.css'

    const Posts = ({posts, loading, entityType, idKey }) => {
    if(loading) {
        return <div className='loading'> Loading... </div>
    }

    const handleDelete = async (idPost) => {
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


  return (
    <table className='list-group'>
      <tr className='headers'>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Identificación</th>
          <th>Correo</th>
      </tr>
      {posts.map(post => (
      <tr key={post[idKey]} className='list-group-item'>
          <td>{post[idKey]}</td>
          <td>{post.name}</td>
          <td>{post.firstLastName}</td>
          <td>{post.identificationNumber}</td>
          <td>{post.email}</td>
          <svg className='editBtn' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
          <svg className='deleteBtn' onClick={() => handleDelete(post[idKey])} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
      </tr>
      ))}
    </table>
  )
}

export default Posts
