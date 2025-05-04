// Objeto controlador que contiene handlers para cada ruta 
export const controller = {}

// Imports
import {barajarPreguntas} from '../src/js/barajarPreguntas.js'
import fs from 'node:fs'
import {fileURLToPath} from 'url'
import path, {dirname} from 'path'

// Variables para usar rutas absolutas
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Handlers

// Renderiza la pantalla de inicio
controller['inicio'] = (req, res) => {
    res.render('index')
}

// Renderiza la pantalla del juego con las preguntas y respuestas armadas
controller['juego'] = (req, res) => { 
    barajarPreguntas(req, res) 
}

// Guardamos el resultado de la partida del usuario en un archivo JSON
controller['resultados'] = (req, res) => { 

    const partida = req.body
    const filePath = path.join(__dirname, '../json/ranking_info.json')
    const data = fs.readFileSync(filePath, {encoding: 'utf-8'})
    const ranking_data = JSON.parse(data)
    ranking_data.push(partida)
    fs.writeFileSync(filePath, JSON.stringify(ranking_data, null, 3), {encoding : 'utf-8'})
    res.status(200).send({message: 'Partida del usuario guardada!!!'})
    
}

controller['ranking'] = (req, res) => {
    
    // Lee el archivo json que contiene informacion de las partidas de varios usuarios en el ranking y son guardados en otra variable
    const filePath = path.join(__dirname, '../json/ranking_info.json')
    const data = fs.readFileSync(filePath, {encoding: 'utf-8'})
    const ranking_data = JSON.parse(data)

    // Renderiza la pantalla del ranking con los datos de las partidas de varios usuarios
    res.render('ranking', {ranking_data})
    
}

// Renderiza la pantalla del error 404 personalizado
controller['error404'] = (req, res) => {
    res.render('error404')
}