import React from 'react'
import { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import '../style/secciones.css';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export default function Secciones(props) {
  
  const navegar=useNavigate()
  // Referencias
  
  
  const [proximamente, setProximamente]=useState([])
const url2=props.secionesUrl;

const obtenerProximamente=async()=>{
  const res=await Axios.get(url2);
  setProximamente(res.data.results)
};



let cardRef=useRef();

const btnD=()=>{
  cardRef.current.scrollLeft+=cardRef.current.offsetWidth
}
const btnI=()=>{
  cardRef.current.scrollLeft-=cardRef.current.offsetWidth

}

const autoSlider=()=>{
  const slider=document.querySelectorAll('.containerSlider');

  slider.forEach((slider)=>{

    setInterval(() => {
  
      if(slider.scrollLeft+slider.offsetWidth+3 >= slider.scrollWidth){
      slider.scrollLeft=0
    }else{
      slider.scrollLeft+=slider.offsetWidth
    }
      
    }, 3000)
  })

}

useEffect(() => {
  obtenerProximamente();
  autoSlider();
} ,[]);




  return (
    <>

<div class="contenedorMadre">

        
<div ref={cardRef} class="containerSlider">
    
{
 proximamente.map((data)=>{
          return(
            <img  onClick={()=>navegar(`/cine/${props.targetaSeccion !== "Proximos Estrenos" ? "tv" : "movie"}/${data.name}/${data.id}`)} className='proximamenteImg' key={data.id} loading="lazy" src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}/>
          )
        })
}
        
    </div>

    <div class="seccionTarget">
        <p>{props.targetaSeccion}</p>
    </div>

    <div class="botones">
    <Button onClick={btnI}
    
    sx={{width:20, height:20}}
    size='small'
    color='inherit' variant='outlined'> Atras </Button>

        <div class="puntosSlider">
            <span class="puntos"></span>
            <span class="puntos"></span>
            <span class="puntos"></span>
        </div>

    <Button 
    
    sx={{width:20, height:20}}
    onClick={btnD}  color='inherit' variant='outlined'> Avanzar </Button>
</div>


</div>


    
    </>
  )
}
