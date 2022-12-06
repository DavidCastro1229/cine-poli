const { Router }= require('express')
const rutas=Router();
const {validarSiTokenLlego}=require('../middleware/crearToken')

const {get, post, login, iniciado, userPorId}=require('../controllers/controllers')

rutas.get('/get', validarSiTokenLlego, get );
rutas.post('/post', post );
rutas.post('/login', login );
rutas.get('/inicio',validarSiTokenLlego, iniciado );
rutas.post('/userPorId',validarSiTokenLlego, userPorId );


module.exports= rutas;