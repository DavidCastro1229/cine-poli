import React from 'react'
import Axios from 'axios'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Secciones from './secciones';

export default function Main() {

  const [principal, setPrincipal]=useState([]);
  
  const pagina=1;
  
  const obtenerContenido=async ()=>{
    const url=`https://api.themoviedb.org/3/movie/popular?api_key=21de1d64034798f233cc04a709cf10f7&language=es-MX&page=${pagina}`
    const res= await Axios.get(url)
  setPrincipal(res.data.results)
}
const navegar=useNavigate()

  useEffect(() => {
    obtenerContenido();
  }, [])
  


  return (
    <>
      <main>
        
   <div id="secciones">

    <Secciones targetaSeccion='Proximos Estrenos' secionesUrl={`https://api.themoviedb.org/3/movie/upcoming?api_key=21de1d64034798f233cc04a709cf10f7&language=es-MX&page=${pagina}`} />
    <Secciones targetaSeccion='Series en tendencia' secionesUrl={`https://api.themoviedb.org/3/tv/popular?api_key=21de1d64034798f233cc04a709cf10f7&language=es-MX&page=${pagina}`} />
    <Secciones targetaSeccion='Series en tendencia' secionesUrl={`https://api.themoviedb.org/3/tv/popular?api_key=21de1d64034798f233cc04a709cf10f7&language=es-MX&page=${pagina}`} />
    
   </div>

    <section id="principal">

      {
        principal.map((data)=>{

          return(
            <article key={data.id}>
            <img onClick={()=>navegar(`/cine/movie/${data.title}/${data.id}`)} loading="lazy" className='principal_img' src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} />
            <p className='title'>{data.title}</p>
            </article>

          )
        })
      }
    </section>
  </main>
    </>
  )
}
