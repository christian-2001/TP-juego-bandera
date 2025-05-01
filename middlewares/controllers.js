//Funciones comunes para usar en diferentes rutas del servidor
export const controller = {}

//Importar funcion que crea el juego
import {barajarPreguntas} from '../src/js/barajarPreguntas.js'

//Imports
import fs from 'node:fs'
import {fileURLToPath} from 'url'
import path, {dirname} from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

//Funciones comunes
controller['inicio'] = (req, res) => {
    res.render('index', {logueado: !!req.usuario})
}

controller['juego'] = (req, res) => { 
    barajarPreguntas(req, res) 
}

controller['resultados'] = (req, res) => { 

    const partida = req.body
    console.log(partida)
    const filePath = path.join(__dirname, '../json/ranking_info.json')
    const data = fs.readFileSync(filePath, {encoding: 'utf-8'})
    const ranking_data = JSON.parse(data)
    ranking_data.push(partida)
    console.log('Partida del usuario guardada!!!')
    fs.writeFileSync(filePath, JSON.stringify(ranking_data, null, 3), {encoding : 'utf-8'})
    res.status(200).send({message: 'Partida del usuario guardada!!!'})
}

controller['ranking'] = (req, res) => {

    const filePath = path.join(__dirname, '../json/ranking_info.json')
    const data = fs.readFileSync(filePath, {encoding: 'utf-8'})
    const ranking_data = JSON.parse(data)
    console.log(ranking_data)
    console.log(ranking_data.length)
    res.render('ranking', {ranking_data})
}

controller['login'] = (req, res) => {
    res.render('loginForm')
}

controller['registro'] = (req, res) => {
    res.render('registroForm')
}

controller['welcome'] = (req, res) => {
    res.render('welcome')
}