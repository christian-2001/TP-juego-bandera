//Funciones comunes para usar en diferentes rutas del servidor
export const controller = {}
//Importar funcion que crea el juego
import {barajarPreguntas} from '../src/js/barajarPreguntas.js'

//Funciones comunes
controller['inicio'] = (req, res) => {
    res.render('index')
}

controller['juego'] = (req, res) => { 
    barajarPreguntas(req, res) 
}

controller['ranking'] = (req, res) => {
    res.render('ranking')
}

controller['login'] = (req, res) => {
    res.render('loginform')
}

controller['registro'] = (req, res) => {
    res.render('registroForm')
}

controller['validar_registro'] = (req, res) => {
    
}
