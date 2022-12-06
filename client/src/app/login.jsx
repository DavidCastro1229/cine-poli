import React from 'react';
import './style/login.css';
import {useState, useEffect, useRef} from 'react';
import {TextField, CircularProgress} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';

export default function Login() {

    const navegar=useNavigate()

    // Validacion de inputs
    
    const expresiones={
        usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
        nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        contraseña: /^.{4,17}$/, // 4 a 12 digitos.
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        telefono: /^\d{7,14}$/ // 7 a 14 numeros.
    }



    const [validacionState, setvalidacionState]=useState(true);


    const validarForm=(e)=>{
     switch (e.target.name) {
        case 'nombre':
            validacion(expresiones.nombre, e.target, 'nombre')
            break;
        case 'correo' :
            validacion(expresiones.correo, e.target, 'correo')
            break;
        case 'contraseña' :
            validacion(expresiones.contraseña, e.target, 'contraseña')
            break;
     
        default:
            break;
     }
    };

    const validacion=(expresion, input, name)=>{
        if(expresion.test(input.value)){
            
            setvalidacionState(true)

        }else{
            setvalidacionState(false)
        }
    }
const [singUp, setSingUp]=useState(false);

// Capturar valores



const [imgNube, setImgNube]=useState('');

const [cargando, setCargando]=useState(false);

const [estado, setEstado]=useState(false)




// Enviar formulario


const capturarValor=(e)=>{
    const valor= e.target.value;
    const name= e.target.name;
    setRegistrarse({...registrarse, [name] : valor})
    setIniciar({...iniciarSecion, [name] : valor})
    
};
const enviarFormulario =async (e)=>{
    e.preventDefault();
    setCargando(true);

    const data=new FormData();
data.append("file", imgNube);
data.append("upload_preset", "david123" )

const res= await Axios.post('https://api.cloudinary.com/v1_1/dwsejzboq/image/upload', data);
const Foto=res.data.secure_url
setRegistrarse({...registrarse, foto : Foto});
setCargando(false);
setEstado(true)
 
}
const enviarABase=async()=>{
    console.log(registrarse);
    const resApi= await Axios.post(`/post`, registrarse);
    
    setEstado(false)
};
const [registrarse, setRegistrarse]=useState({
    nombre:"",
    correo:"",
    contraseña:"",
    foto:""
});

useEffect(() => {
      
    if(estado){
        enviarABase();
        
    }
},[registrarse])


 
//  Mostrar previa de foto y Capturar file de la foto
const [imgPrevia, setImgPrevia]=useState({
    peso:'',
});

const [displayImg, setDisplayImg]=useState(false);

const info =async(ar)=>{
    const imagenEnNube=ar[0];
    setImgNube(imagenEnNube);


    await Array.from(ar).forEach( (archivo) => {
         let reader=new FileReader();
         reader.readAsDataURL(archivo);
         reader.onload= async function (){
             const base64= reader.result;
             setImgPrevia({peso:base64})
         }
     }) 
     setDisplayImg(true)
 }
 const parametro=useParams();

 const [iniciarSecion, setIniciar]=useState({
    correo:"",
    contrasena:""
 });

 
 const obtenerCuenta=async (e)=>{
    e.preventDefault();

    console.log(iniciarSecion);
    const res=await Axios.post(`/login`, iniciarSecion);
    const user = res.data.user[0]
    await localStorage.setItem('token', res.data.token)

    setinicio({foto:user.foto, id:user.id});

    console.log(inicio)
    await setTimeout(() => {
        res.data !=='correo o contraseña incorrecta !' ? navegar(`/inicio/${res.data.user[0].nombre}`) : alert(res.data); 
    }, 2000);

    setDisplayImg(true)
 }
     const [inicio, setinicio] = useState({
        foto:"",
        nombre:"",
        id:""
     })


  return (
    <>
   
   <div class={singUp ? "container-form sign-up active": "container-form sign-up" }>
        <div class="welcome-back">
            <div class="message">
                <h2>Bienvenido a CinePoliHD</h2>
                <p>Si ya tienes una cuenta por favor inicia sesion aqui</p>
                <button onClick={()=>{setSingUp(true)}} className="btnSubmit">Iniciar Sesion</button>
            </div>
        </div>
        <form onSubmit={enviarFormulario} class="formulario">
            <h2 class="create-account">Crear una cuenta</h2>
            <div class="iconos">
                <div class={displayImg===false ? "border-icon": "border-icon disable"}></div>
                <img class={displayImg ? "border-icon": "border-icon disable"} src={imgPrevia.peso}/>
                <p>subir foto</p>
                 <TextField  onChange={(e)=>info(e.target.files)} type='file' variant='filled' size='small'
                  inputProps={{style:{color:'white', borderBottom:'white'}}} />

            </div>
            <p class="cuenta-gratis">Crear una cuenta gratis</p>
            <input value={registrarse.nombre}  onChange={capturarValor} className={validacionState ? 'input': 'ValidacionTrue'} onKeyUp={validarForm} type="text" name='nombre' placeholder="Nombre" />
            <input  value={registrarse.correo} onChange={capturarValor} className={validacionState ? 'input': 'ValidacionTrue'} onKeyUp={validarForm} type="email" name='correo' placeholder="Correo" />
            <input  value={registrarse.contraseña} onChange={capturarValor} className={validacionState ? 'input': 'ValidacionTrue'} onKeyUp={validarForm} type="password" name='contraseña' placeholder="Contraseña" />
            <button className='btnSubmit' type="submit" >{cargando ? <CircularProgress color='inherit' size={24}/> : 'Registrarse'}</button> 
        </form>
    </div>

    <div class={singUp ? "container-form sign-in active": "container-form sign-in"}>
        <form onSubmit={obtenerCuenta} class="formulario">
            <h2 class="create-account">Iniciar Sesion</h2>
            <div class="iconos">
            <div class={displayImg===false ? "border-icon": "border-icon disable"}></div>
            <img class={displayImg ? "border-icon": "border-icon disable"} src={inicio.foto}/>
            
            </div>
            <p class="cuenta-gratis">Si ya tienes cuenta inicia sesion aqui</p>
            <input onChange={capturarValor} className={validacionState ? 'input': 'ValidacionTrue'} onKeyUp={validarForm} name='correo' type="email" placeholder="Email" />
            <input onChange={capturarValor} className={validacionState ? 'input': 'ValidacionTrue'} onKeyUp={validarForm} name='contrasena' type="password" placeholder="Contraseña" />
            <button className='btnSubmit'  type="submit">Iniciar</button> 
        </form>
        <div class="welcome-back">
            <div class="message">
                <h2>Bienvenido de nuevo</h2>
                <p>Si aun no tienes una cuenta por favor registrese aqui</p>
                <button className='btnSubmit' onClick={()=>{setSingUp(false)}}>Registrarse</button>
            </div>
        </div>
    </div>
    </>
  )
}
