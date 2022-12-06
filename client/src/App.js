//  MODULO PARA CONECTAR RUTAS
// ROUTES PARA METER UNA LISTA DE RUTAS Y ROUTER PARA AGREGAR UNA RUTA A LA RUTA
import {BrowserRouter, Routes, Route} from 'react-router-dom';

//  MODULO MATERIAL UI
// APP
import './App.css';
import './app/style/inicio.css'
import Login from './app/login'
import Inicio from './app/incio'
import Paginacion from './app/paginacion'
import Busquedas from './app/busquedas'
import Amigos from './app/amigos';
import Mensajes from './app/mensajes';


function App() { 
  return (
  <BrowserRouter>
    <Routes>
    <Route  path='/' element={<Inicio />} /> 
    <Route path='/cine/:dominio/:titulo/:id' element={<Paginacion />} />
    <Route path='/busqueda/:name' element={<Busquedas />} />
    <Route path='/login' element={<Login />} />
    <Route path='/inicio/:user' element={<Inicio />} />
    <Route path='/friends' element={<Amigos />} />
    <Route path='/chats/:nombre/:id' element={<Mensajes />} />
    

    
  </Routes>

  </BrowserRouter>/***Path dice cuando visites x ruta muestra el siguiente elemento 'osea mostrar un componente' */

   
  )
};

export default App;
 