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
    res.render('index')
}

controller['juego'] = (req, res) => { 
    barajarPreguntas(req, res) 
}

// controller['resultados'] = (req, res) => { 

//     const partida = req.body
//     console.log(partida)
//     const filePath = path.join(__dirname, '../json/ranking_info.json')
//     const data = fs.readFileSync(filePath, {encoding: 'utf-8'})
//     const ranking_data = JSON.parse(data)
//     ranking_data.push(partida)
//     console.log('Partida del usuario guardada!!!')
//     fs.writeFileSync(filePath, JSON.stringify(ranking_data, null, 3), {encoding : 'utf-8'})
// }

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

// controller['welcome'] = (req, res) => {
//     const val = {
//         nick: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[A-Za-z\d_-]{8,20}$/,
//         password: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/
//     }

//     let nick = req.body.nick
//     let password = req.body.password
//     let confirm = req.body.confirm

//     if(!nick || !password || !confirm) return console.log('campo o campos incompletos')
//     if(!val['nick'].test(nick)) return console.log('Nick no valido')
//     if(!val['password'].test(password)) return console.log('Contraseña no valida')
//     if(confirm !== password) return console.log('Las contraseñas no son iguales')

//     if(val['nick'].test(nick) && val['password'].test(password) && confirm == password){

//         const filePath = path.join(__dirname, '../json/users.json')
//         const data = fs.readFileSync(filePath, {encoding: 'utf-8'})
//         const user_check = JSON.stringify(data)
//         const usuarios = JSON.parse(data)
//         const user = {nombre: nick, contraseña: password}

//         if(user_check.includes(nick)){
//             return console.log('El nick ya existe')
//         } else {
//             usuarios.push(user)
//             console.log('Se ha guardado un nuevo usuario!!!')
//             fs.writeFileSync(filePath, JSON.stringify(usuarios, null, 2), { encoding: 'utf-8' })
//             res.render('welcome')
//         }
//     }
// }