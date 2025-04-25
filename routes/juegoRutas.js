//Imports
import express from 'express'
import {barajarPreguntas} from '../src/js/barajarPreguntas.js'

//Funcion Router de Express
export const router = express.Router()

//Rutas del juego
router.get('/', (req, res) => {
    res.render('inicio')
});

router.get('/juego', (req, res) => { 
    barajarPreguntas(req, res)   
})

router.get('/login', (req, res) =>{
    res.render('loginForm')
})

router.get('/registro', (req, res) =>{
    res.render('registroForm')
})