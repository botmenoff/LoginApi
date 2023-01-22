import { Schema,model } from "mongoose";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { boolean } from "joi";

const userSchema = new Schema({

    name: {
        type: String,
        unique: true
    },
    mail: {
        type: String,
        unique: true
    },
    passwd: {
        type: String,
        require: true
    },
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }]
    },{
    timestamps: true,
    versionKey: false
    },{ typeKey: '$type' }
)

//Ciframos la contrasae

userSchema.statics.cifrarPasswd = async (passwd) => {
    //Encripta la contraseña (hace 10 ciclos)
    const salt = await bcrypt.genSalt()
    //Genero el hash
    return await bcrypt.hash(passwd, salt);
}

userSchema.statics.comparaPasswd = async (passwd, passwdRecivida) => {
    return await bcrypt.compare(passwd, passwdRecivida)
}


export default model("User", userSchema);