import {fetchCapitales} from './fetchCapitales.js'
import {fetchBanderas} from './fetchBanderas.js'
import {fetchLimitrofes} from './fetchLimitrofes.js'
import {itemCapital} from './itemCapital.js'
import {itemBandera} from './itemBandera.js'
import {itemLimitrofes} from './itemLimitrofes.js'

//Funcion para barajear y renderizar la pagina con la plantilla, la pregunta y sus respuestas
export const barajarPreguntas = async (req, res, items = ['CAPITAL', 'BANDERA', 'LIMITROFES']) => {
     
    //Declaracion de variables
    let index = 0
    const setPreguntas = [] //Array que guarda las 10 preguntas

    //Bloque try-catch que contiene llamados a la api y generacion de preguntas aleatorias
    try{
        //Llamadas a la api que devuelven respuestas en json y se guardan en distintas variables
        const capitales = await fetchCapitales()
        const banderas = await fetchBanderas()
        const limitrofes = await fetchLimitrofes()

        // Barajea las 10 preguntas, cada una con 4 opciones y se guardan en el array
         for(let i = 0; i < 10; i++){
             index = items[Math.floor(Math.random() * items.length)]
             if(index === 'CAPITAL'){
                 setPreguntas.push(itemCapital(capitales))           //Funcion para obtener la capital y las respuestas 
             } else if(index === 'BANDERA'){
                 setPreguntas.push(itemBandera(banderas))         //Funcion para obtener la bandera y las respuestas
             } else if(index === 'LIMITROFES'){
                 setPreguntas.push(itemLimitrofes(limitrofes))      //Funcion para obtener el pais y las respuestas
             }
         }
    } catch(error){
        console.log('ERROR: ' + error)
    }
    
    console.log(setPreguntas)

    //Renderiza la plantilla del juego con los siguientes argumentos
    res.render('juego', {setPreguntas})
}