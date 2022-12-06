import React from 'react'
import { Button } from '@mui/material'

export default function Footer() {
  return (
    <>
    <Button sx={{width:'100%'}} variant='contained' colors='primary' >Ver mas</Button>
      <div id="ver-mas">  
            CinePoliHD 
          ver o descargar películas full hd gratis en 1 LINK,
        Descargar películas. Ver películas online,
          Cine en casa gratis, Películas online,
          y para descargar en 1 link. 
          Excelente calidad z720p/1080p 
  </div>
  <footer>
    <article id="footer-1">
      <div>
        <h2>Secciones</h2>
        <a href="">Contenido</a><a href="">Destacados</a><a href="">Series</a>
     </div>
     <div>
       <h2>Redes</h2>
       <a href="">Instagram</a><a href="">Facebook</a><a href="">Youtube</a>
     </div>
     <div>
       <h2>Contacto</h2>
       <a href="">Gmail</a><a href="">whatsapp</a>
     </div> 
    </article>
    <section id="footer-2">
      <p>En CinePoliHD hay películas online en excelente calidad Bluray 4K 2160p, Full HD 1080p, audio latino,
        gratis, sin registro y toda la información.</p>
    </section>
  </footer>
    
    
    </>
  )
}

