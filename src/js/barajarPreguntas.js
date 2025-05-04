// Importamos funciones que realizan llamadas a la api
import {fetchCapitales} from './fetchCapitales.js'
import {fetchBanderas} from './fetchBanderas.js'
import {fetchLimitrofes} from './fetchLimitrofes.js'

// Importamos funciones que obtiene la pregunta de la capital, bandera de un pais, y el pais que limita con otros junto con las respuestas
import {itemCapital} from './itemCapital.js'
import {itemBandera} from './itemBandera.js'
import {itemLimitrofes} from './itemLimitrofes.js'

// Funcion para barajear y renderizar la pagina con la plantilla, la pregunta y sus respuestas
export const barajarPreguntas = async (req, res, items = ['CAPITAL', 'BANDERA', 'LIMITROFES']) => {
     
    // Indice que accede al array de "items", como parametro, cargado por predeterminado
    let index = 0

    // Array que guarda las 10 preguntas
    const setPreguntas = [] 

    // Bloque try-catch que contiene llamados a la api y generacion de preguntas aleatorias
    try{
        // Llamadas a la api que devuelven respuestas en json y se guardan en distintas variables
        const capitales = await fetchCapitales()
        const banderas = await fetchBanderas()
        const limitrofes = await fetchLimitrofes()

        // Barajea las 10 preguntas, cada una con 4 opciones y se guardan en el array
         for(let i = 0; i < 10; i++){
             index = items[Math.floor(Math.random() * items.length)] // Genera un indice aleatorio del array "items", dicho indice determina cual sera la pregunta a generar
             if(index === 'CAPITAL'){
                 setPreguntas.push(itemCapital(capitales))           // Obtiene la capital de un pais y las respuestas 
             } else if(index === 'BANDERA'){
                 setPreguntas.push(itemBandera(banderas))           // Obtiene la bandera de un pais y las respuestas
             } else if(index === 'LIMITROFES'){
                 setPreguntas.push(itemLimitrofes(limitrofes))      // Obtiene el pais con quien limita con otras y las respuestas
             }
         }
    } catch(error){
        // Error capturado
        console.log('ERROR: ' + error)
    }

    // Renderiza la plantilla del juego con las preguntas y respuestas generadas 
    res.render('juego', {setPreguntas})
}