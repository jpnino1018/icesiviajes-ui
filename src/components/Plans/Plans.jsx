import React, { useEffect } from 'react'
import '../MainContainer/MainContainer.css'
import { useNavigate } from "react-router-dom";
import Navbar from '../Navbar/Navbar';
import { useState } from 'react';
import axios from 'axios'
import Posts from '../Posts/Posts.jsx'
import Pagination from '../Pagination/Pagination.jsx';
import { getAuthToken } from "../services/BackendService.tsx";

function Plans() {
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
        <div className='container'>
            <div className='welcome-text'>Planes</div>
            <svg onClick={() => {navigate('/Plans/Create')}} className="add-btn" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFF"><path d="M120-120v-80h720v80H120Zm74-200L80-514l62-12 70 62 192-52-162-274 78-24 274 246 200-54q32-9 58 12t26 56q0 22-13.5 39T830-492L194-320Z"/></svg>
            <Posts posts={currentPosts} loading={loading} entityType="plan" idKey="idPlan"/>
            <Pagination  postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}/>
        </div>
    </div>
  )
}

export default Plans