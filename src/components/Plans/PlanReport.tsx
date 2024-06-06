import React, { useEffect } from 'react'
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { getAuthToken } from "../services/BackendService.tsx";
import { useNavigate } from "react-router-dom";
import { TextField, Container, Stack, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import './PlansForm.css'

const PlanForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<any>();
    const navigate = useNavigate();
    const [Clients, setClients] = useState([])
    const [Destiny, setDestiny] = useState([])
    const [selectedClient, setSelectedClient] = useState("");
    const [selectedDestination, setSelectedDestination] = useState("");

    return(
        <div className='page'>
            <Navbar></Navbar>
                <div className='container'>
                    <div className='welcome-text' id='clients-text'>Crear Plan</div>
                </div>
        </div>
    )
}