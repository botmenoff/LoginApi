//Para poner un rol por defecto

import role from "../models/role.js"

export const createRoles = async () => {
    try {
        //Devuelve los roles creados
        const roleCounter = await role.estimatedDocumentCount()

        if (roleCounter > 0) return;

        //Esto los ejecuta todos "a la vez"
        const values = await Promise.all([
            new role({name: 'user'}).save(),
            new role({name: 'moderator'}).save(),
            new role({name: 'admin'}).save()
        ])

        console.log(values);
    } catch (error) {
        console.error(error)
    }
}