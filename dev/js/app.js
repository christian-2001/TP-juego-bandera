import express from 'express';
// import {home} from './home.js'
import {otraruta} from './otraruta.js'
import {get_data} from './armarJuego.js'
import path, {dirname} from 'path'
import {fileURLToPath} from 'url'

const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.set('view engine', 'pug')
app.set('views', './dev/views')

app.use(express.static('public')); 
app.use(express.static('public/views'))

// app.use((req, res, next) => {
//     console.log(req.user)
// })

app.get('/', (req, res) => {
    res.send('index.html')
});

app.get('/otraruta', (req, res) => { 
    fetch('https://restcountries.com/v3.1/all?fields=capital,translations')
    .then(response => response.json())
    .then(data => {
        const result = []
        let [arr_index, pais_elem, num_index] = [0, 0, Math.floor(Math.random() * 4)]
        let [select_capital, select_pais] = ['', {}]
        const paises_random = []

        for(let elem in data){
            if(!data[elem].capital[0] == ''){
                result.push({
                    capital: data[elem].capital[0], 
                    pais: data[elem].translations.spa.common
                })
            } 
        } 

        arr_index = Math.floor(Math.random() * (result.length + 1))
        select_capital = result[arr_index].capital
        select_pais['correcta'] = result[arr_index].pais

        for(let e = 0; e < 4; e++){  
            pais_elem = Math.floor(Math.random() * (result.length + 1))
            // paises_random.push(
            //     e == num_index ? select_pais : result[pais_elem].pais
            // )
            
            paises_random.push(
                e == num_index ? select_pais : {incorrecta: result[pais_elem].pais}
            )
            
        }

        console.log(select_capital)
        console.log(select_pais)
        console.log(paises_random)
        res.render('juego', {select_capital, paises_random})
    })
})

// app.use(otraruta)

app.get('/*rtrtrtrt', (req, res) => {
    res.send(
        `<body style="margin: 0"> 
            <img src="https://http.cat/404" style="width: 100%; height: 100%"> 
         </body>`)
    });


app.listen(PORT, () =>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
});