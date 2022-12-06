import React from 'react';
import fondoCine2 from '../img/peliculasFondo.jpg';
import '../style/inicio.css';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';



export default function HeaderInicio() { 
  const [busqueda, setBusqueda]=useState('');
  const navegar=useNavigate();
  
  const aa=async (e)=>{
  e.preventDefault();
  navegar(`/busqueda/${busqueda}`)
}

  const handleChange=(e)=>{
    const pelicula=e.target.value;
    setBusqueda(pelicula)
  }
  
  const parametro=useParams()
  const [infoSecion, setInfoSecion]=useState({
    nombre:"",
    foto:""
  });

    const obtenerSecion= async ()=>{

        const res = await Axios.get(`/inicio`,{
          headers:{
            "authorization":`Bearer ${localStorage.getItem('token')}`
          }
        })
        const user=res.data[0]
        setInfoSecion({nombre:user.nombre, foto:user.foto})
    }
    const cerrarSesion=async()=>{
     await localStorage.removeItem('token');
     navegar('/')
    }
    useEffect(() => {
      obtenerSecion()
    }, [])
    

  return (
    <>
    <div id='appBar'>
        <img src={infoSecion.foto} />
    <p>{`Bienvenido ${infoSecion.nombre}`}</p>
    <Button onClick={()=>{navegar('/friends')}} color='primary' variant='contained' startIcon={<HowToRegIcon/>}
   sx={{fontSize:'2vw'}}
   >Amigos</Button>

    <form id='buscarPelicula' onSubmit={aa}>
       <TextField onChange={handleChange} type='text' variant='outlined' label='Buscar'   
        size="small"
        sx={{width:200}}
        color='secondary'
        inputProps={{style:{color:'white' }}}
        InputLabelProps={{style:{color:'white'}}} />
         <Button
         sx={{fontSize:'2vw'}}
         variant='contained' type='submit' color='info'>Buscar</Button>
    </form>
         <Button
         sx={{fontSize:'2vw'}}
         variant='contained' onClick={cerrarSesion} color='info'>cerrar sesion</Button>
    
    </div>
    
          <header>
    
    <img src={fondoCine2}/>
    <h1>CInePoliHD</h1>
    
    </header>
        </>
  )
}
