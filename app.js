import express from 'express';
import {fileURLToPath} from 'url'
import path, {dirname} from 'path'
import {router} from './routes/juegoRutas.js'

const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(express.static('public'));  
app.set('view engine', 'pug')
app.set('views', './views')

app.use('/', router)

app.use('/otraruta', router)


app.get('/*rtrtrtrt', (req, res) => {
    res.send(
        `<body style="margin: 0"> 
            <img src="https://http.cat/404" style="width: 100%; height: 100%"> 
         </body>`)
    });


app.listen(PORT, () =>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
});