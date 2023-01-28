import Joi from 'joi'
import jwt from 'jsonwebtoken'
import config from '../config.js'
import User from '../models/users.js'
import Role from '../models/role.js'
import { ROLES } from "../models/role.js";

function validateLogin (req, res, next) {
    const name = req.body.name
    const mail = req.body.mail
    const passwd = req.body.passwd
    const cpasswd = req.body.cpasswd
    const schema=Joi.object({
        name: Joi.string().required().alphanum().max(20).min(3),
        mail: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).max(30).min(5).required(),
        passwd: Joi.string().min(4).alphanum().regex(/^[a-zA-Z0-9]{3,30}$/),
        cpasswd: Joi.ref('passwd')
    });
    
    const payload={
        name,mail,passwd,cpasswd
    };
    
    const { error } = schema.validate(payload);
    if(error) {
        res.status(400).json(error.message)
    } else next();
}

const verifyToken = async (req, res, next) => {
   try {
     //Es el token 
     const token = req.headers["x-access-token"]
     //console.log(token)
     //Si no existe el token envia error
     if (!token) return res.status(403).json({"ERROR":"No token provided =("})
 
     //Verificamos que el json webtoken sea válido
     const descodificado = jwt.verify(token,config.SECRET)
     //console.log(descodificado)
     req.userId = descodificado.id
 
     //Miramos si existe extrayendo el id del token pasado y comprobamos si existe
     const user = await User.findById(req.userId, {passwd: 0})
     //console.log(user);
     if (!user) return res.statuus(404).json({"ERROR":"User not found"})
 
     next()
   } catch (error) {
    return res.status(401).json({"ERROR":"Unauthorized"})
   }
}

const isModerator = async (req, res, next) => {
    //Coje el usuario de la validacion del webtoken
    const user = await User.findById(req.userId)
    //Esto te coje los roles del usuario que hemos obtenido antes
    const roles = await Role.find({_id: {$in: user.roles}})
    //Comprobamos si es moderador
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
            next()
            return 
        }
    }
    return res.status(403).json({"ERROR":"Moderator Role is required "})
}

const isAdmin = async (req, res, next) => {
    //Coje el usuario de la validacion del webtoken
    const user = await User.findById(req.userId)
    //Esto te coje los roles del usuario que hemos obtenido antes
    const roles = await Role.find({_id: {$in: user.roles}})
    //Comprobamos si es moderador
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
            next()
            return 
        }
    }
    return res.status(403).json({"ERROR":"Admin Role is required "})
}

const checkRoles = (req,res,next) => {
    if (Array.isArray(req.body.roles)) {
        //Si no existe el rol le mandamos un mensaje que no existe
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                return res.status(400).json({
                    "message": 'Role' + " " + req.body.roles[i] + " " + 'does not exist'
                })
            }
        }
    } else {
        res.send({"Error": "It has to be an array"})
    }
    next();
}

const checkNewUser = (req,res,next) => {
    console.log(req.body);
    let name = req.body.name
    let mail = req.body.mail
    let passwd = req.body.passwd
    let cpasswd = req.body.cpasswd
    const schema=Joi.object({
        name: Joi.string().required().alphanum().max(20).min(3),
        mail: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$')),
        passwd: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        cpasswd: Joi.any().required().valid(Joi.ref('passwd')).required()
    });
    
    const payload={
        name,mail,passwd,cpasswd
    };
    
    const { error, value } = schema.validate(payload);
    if(error) {
        res.json(error.message)
    } else next();
}

const updatedUsers = (req,res,next) => {
    console.log(req.body);
    const data = req.body
    // let name = req.body.name
    // let mail = req.body.mail
    // let passwd = req.body.passwd
    let payload = {}
    if (data.name == "") {
            
    } else {
        payload["name"]=data.name
    }
    if (data.mail == "") {
            
    } else {
        payload["mail"]=data.mail
    }
    if (data.passwd == "") {
            
    } else {
        payload["passwd"]=data.passwd

    }
    console.log(payload)
    const schema=Joi.object({
        name: Joi.string().optional().alphanum().max(20).min(3),
        mail: Joi.string().optional().pattern(new RegExp('^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$')),
        passwd: Joi.string().optional().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    });
    
    
    const { error, value } = schema.validate(payload);
    if(error) {
        res.status(400).json(error.message)
    } else next();
}


const functions = {
    validateLogin,
    verifyToken,
    isModerator,
    isAdmin,
    checkRoles,
    checkNewUser,
    updatedUsers
}

export default functions