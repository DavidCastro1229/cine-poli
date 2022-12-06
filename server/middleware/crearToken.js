
// Middleware para obtener token y enviarlo al req para recivirlo en la api privada para validar acceso
const validarSiTokenLlego=(req, res, next)=>{
    // obtenesmo acceso al token quenos llega del lado del cliente que enviamos con la api login
    const obteninendoToken = req.headers["authorization"];
    console.log('middleware')

    // Validar si dicho token existe "se analiz el tipado "  'obtenemos el token con el metodo split'
    if(typeof obteninendoToken !== 'undefined') {
        const token= obteninendoToken.split(' ')[1]  //con esto obtenemos el token
        req.token=token //enviamos el token por el req   
        next()
    }else{
        res.sendStatus(403);
    }
}
module.exports = {validarSiTokenLlego}