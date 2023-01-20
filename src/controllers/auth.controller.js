import User from '../models/users.js'
import jwt from "jsonwebtoken"
import config from '../config.js'
import Role from '../models/role.js'
import bcrypt from 'bcrypt'

const signUp = async (req,res) => {
    try {
        const {name,mail,passwd,roles} = req.body

    const newUser = new User({
        name,
        mail,
        //Llamamos al método de encriptacion (sin el await devuelve <Promise></Promise>)
        passwd:  await User.cifrarPasswd(passwd)
    })

    //Si existen roles (en el body)
    if (roles) {
        //Busco si el rol existe
        const rolesEncontrados = await Role.find({name:{$in: roles}})
        //Recorro el array de los roles para encontrar el rol
        newUser.roles = rolesEncontrados.map(roles => roles._id)
        //Añade la propiedad de roles en el nuevo usuario
    } else {
        //Si el usuario no pone nada le pones el usuario por defecto usuario
        const role = await Role.findOne({name: "user"})        
        newUser.roles = [role._id]
    }

    //Agregamos el usuario
    const userGuardado = await newUser.save()

    //Parametros ({Que queremos comparar del objeto},"Palabra Secreta",{Configuracion})
    const token = jwt.sign({id: userGuardado._id}, config.SECRET,{
        expiresIn: 86400 //24 horas
    })
    console.log(userGuardado)
    res.status(200).json({token})
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const sigIn = async (req,res) => {
    //Busca si existe
    const userFound = await User.findOne({mail: req.body.mail})
    
    if (userFound) {
        //Compruebo si las contraseñas coinciden
        const passwdMatch = await bcrypt.compare(req.body.passwd, userFound.passwd)
        //console.log("COINCIDEN: " + passwdMatch)
        //console.log("CONTRASEÑA1: " + req.body.passwd + " CONTRASEÑA2: " + userFound.passwd)
        if (passwdMatch) {
            const token = jwt.sign({ id: userFound._id }, config.SECRET, {
            expiresIn: 86400, // 24 hours
        });
        res.json({token, "roles": userFound.roles})
        } else {
            return res.status(401).json({message: 'Incorrect password try again'})
        }
    } else if(!userFound) {
        return res.status(400).json({message: "User not found"})
    }
}

const getUsers = async (req,res) => {
    const users = await User.find()
    res.status(200).json(users)
}

const resetpasswd = async (req,res) => {
    const {username} = req.body.username
    if (!(username)) {
        return res.status(400).json({message: "Username is required"})
    }

    const message = "Check your email for a link to reset your password"
    let verificationLink
    let emailStatus ='OK'

    const userRepository = ""
}

const functions = {
    getUsers,
    sigIn,
    signUp,
    resetpasswd
}

export default functions