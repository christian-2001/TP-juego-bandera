// Importamos "express"
import express from 'express'

// Importamos el objeto "controller" que ejecuta handlers para cada ruta
import {controller} from '../middlewares/controllers.js'

// Funcion Router de Express
export const router = express.Router()

// Rutas del juego
router.get('/', controller['inicio'])

router.get('/juego', controller['juego'])

// Ruta que envia datos de la partida del usuario mediante POST
router.post('/juego', controller['resultados'])

router.get('/ranking', controller['ranking'])

router.get('/*abcdefgty', controller['error404'])