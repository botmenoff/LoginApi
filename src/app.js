import express from "express"
import morgan from "morgan"
import pkg from "../package.json"
import productRoutes from './routes/products.routes'
import authRoutes from './routes/auth.routes'
import userRoutes from "./routes/user.routes"
import { createRoles } from "./libs/inicio"
import connection from './database'
import emailRoutes from './routes/mail.routes'

const db = require('./database')
db.createConnection()
const app = express();
//Creamos los roles para que ya existan
createRoles();

app.use(express.json())
//seteamos una variable
app.set('pkg',pkg)
//devuelve las peticiones que se hacen
app.use(morgan('dev'))
//ruta raiz
app.get('/', (req,res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        version: app.get('pkg').version
    })
})

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
export default app;