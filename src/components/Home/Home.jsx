import './Home.css'
import Navbar from '../Navbar/Navbar.jsx'
import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { getAuthToken } from "../services/BackendService.tsx";
import Clients from '../Clients/Clients.jsx';


function Home() {
  const [destinos, setDestinos] = useState([])
  const [clientes, setClientes] = useState([])
  const [usuario, setUsuarios] = useState([])


  useEffect(() => {
    const fetchPosts = async () => {


        const config = {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`
            }
        }

        const res = await axios.get('http://localhost:9091/api/v1/plan/consult', config)
        setDestinos(res.data)
        const res2 = await axios.get('http://localhost:9091/api/v1/plan/clients', config)
        setClientes(res2.data)
        const res3 = await axios.get('http://localhost:9091/api/v1/plan/user', config)
        setUsuarios(res3.data)
        
    
    }

    fetchPosts()
}, [])
  return (
    <div className='page'>
        <Navbar/>
        <div className='container'>
            <div className='welcome-text'>Bienvenido Usuario</div>
        </div>
        <div>
            <table className='list-group'>
              <tr className='headers'>
                  <th>Destino</th>
                  <th>Ventas totales</th>
              </tr>
              {destinos.map((destiny) => (
              <tr className='list-group-item'>
                <td>{destiny.name}</td>
                <td>{destiny.total_sales}</td>
              </tr>
              ))}
            </table>
        </div>
        <div>
        <table className='list-group'>
              <tr className='headers'>
                  <th>Nombre</th>
                  <th>Compras totales</th>
              </tr>
              {clientes.map((client) => (
              <tr className='list-group-item'>
                <td>{client.name} {client.last_name}</td>
                <td>{client.total_sales}</td>
              </tr>
              ))}
            </table>
        </div>
        <div>
        <table className='list-group'>
              <tr className='headers'>
                  <th>Usuario</th>
                  <th>Total Planes Vendidos</th>
              </tr>
              {usuario.map((user) => (
              <tr className='list-group-item'>
                <td>{user.name}</td>
                <td>{user.total_sales}</td>
              </tr>
              ))}
            </table>
        </div>
    </div>
  )
}

export default Home