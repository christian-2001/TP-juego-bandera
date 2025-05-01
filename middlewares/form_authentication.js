import bcryptjs from 'bcryptjs'
 import jwt from 'jsonwebtoken'
 import dotenv from 'dotenv'
 
 dotenv.config()
 
 import fs from 'node:fs'
 import {fileURLToPath} from 'url'
 import path, {dirname} from 'path'
 
 const __filename = fileURLToPath(import.meta.url)
 const __dirname = dirname(__filename)
 
 export const login = async(req, res) => {
 
     const nick = req.body.nick
     const password = req.body.password
     console.log(nick, password)
 
     if(!nick || !password){
         return res.status(400).send({status:'error', message:'Los campos estan incompletos'})
     } 
 
     const filePath = path.join(__dirname, '../json/users.json')
     const users_data = fs.readFileSync(filePath, {encoding: 'utf-8'})
     const users_obj = JSON.parse(users_data)
     const user_find = users_obj.find(user => user['nick'] === nick)
     console.log(user_find)
 
     if(!user_find) {
         return res.status(400).send({status:'error', message:'Error durante inicio de sesion'})
     } 
 
     const loginCorrecto = await bcryptjs.compare(password, user_find['contraseña'])
     console.log(loginCorrecto)
 
     if(!loginCorrecto){
         return res.status(400).send({status:'error', message:'Error durante inicio de sesion'})
     }
 
     const token = jwt.sign(
         {nick: user_find['nick']}, 
         process.env.JWT_SECRET,
         {expiresIn:process.env.JWT_EXPIRATION})
         
         const cookieOption = {
             expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
             path: '/'
         }
 
         res.cookie('jsonwebtoken', token, cookieOption)
         res.send({status:'ok', message:'Usuario loggeado', redirect:'/'})
 }
 
 
 export const registro = async(req, res) => {
     const validation = {
         nick: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[A-Za-z\d_-]{8,20}$/,
         password: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/
     }
 
     const nick = req.body.nick
     const password = req.body.password
     const confirm = req.body.confirm
     console.log(nick, password, confirm)
 
     if(!nick || !password || !confirm){
         return res.status(400).send({status:'error', message:'Los campos estan incompletos'})
     } 
 
     if(!validation['nick'].test(nick) && !validation['password'].test(password)){
          return res.status(400).send({status:'error', message:'Nick o contraseña no validas'})
     } 
     
     if(!validation['nick'].test(nick)){
         return res.status(400).send({status:'error', message:'Nick no valido'})
     } 
     
     if(!validation['password'].test(password)){
         return res.status(400).send({status:'error', message:'Contraseña no valida'})
     } 
     
     if(password !== confirm){
         return res.status(400).send({status:'error', message:'Las contraseñas no son iguales'})
     } 
     
     const filePath = path.join(__dirname, '../json/users.json')
     const users_data = fs.readFileSync(filePath, {encoding: 'utf-8'})
     const users_obj = JSON.parse(users_data)
     const user_find = users_obj.find(user => user['nick'] === nick)
 
     if(user_find) return res.status(400).send({status:'error', message:'Este nick ya existe'})
 
     const salt = await bcryptjs.genSalt(5)
     const hashPassword = await bcryptjs.hash(password, salt)
     const new_user = {
         nick, password: hashPassword
     }
     console.log(new_user)
  
     const token = jwt.sign(
         {nick: new_user['nick']}, 
         process.env.JWT_SECRET,
         {expiresIn:process.env.JWT_EXPIRATION})
         
         const cookieOption = {
             expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
             path: '/'
         }
 
         res.cookie('jsonwebtoken', token, cookieOption)
 
     users_obj.push({nick: new_user['nick'], contraseña: new_user['password']})
     fs.writeFileSync(filePath, JSON.stringify(users_obj, null, 2), {encoding: 'utf-8'})
     return res.status(201).send({status:'ok', message: `Usuario ${new_user['nick']} agregado`, redirect:'/welcome'})
 
 }