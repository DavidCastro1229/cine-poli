const dataBase = require('../dataBase/dataBase');
const jwt =require('jsonwebtoken');

const get =async (req, res)=>{
    try {
 const decoded = await jwt.verify(req.token, 'llaveSecreta',);
 if(decoded !== undefined){
     const result= await dataBase.query('SELECT * FROM usuarios');
     return res.send(result.rows);
 }
 res.send('no has iniciado secion');
} catch (error) {
 console.log(error)
}
}


const post =async (req, res)=>{
    const {nombre, correo, contraseña, foto}= req.body

    const respuestaPost = await dataBase.query('INSERT INTO usuarios (nombre, correo, contraseña, foto) VALUES($1, $2, $3, $4 )', [nombre, correo, contraseña, foto]);
   res.send('peticion post correcta')
}

const login = async (req, res) => {
    try {
        const { contrasena, correo } = req.body;
        const result = await dataBase.query("SELECT * FROM usuarios WHERE contraseña = $1 AND correo = $2" , [contrasena, correo]);
        
       const usuario=result.rows


        if(result.rows.length !== 0){
        // CREAMOS EL TOKEN CON JWT
        const token = await jwt.sign({user:usuario}, 'llaveSecreta', {expiresIn:'40m'});        

        res.json({
            token:token,
            user:result.rows
        })
        
        }else{
            res.send('correo o contraseña incorrecta !')
        }
    } catch (error) {
        console.log(error)
    }
};

const iniciado = async (req, res) => {
    try {
           // validamos el token token que estamos reciviendo de req.token que viene del middleware
    const decoded = await jwt.verify(req.token, 'llaveSecreta',);
    if(decoded !== undefined){
        const {contraseña, correo}= decoded.user[0]
        const result = await dataBase.query("SELECT * FROM usuarios WHERE contraseña = $1 AND correo = $2" , [contraseña, correo]);
        return res.send(result.rows);
    }
    res.send('no has iniciado secion');

} catch (error) {
    console.log(error)
}
};

const userPorId=async (req, res)=>{
    try {
        const decoded = await jwt.verify(req.token, 'llaveSecreta',);
        
        if(decoded !== undefined){
            const {nombre, id}= req.body
            const result= await dataBase.query('SELECT * FROM usuarios WHERE nombre = $1 AND id = $2', [nombre, id]);
            return res.send(result.rows);
        }
        res.send('no has iniciado secion');
       } catch (error) {
        console.log(error)
       }

}

module.exports={get, post, login, iniciado, userPorId}