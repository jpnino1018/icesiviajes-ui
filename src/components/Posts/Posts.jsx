import React from 'react'
import axios from 'axios'
import { getAuthToken } from "../services/BackendService.tsx";


    const Posts = ({posts, loading, entityType, idKey }) => {
    if(loading) {
        return <div> Loading... </div>
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
    <div className='list-group'>
        {posts.map(post => (
        <div key={post[idKey]} className='list-group-item'>
            <div><span className='item-tag'>ID</span>{post[idKey]}</div>
            <div><span className='item-tag'>Nombre</span>{post.name}</div>
            <button onClick={() => handleDelete(post[idKey])}>Eliminar</button>
        </div>
        ))}
    </div>
  )
}

export default Posts
