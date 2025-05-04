// Imports
import express from 'express';
import {fileURLToPath} from 'url'
import path, {dirname} from 'path'
import {router} from './routes/juegoRutas.js'

// Declaracion de variables
const app = express();
const PORT = process.env.PORT || 3000

// Varibales para usar rutas absolutas
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
 
// Configuraciones
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// Middlewares para servir rutas del juego
app.use('/', router)

app.use('/juego', router)

// Ruta que envia datos de la partida del usuario mediante POST
app.use('/juego', router)

app.use('/ranking', router)

// Ruta para renderizar el error 404 personalizado
app.use('/*abcdefgty', router)

// Indicamos que el servidor escucha peticiones en el puerto establecido
app.listen(PORT, () =>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
});

// Exportamos por defecto la variable que contiene los metodos express
export default app