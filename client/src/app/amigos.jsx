import React from 'react';
import Axios from 'axios'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

export default function Amigos() {
    const navegar=useNavigate();

    const [usuarios, setUsuarios]=useState([])
    const obteneAmigos=async()=>{
        const res = await Axios.get('/get',{
            headers:{
                "authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        setUsuarios(res.data)
    }
    useEffect(() => {
      obteneAmigos()
    }, [])
  return (
    <> <h1>hola</h1>
        {
        usuarios.map((data)=>{
        return(
    <div>
        <p>{data.nombre}</p>
        <button onClick={()=> navegar(`/chats/${data.nombre}/${data.id}`)}>
        chat
        </button>
    </div>

        )


        })}

    </>

  )
}
