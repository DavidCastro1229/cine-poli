import react from 'react';
import './style/inicio.css';
import Header from './inicio_component/header'
import Main from  './inicio_component/main'
import Footer from './inicio_component/footer'
import HeaderInicio from './inicio_component/headerInicio';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import socket from '../web/socket'
import Axios from 'axios'

export default function Inicio(){

  const web=()=>{
    socket.emit('prueba', {mensaje:'hola mundo'})
  }
  
  const navegar=useNavigate()
  
  const parametro = useParams()

   const guardarSesion= async()=>{
    const res= await Axios.get('http://localhost:4000/inicio', {
      headers:{
        "authorization": `Bearer ${localStorage.getItem('token')}`
      }
    });
    if(res.data !== 'no has iniciado secion'){
       return navegar(`/inicio/${res.data[0].nombre}`)
    }
    console.log('no has iniciado secion');
   };
   
  useEffect(() => {
    guardarSesion();
    web()
  }, []); 
 return(

    <>
    {parametro.user ? <HeaderInicio/> : <Header/> }
    <Main />
    <Footer />    
    </>
 )   
}