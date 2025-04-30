//Imports
import express from 'express';
import {fileURLToPath} from 'url'
import path, {dirname} from 'path'
import {router} from './routes/juegoRutas.js'

//Declaracion de variables
const app = express();
const PORT = process.env.PORT || 3000
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
 
//Configuraciones
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

//Middlewares para servir rutas del juego
app.use('/', router)

app.use('/juego', router)

app.use('/juego', router)

app.use('/ranking', router)

app.use('/login', router)

app.use('/registro', router)

// app.use('/welcome', router)

//Ruta para renderizar el error 404
app.get('/*rtrtrtrt', (req, res) => {
    res.send(
        `<body style="margin: 0"> 
            <img src="https://http.cat/404" style="width: 100%; height: 100%"> 
         </body>`)
    });

app.listen(PORT, () =>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
});

export default app