//Imports
import express from 'express'
import {controller} from '../middlewares/controllers.js'

//Funcion Router de Express
export const router = express.Router()

//Rutas del juego
router.get('/', controller['inicio'])

router.get('/juego', controller['juego'])

router.get('/ranking', controller['ranking'])

router.get('/login', controller['login'])

router.get('/registro', controller['registro'])

router.post('/api/registro', controller['validar_registro'])

// router.get('/', (req, res) => {
//     res.render('inicio')
// });

// router.get('/juego', (req, res) => { 
//     barajarPreguntas(req, res)   
// })

// router.get('/login', (req, res) =>{
//     res.render('loginForm')
// })

// router.get('/registro', (req, res) =>{
//     res.render('registroForm')
// })