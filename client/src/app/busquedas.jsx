import React from 'react';
import { useEffect, useState} from 'react';
import Axios from 'axios';
import {useParams} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import './style/busqueda.css'


export default function Busquedas() {
    const params=useParams();
    const [buscar, setBuscar]=useState([]);
    const obtenerBuscar=async ()=>{
      const urlBuscar=`https://api.themoviedb.org/3/search/movie?api_key=21de1d64034798f233cc04a709cf10f7&language=es-MX&query=${params.name}`
      const res = await Axios.get(urlBuscar);
      setBuscar(res.data.results)
    }
    useEffect(() => {
        obtenerBuscar()
    }, []);
    
    const navegar=useNavigate();
        
  return (
    <>
    {
    buscar.map((data)=>{
        return(
            <article id='articulo' key={data.id}>
                <img onClick={()=>{navegar(`/paginacion/${data.id}`)}}  loading="lazy" src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} />
            <p >{data.title}</p>
            </article>
        )
    })}
    </>
  )
}
