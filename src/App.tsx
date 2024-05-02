import './App.css';
import Login from './components/Login/Login.tsx'
import Home from './components/Home/Home.jsx'
import Clients from './components/Clients/Clients.jsx'
import Plans from './components/Plans/Plans.jsx'
import Destinations from './components/Destinations/Destinations.jsx'
import { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode'
import { CustomJwtPayload } from "./components/entity/CustomJwtPayload.tsx";
import { getAuthToken } from "./components/services/BackendService.tsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react'

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {

    let token = getAuthToken();
    if (token !== null) {
        setIsAuthenticated(true);
        const decoded = jwtDecode<CustomJwtPayload>(token);
        console.log(decoded);
        if (decoded.role == "ADMIN") {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    } else {
        setIsAuthenticated(false);
    }

  }, []);
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/Home' element={<Home />}/>
          <Route path='/Clients' element={<Clients />}/>
          <Route path='/Plans' element={<Plans />}/>
          <Route path='/Destinations' element={<Destinations />}/>
          {!isAuthenticated && <Login />}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
