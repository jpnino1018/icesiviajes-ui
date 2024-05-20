import React, { useEffect } from 'react'
import './Clients.css'
import icesi_logo from '../assets/logo.svg'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Posts from '../Posts/Posts.jsx'
import Pagination from '../Pagination/Pagination.jsx';
import { useState } from 'react';
import Navbar from '../Navbar/Navbar.jsx'
import { getAuthToken } from "../services/BackendService.tsx";


function Clients() {
    let navigate = useNavigate();
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(10)

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true)

            const config = {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`
                }
            }

            const res = await axios.get('http://localhost:9091/api/v1/client/all', config)
            setPosts(res.data)
            setLoading(false)
        }

        fetchPosts()
    }, [])

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

    const paginate = pageNumber => setCurrentPage(pageNumber)
  return (
    <div className='page'>
        <Navbar/>
        <button onClick={() => {navigate('/Clients/Create')}} className="add-client-button">
                    Agregar Cliente
        </button>
        <div className='container'>
            <div className='welcome-text' id='clients-text'>Clientes</div>
            <Posts posts={currentPosts} loading={loading} entityType="client" idKey="idClie"/>
            <Pagination  postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}/>
        </div>
    </div>
  )
}

export default Clients