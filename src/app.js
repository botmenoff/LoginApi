import express from "express"
import morgan from "morgan"
//import pkg from "../package.json" assert { type: "json" }
// import productRoutes from './routes/products.routes'
import authRoutes from './routes/auth.routes.js'
import userRoutes from "./routes/user.routes.js"
import { createRoles } from "./libs/inicio.js"
// import connection from './database'
import emailRoutes from './routes/mail.routes.js'

import db from './database.js'
db()
const app = express();
//Creamos los roles para que ya existan
createRoles();

app.use(express.json())
//seteamos una variable
//app.set('pkg',pkg)
//devuelve las peticiones que se hacen
app.use(morgan('dev'))
//ruta raiz
// app.get('/', (req,res) => {
//     res.json({
//         name: app.get('pkg').name,
//         author: app.get('pkg').author,
//         version: app.get('pkg').version
//     })
// })

// connection.createConnection()

/*RUTAS*/

// Se puede sustituir por una colección de ejercicios
// app.use('/api',productRoutes)

// ESTO SE PONE PARA QUE NO DE ERROR EN LA PETICIÓN 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    //Esto es una lista de las cabezeras permitidas en mi api
    res.header('Access-Control-Allow-Headers', 'x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Allow', 'GET, POST, PUT, DELETE');
    next();
});
app.use('/api',authRoutes)
app.use('/api',userRoutes)
app.use('/api',emailRoutes)
app.listen(3000);
console.log("Server listening on port ",3000);
export default app;