//Imports
import express from 'express'
import {controller} from '../middlewares/controllers.js'
import {login, registro} from '../middlewares/form_authentication.js'
 import {revisarCookie} from '../middlewares/user_authentication.js'

//Funcion Router de Express
export const router = express.Router()

//Rutas del juego
router.get('/', revisarCookie, controller['inicio'])

router.get('/juego', controller['juego'])

router.post('/juego', controller['resultados'])

router.get('/ranking', controller['ranking'])

router.get('/login', controller['login'])

router.post('/api/login', login)

router.get('/registro', controller['registro'])

router.post('/api/registro', registro)
 
router.get('/welcome', controller['welcome'])