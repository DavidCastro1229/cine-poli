import React from 'react'
import fondoCine2 from '../img/peliculasFondo.jpg'
import {Button, TextField} from '@mui/material'
import FaceIcon from '@mui/icons-material/Face';
import { useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../style/inicio.css';

export default function Header() {

const [busqueda, setBusqueda]=useState('')

const navegar=useNavigate();

const aa=async (e)=>{
  e.preventDefault();
  navegar(`/busqueda/${busqueda}`)
}

  const handleChange=(e)=>{
    const pelicula=e.target.value;
    setBusqueda(pelicula)
  }
  return (
    <>


<div id='appBar'>
   <Button onClick={()=>{navegar('/login')}} color='secondary' variant='contained' startIcon={<FaceIcon/>}
   sx={{fontSize:'2vw'}}
   >Iniciar Secion</Button>

<form id='buscarPelicula' onSubmit={aa}>
   <TextField onChange={handleChange} type='text' variant='outlined' label='Buscar'   
    size="small"
    sx={{width:200}}
    color='secondary'   
    inputProps={{style:{color:'white' }}}
    InputLabelProps={{style:{color:'white'}}}
     />
     <Button
     sx={{fontSize:'2vw'}}
     variant='contained' type='submit' color='info'>Buscar</Button>
</form>

</div>

      <header>

<img src={fondoCine2}/>
<h1>CInePoliHD</h1>

</header>
    </>
  )
}
