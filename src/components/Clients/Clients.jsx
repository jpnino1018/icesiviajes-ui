import React, { useEffect } from 'react'
import './Clients.css'
import icesi_logo from '../assets/logo.svg'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Posts from '../Posts/Posts.jsx'
import Pagination from '../Pagination/Pagination.jsx';
import { useState } from 'react';
function Clients() {
    let navigate = useNavigate();
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(10)

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true)
            console.log("Hello")
            const res = await axios.get('http://localhost:9091/api/v1/client/all')
            setPosts(res.data)
            setLoading(false)
        }

        fetchPosts()
    }, [])

    console.log(posts)

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

    const paginate = pageNumber => setCurrentPage(pageNumber)
  return (
    <div className='page'>
        <div className='headbar'>
            <img onClick={() => {navigate('/Home')}} src={icesi_logo} className='logo'/>
            <div className='headbar-container'>
                <div className='clients' onClick={() => {navigate('/Clients')}}>Clientes</div>
            </div>
            <div className='headbar-container'>
                <div className='plans' onClick={() => {navigate('/Plans')}}>Planes</div>
            </div>
            <div className='headbar-container'>
                <div className='destinations' onClick={() => {navigate('/Destinations')}}>Destinos</div>
            </div>
        </div>
        <div className='container'>
            <div className='welcome-text' id='clients-text'>Clientes</div>
            <Posts posts={currentPosts} loading={loading}/>
            <Pagination  postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}/>
        </div>
    </div>
  )
}

export default Clients