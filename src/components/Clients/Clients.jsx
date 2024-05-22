import React, { useEffect } from 'react'
import './Clients.css'
import '../MainContainer/MainContainer.css'
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
        
        <div className='container'>
            <div className='welcome-text' id='clients-text'>Clientes
                <svg onClick={() => {navigate('/Clients/Create')}} className="add-btn" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z"/></svg>
            </div>
            <Posts posts={currentPosts} loading={loading} entityType="client" idKey="idClie"/>
            <Pagination  postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}/>
        </div>
    </div>
  )
}

export default Clients