import React, { useEffect } from 'react'
import { useState } from 'react';
import './Destinations.css'
import Navbar from '../Navbar/Navbar';
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../services/BackendService.tsx";
import Posts from '../Posts/Posts.jsx'
import Pagination from '../Pagination/Pagination.jsx';
import axios from 'axios'

function Destinations() {
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

          const res = await axios.get('http://localhost:9091/api/v1/plan/all', config)
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
            <Navbar></Navbar>
            <button onClick={() => {navigate('/Destinations/Create')}} className="add-destination-button">
                    Agregar Destino
            </button>
            <div className='container'>
                <div className='welcome-text'>Destinos</div>
                <Posts posts={currentPosts} loading={loading}/>
                <Pagination  postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}/>
            </div>
        </div>
    )
}

export default Destinations