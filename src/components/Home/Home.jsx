import './Home.css'
import Navbar from '../Navbar/Navbar.jsx'
import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { getAuthToken } from "../services/BackendService.tsx";

function Home() {
  const [destinos, setDestinos] = useState([])


  useEffect(() => {
    const fetchPosts = async () => {


        const config = {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`
            }
        }

        const res = await axios.get('http://localhost:9091/api/v1/plan/consult', config)
        setDestinos(res.data)
        
        console.log(destinos)
    }

    fetchPosts()
}, [])
  return (
    <div className='page'>
        <Navbar/>
        <div className='container'>
            <div className='welcome-text'>Bienvenido Usuario</div>
        </div>
        <div className='container2'>
            <table className='list-group'>
              <tr className='headers'>
                  <th>Destino</th>
                  <th>Ventas totales</th>
              </tr>
              {destinos.map((destiny) => (
              <tr className='list-group'>
                <td>{destiny.name}</td>
                <td>{destiny.total_sales}</td>
              </tr>
              ))}
            </table>
        </div>
    </div>
  )
}

export default Home