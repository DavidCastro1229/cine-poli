import React from 'react'
import './style/chats.css'
import Axios from 'axios'
import {useEffect, useState, useRef} from 'react';
import { useParams } from 'react-router-dom';
import socket from '../web/socket';

export default function Mensajes() {
    const parametro=useParams()
    let mensajeRef=useRef();
    let chatsRef = useRef();
    
    const [usuario, setUsuario]=useState({
        nombre:parametro.nombre,
        id:parametro.id,
        Foto:''
    });
    let [mensaje, setMensaje]=useState('')
    let [mensajesChats, setMensajesChats]=useState([])

    const obtenerAmigoPorId=async ()=>{
        const res= await Axios.post('/userPorId', usuario,{
            headers:{
                "authorization": `Bearer ${localStorage.getItem('token')}`
            },
                });
                console.log(res)
            setUsuario({...usuario, Foto:res.data[0].foto})
    };

    //enviar MEnsaje
    const enviarMensaje=()=>{
        console.log(mensajesChats);

        socket.emit('mensaje', mensaje)
        mensajeRef.current.value = ""
    }

 
   useEffect(() => {
       
       const recibirMensaje=(chat)=>{
           let msg=document.getElementById('mostrarChat');
           msg.innerHTML +=`<p>${chat}</p>`
       }
       socket.on('chat', recibirMensaje);
     
   
     return () => {
        socket.off('chat');
     }
   }, [])
   
    
    useEffect(() => {
  obtenerAmigoPorId()
}, [])
  return (
   <main id='mainChat'>


   <div id="container">
    <div id='infoAmigo'>
        <img src={usuario.Foto} alt="" />
        <h1>{usuario.nombre}</h1>
    </div>

<div ref={chatsRef} id="mostrarChat">
</div>

<div id="escribiendo"></div>

<div id="textContainer">           
    <input ref={mensajeRef} onChange={e=>setMensaje(e.target.value)} id="text" type="text" placeholder="Escribir" />
    <input id="userName" type="text" placeholder="Username" />
    <button onClick={enviarMensaje} id="btn">Enviar</button>
</div>

</div>
   
   </main>
  )
}
