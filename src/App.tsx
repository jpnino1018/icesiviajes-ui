import './App.css';
import Login from './components/Login/Login.tsx';
import Home from './components/Home/Home.jsx';
import Clients from './components/Clients/Clients.jsx';
import Plans from './components/Plans/Plans.jsx';
import Destinations from './components/Destinations/Destinations.jsx';
import { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode'; // Cambiar esto
import { CustomJwtPayload } from "./components/entity/CustomJwtPayload.tsx";
import { getAuthToken } from "./components/services/BackendService.tsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import DestinationForm from './components/Destinations/DestinationForm.tsx';
import PlanForm from './components/Plans/PlanForm.tsx';
import ClientForm from './components/Clients/ClientForm.tsx';
import ClientEdit from './components/Clients/ClientEdit.tsx';
import DestinationEdit from './components/Destinations/DestinationEdit.tsx';
import PlanEdit from './components/Plans/PlanEdit.tsx';
import Unauthorized from './components/Unauthorized/Unauthorized.tsx';
import View from './components/Common/View.tsx';

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [token, setToken] = useState<string | null>(getAuthToken());

  useEffect(() => {
    if (token !== null) {
        setIsAuthenticated(true);
        const decoded = jwtDecode<CustomJwtPayload>(token);
        console.log(decoded);
        if (decoded.role === "ADMIN") {
            setIsAdmin(true);
            setIsSeller(false);
            setIsUser(false);
        } else if (decoded.role === "SELLER") {
          setIsSeller(true);
          setIsAdmin(false);
          setIsUser(false);
        } else if (decoded.role === "USER") {
          setIsUser(true);
          setIsAdmin(false);
          setIsSeller(false);
        }
    } else {
        setIsAuthenticated(false);
    }
  }, [token]); // Dependencia en el token

  return (
    <div>
      <Router>
        <Routes>
        <Route path='/' element={isAuthenticated ? <Home /> : <Login setToken={setToken} />} />
          <Route path='/Login' element={<Login setToken={setToken} />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/Clients' element={<Clients />} />
          <Route path='/Plans' element={<Plans />} />
          <Route path='/Destinations' element={<Destinations />} />
          <Route path='/Client/View' element={<View />} />
          <Route path='/Plan/View' element={<View />} />
          <Route path='/Destination/View' element={<View />} />
          

          <Route path='/Clients/Create' element={isSeller || isAdmin ? <ClientForm /> : <Unauthorized />} />
          <Route path='/Clients/Edit/' element={isSeller || isAdmin ? <ClientEdit /> : <Unauthorized />} />
          <Route path='/Destinations/Edit/' element={isSeller || isAdmin ? <DestinationEdit /> : <Unauthorized />} />
          <Route path='/Plans/Edit/' element={isSeller || isAdmin ? <PlanEdit /> : <Unauthorized />} />
          <Route path='/Destinations/Create' element={isSeller || isAdmin ? <DestinationForm /> : <Unauthorized />} />
          <Route path='/Plans/Create' element={isSeller || isAdmin ? <PlanForm /> : <Unauthorized />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
