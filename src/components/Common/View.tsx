import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from "react-router-dom";
import './View.css'

const View = () => {
    const location = useLocation();
    const navigate = useNavigate();
    let entityObj = location.state.entityInfo;
    let entityType = location.state.enType;
  
    if(entityType==='client'){
    return (
      <div className='page'>
          <Navbar />
          <div className='container'>
              <div className='welcome-text'>Información del cliente</div>
              <div className='info-box'>
                <div className='view-row'><p className='view-tag'>Identificación:</p><p>{entityObj.identificationNumber}</p></div>
                <div className='view-row'><p className='view-tag'>Nombre:</p><p>{entityObj.name} {entityObj.lastName}</p></div>
                <div className='view-row'><p className='view-tag'>Teléfono:</p><p>{entityObj.phone1}</p></div>
                <div className='view-row'><p className='view-tag'>Correo:</p><p>{entityObj.email}</p></div>
                <div className='view-row'><p className='view-tag'>Género:</p><p>{entityObj.gender}</p></div>
              </div>
              <svg className='editView' onClick={() => navigate('/Clients/Edit/', { state: {clientInfo: entityObj}})} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
          </div>
      </div>
    )
  }
  else if(entityType==='plan'){
    return (
      <div className='page'>
          <Navbar />
          <div className='container'>
              <div className='welcome-text'>Información del plan</div>
              <div className='info-box'>
                <div className='view-row'><p className='view-tag'>Código:</p><p>{entityObj.code}</p></div>
                <div className='view-row'><p className='view-tag'>Nombre:</p><p>{entityObj.name}</p></div>
                <div className='view-row'><p className='view-tag'>Número de personas:</p><p>{entityObj.personCount}</p></div>
                <div className='view-row'><p className='view-tag'>Valor total:</p><p>${entityObj.totalValue}</p></div>
                <div className='view-row'><p className='view-tag'>Noches:</p><p>{entityObj.nightCount}</p></div>
                <div className='view-row'><p className='view-tag'>Dias:</p><p>{entityObj.dayCount}</p></div>
              </div>
              <svg className='editView' onClick={() => navigate('/Plans/Edit/', { state: {planInfo: entityObj}})} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
          </div>
      </div>
    )
  }
  else if(entityType==='destination'){
    return (
      <div className='page'>
          <Navbar />
          <div className='container'>
              <div className='welcome-text'>Información del destino</div>
              <div className='info-box'>
                <div className='view-row'><p className='view-tag'>Código:</p><p>{entityObj.code}</p></div>
                <div className='view-row'><p className='view-tag'>Nombre:</p><p>{entityObj.name}</p></div>
                <div className='view-row'><p className='view-tag'>Descripción:</p><p>{entityObj.description}</p></div>
                <img className='dest-img' src={entityObj.imgUrl}/>
              </div>
              <svg className='editView' onClick={() => navigate('/Destinations/Edit/', { state: {destinationInfo: entityObj}})} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
          </div>
      </div>
    )
  }
  return (
    <div>ERROR</div>
  )
}

export default View
