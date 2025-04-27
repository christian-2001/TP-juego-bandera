let [tiempo_inicio, tiempo_final] = [10, 0] // [Tiempo establecido para el temporizador, tiempo tardado en responder]
let [puntaje, puntaje_total] = [0, 0] // [puntaje obtenido en la pregunta, puntaje acumulado en la partida]
let dto_respIncorrecta = 0 // Guarda el total a descontar del puntaje total al responder incorrectamente
let cantCorrectas = 0 // Refleja la cantidad de respuestas correctas
let temporizador = 10 // Tiempo restante para responder una pregunta
let conteo // Variable que guarda en cada pregunta, una funcion que permite descontar segundos del temporizador

//Cuando se carga la pagina, genera la pantalla con la pregunta, temporizador, sistema de puntaje y las respuestas
document.addEventListener("DOMContentLoaded", () => {
    mostrarPregunta()
});

const mostrarPregunta = () => {
    temporizador = 10
    let buttons = ''
    let item = ''

    const h1_pregunta = `<h1>${preguntas[index]['pregunta']}</h1>`
    
    if(preguntas[index]['capital']){
    
        item = `<h1 class='text-center mt-10 text-blue-500 '>${preguntas[index]['capital']}</h1>`

        preguntas[index]['respuestas'].forEach(resp => {
            if(resp['correcta']){
                buttons += `<button id='green' class='bg-white p-4 rounded-4xl hover:-translate-y-1 hover:bg-gray-400' onclick='resp_correcta()'>${resp['correcta']}</button>`
            } else if(resp['incorrecta']){
                buttons += `<button class='red bg-white p-4 rounded-4xl hover:-translate-y-1 hover:bg-gray-400' onclick='resp_incorrectas()'>${resp['incorrecta']}</button>`
            }
        })

    } else if(preguntas[index]['bandera']){
        item = `<img src=${preguntas[index]['bandera']} height='300px' class='border-4 border-solid mt-10 w-auto ml-auto mr-auto'>`
    
        preguntas[index]['respuestas'].forEach(resp => {
            if(resp['correcta']){
                buttons += `<button id='green' class='bg-white p-4 rounded-4xl hover:-translate-y-1 hover:bg-gray-400' onclick='resp_correcta()'>${resp['correcta']}</button>`
            } else if(resp['incorrecta']){
                buttons += `<button class='red bg-white p-4 rounded-4xl hover:-translate-y-1 hover:bg-gray-400' onclick='resp_incorrectas()'>${resp['incorrecta']}</button>`
            }
        })
    } else if(preguntas[index]['pais']){
        item = `<h1 class='text-center mt-10 text-green-600'>${preguntas[index]['pais']}</h1>`

        preguntas[index]['respuestas'].forEach(resp => {
            if(resp['correcta'] !== undefined){
                buttons += `<button id='green' class='bg-white p-4 rounded-4xl hover:-translate-y-1 hover:bg-gray-400' onclick='resp_correcta()'>${resp['correcta']}</button>`
            } else {
                buttons += `<button class='red bg-white p-4 rounded-4xl hover:-translate-y-1 hover:bg-gray-400' onclick='resp_incorrectas()'>${resp}</button>`
            }
        })
    }

    document.getElementById('temporizador').innerHTML = `<h1> 0:10 </h1>`

    document.querySelector('.pregunta').innerHTML = ` ${h1_pregunta} ${item} `

    document.getElementById('pregunta_contador').innerHTML = `Preguntas ${index + 1}/10`
    
    document.querySelector('.btn_opciones').innerHTML = `${buttons}`

    document.querySelector('.puntos').innerHTML = ''


    conteo = setInterval(() => {
        temporizador--
        document.getElementById('temporizador').innerHTML = `0:0${temporizador}`
        if(temporizador == 0) {
            document.querySelector('.puntos').innerHTML = `<h1> Tiempo fuera!!! no obtienes puntos </h1>`
            const botones = document.querySelectorAll('button')
            botones.forEach(btn => {
                btn.disabled = true
                btn.classList.remove('hover:-translate-y-1')
                btn.classList.remove('hover:bg-gray-400')
            })
            document.querySelectorAll('button').forEach(btn => btn.disabled = true)
            clearInterval(conteo)
            avanzar()
        }
    }, 1000)
}

//Cuando se elije la respuesta correcta, se ejecuta la siguiente funcion
const resp_correcta = () =>{

    // Se detiene el temporizador
    clearInterval(conteo)

    //Aumentamos el contador de respuestas correctas
    cantCorrectas++

    //Obtiene el elemento button, se pinta de color verde y deshabilita sus clases
    const btn_green = document.getElementById('green')
    btn_green.style.backgroundColor = '#84cc16'
    btn_green.classList.remove('hover:-translate-y-1')
    btn_green.classList.remove('hover:bg-gray-400')
    
    //Guarda un array de todos los elementos button con la clase '.red'
    const btn_red = document.querySelectorAll('.red')

    //Deshabilita las clases y desactiva todos los button guardados
    for(let r = 0; r < btn_red.length; r++){  
        btn_red[r].classList.remove('hover:-translate-y-1')
        btn_red[r].classList.remove('hover:bg-gray-400')
        btn_red[r].disabled = 'true'
    }

    //Al contestar correctamente, no se descuentan 10000 puntos
    dto_respIncorrecta = 0

    //Llamada a la funcion que calcula el puntaje al responder la pregunta
    calcularPuntaje()
}

//Cuando se elije una de las respuestas incorrectas, se ejecuta la siguiente funcion
const resp_incorrectas = () =>{
    
    // Se detiene el temporizador
    clearInterval(conteo)

    //Guardo los buttons con la clase '.red'
    const btn_red = document.querySelectorAll('.red')

    //Deshabilita sus clases, se desactivan y se pintan de color rojo
    for(let r = 0; r < btn_red.length; r++){
        btn_red[r].style.backgroundColor = "#ef4444";    
        btn_red[r].classList.remove('hover:-translate-y-1')
        btn_red[r].classList.remove('hover:bg-gray-400')
        btn_red[r].disabled = 'true'
    }

    //Guarda el button con el id '#green'
    const btn_green = document.getElementById('green')

    //Se pinta de color verde, deshabilita sus clases y lo desactiva
    btn_green.style.backgroundColor = '#84cc16'
    btn_green.classList.remove('hover:-translate-y-1')
    btn_green.classList.remove('hover:bg-gray-400')
    btn_green.disabled = 'true'

    //Se añade a la variable, 10000 puntos que se descontarán del puntaje final al responder incorrectamente
    dto_respIncorrecta = 10000

    //Llamada a la funcion que calcula el puntaje al responder la pregunta
    calcularPuntaje()
}

const calcularPuntaje = () => {
    //Obtiene el total a descontar del puntaje segun el tiempo tardado en contestar la pregunta
    const tiempo_final = tiempo_inicio - temporizador // 10 - 7 = 3
    const dto = (tiempo_final * 2000)

        //Descuenta el puntaje total segun el tiempo tardado y si respondió correctamente o no
        if(dto_respIncorrecta > 0 && puntaje_total == 0){
            document.querySelector('.puntos').innerHTML = `<h1> Perdiste <span class='text-red-900'> 0 </span> puntos </h1>`
        }else if(dto_respIncorrecta == 0){
            puntaje = 20000 - dto
            puntaje_total += puntaje 
            document.querySelector('.puntos').innerHTML = `<h1> Ganaste <span class='text-lime-500'> +${puntaje} </span> puntos </h1>`
        }else if(dto_respIncorrecta > 0){
            if(puntaje_total != 0) puntaje = 20000 - dto_respIncorrecta
            puntaje_total -= puntaje 
            if(puntaje_total < 0) {
                puntaje_total = 0
            }
           document.querySelector('.puntos').innerHTML = `<h1> Perdiste <span class='text-red-900'> -${puntaje} </span> puntos </h1>`
        }

        console.log(`PUNTAJE TOTAL: ${puntaje_total}`)

        //Avanza a la siguiente pregunta
        avanzar()
}

//Funcion que pasa a la siguiente pregunta
const avanzar = () => {
    //Incrementa a uno la variable que permite pasar a otra pregunta
    index++

    //Si la variable no llega a 10, pasa a la otra pregunta, si no, mostramos los resultados de la partida
    if(index < 10){
        setTimeout(() => {
            mostrarPregunta()
        }, 2000);
    } else {
        setTimeout(() => {
            mostrar_resultados()
        }, 2000);
    }
}

const mostrar_resultados = () => {
    document.body.innerHTML = `
        <div class='w-fit ml-auto mr-auto mt-30 border-4 bg-white p-20'>
            <h1 class='text-center'> Resultados de la partida </h1>
            <h1 class='text-left mt-10'> Puntaje final: ${puntaje_total} </h1>
            <h1 class='text-left mt-10'> Respuestas correctas: ${cantCorrectas}/10 </h1>
        </div>
    `
}

