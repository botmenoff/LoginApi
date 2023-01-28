import User from '../models/users.js'
import jwt from "jsonwebtoken"
import config from '../config.js'
import Role from '../models/role.js'

const createUser = async (req,res) => {
    //Misma funcion que en el auth.controller.signUp [LLAMAR A ESA FUNCION EN VEZ DE VOLVERLA A HACER]
    try {
        const {name,mail,passwd,roles} = req.body
        const newUser = new User({
        name,
        mail,
        passwd:  await User.cifrarPasswd(passwd)
        })
        if (roles) {
            const rolesEncontrados = await Role.find({name:{$in: roles}})
            newUser.roles = rolesEncontrados.map(roles => roles._id)
        } else {
            const role = await Role.findOne({name: "user"})        
            newUser.roles = [role._id]
        }
        const userGuardado = await newUser.save()
        const token = jwt.sign({id: userGuardado._id}, config.SECRET,{
        expiresIn: 86400 //24 horas
        })
        console.log(userGuardado)
        res.status(200).json({token})
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const getAllUsers = async (req,res) => {
    const users = await User.find()
    res.status(200).json(users)
}

const getUserById = async (req,res) => {
    try {
        const user = await User.findById(req.params.userId)
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({"message": "User Id not found"})
    }
    
}

const updateUserById = async (req,res) => {
    try {
        let cifredpasswd = "";
        let data = req.body
        let userInput = {}
        if (data.name == "") {
            
        } else {
            userInput["name"]=data.name
        }
        if (data.email == "") {
            
        } else {
            userInput["mail"]=data.mail
        }
        if (data.passwd == "") {
            
        } else {
            userInput["passwd"]=data.passwd

        }
        console.log(userInput)
        if (userInput.passwd === undefined) {
            const updateduser = await User.findByIdAndUpdate(req.params.userId, userInput, {
                new: true
        })
        res.status(200).json(updateduser)
        } else if (userInput.passwd.length != 0) {
            cifredpasswd = await User.cifrarPasswd(userInput.passwd)
            userInput.passwd = await cifredpasswd
            const updateduser = await User.findByIdAndUpdate(req.params.userId, userInput, {
                new: true
            })
            res.status(200).json(updateduser)
        }
    } catch (error) {
        res.status(400).json({"message": "User Id not found"})
    }
    
}

const deleteUserById = async (req,res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.userId)
    res.status(200).json(deletedUser)
    } catch (error) {
        res.status(400).json({"message": "User Id not found"})
    }
    
}

const functions = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
}

export default functions