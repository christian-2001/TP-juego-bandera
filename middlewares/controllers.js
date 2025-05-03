//Funciones comunes para usar en diferentes rutas del servidor
export const controller = {}

//Imports
import {barajarPreguntas} from '../src/js/barajarPreguntas.js'
import fs from 'node:fs'
import {fileURLToPath} from 'url'
import path, {dirname} from 'path'

//Variables para usar rutas absolutas
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

//Funciones comunes
controller['inicio'] = (req, res) => {
    res.render('index')
}

controller['juego'] = (req, res) => { 
    barajarPreguntas(req, res) 
}

controller['ranking'] = (req, res) => {

    const filePath = path.join(__dirname, '../json/ranking_info.json')
    const data = fs.readFileSync(filePath, {encoding: 'utf-8'})
    const ranking_data = JSON.parse(data)
    res.render('ranking', {ranking_data})
    
}
