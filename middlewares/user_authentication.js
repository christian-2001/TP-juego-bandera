import jwt from 'jsonwebtoken'
 import dotenv from 'dotenv'
 import fs from 'node:fs'
 import {fileURLToPath} from 'url'
 import path, {dirname} from 'path'
 
 const __filename = fileURLToPath(import.meta.url)
 const __dirname = dirname(__filename)
 
 dotenv.config()
 
 export const revisarCookie = (req, res, next) => {
     try {
 
         const cookieJWT = req.headers.cookie.split(' ').find(cookie => cookie.startsWith('jsonwebtoken=')).slice(13)
         const decodificada = jwt.verify(cookieJWT, process.env.JWT_SECRET)
     
         const filePath = path.join(__dirname, '../json/users.json')
         const users_data = fs.readFileSync(filePath, {encoding: 'utf-8'})
         const users_obj = JSON.parse(users_data)
         const user_find = users_obj.find(user => user['nick'] === decodificada['nick'])
     
         if(!user_find){
             req.usuario = null
             return next()
         }
         
         req.usuario = decodificada
         return next() 
     
     } catch {
         req.usuario = null
         return next()
     }
 }