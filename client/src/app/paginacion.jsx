import React from 'react';
import{Container, CircularProgress, LinearProgress } from '@mui/material';
import { useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Axios from 'axios'
import {Button} from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';
import './style/paginacion.css'

export default function Paginacion() {

    const parametro=useParams();

    const [paginacion, setPaginacion]=useState([])
    const [trailer, setTrailer]=useState([]);

       const tipoDeContenido= async ()=>{
  const url4=`https://api.themoviedb.org/3/${parametro.dominio}/${parametro.id}?api_key=21de1d64034798f233cc04a709cf10f7&language=es-MX`
  const res1 =await Axios.get(url4);
  setPaginacion(res1.data)

  const urlTrailer=`https://api.themoviedb.org/3/${parametro.dominio}/${parametro.id}/videos?api_key=21de1d64034798f233cc04a709cf10f7&language=es-MX`
  const res2 = await Axios.get(urlTrailer);
  setTrailer(res2.data.results[0].key)
       }
    useEffect(() => {
    tipoDeContenido()
    }, [])
    


// const uno=paginacion.popularity


  return (
    <>
    <main id='main'>

    <div id='header'>

    <img id='poster' src={`https://image.tmdb.org/t/p/w500/${paginacion.poster_path}`}/>

    </div>

    <div id='calificacion'>
    <p>{`calificacion: ${paginacion.vote_average}`}</p>
    </div>
    <LinearProgress
    sx={{height:7}}
    size={150}
    startIcon={<FaceIcon/>}
     id='progress' variant="buffer" value={paginacion.vote_average*10} valueBuffer={paginacion.vote_average*10+10} color='secondary' />
    <img id='backdrop' src={`https://image.tmdb.org/t/p/w500/${paginacion.backdrop_path}`}/>

    <div id='informacion'>
      <h3>{`Pelicula: ${parametro.dominio !== "movie" ? paginacion.name : paginacion.title}`}</h3>
      <h2>{paginacion.tagline !== '' ?`Tag: ${paginacion.tagline}` : 'La pelicula no contiene tag por el momento'}</h2>
    <p>{`Avance: ${paginacion.overview}`}</p>
    </div>

    <div id='botones'>
    <Button variant='contained' color='primary'>Ver en stream</Button>
    <Button variant='contained' color='warning'>Descargar</Button>
    </div>
    </main>
    <div id='infoExtra'>
      <h3>Trailer Oficial</h3>
    <iframe id='trailer' src={`https://www.youtube.com/embed/${trailer}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
     
    </div>
      </>
  )
}
