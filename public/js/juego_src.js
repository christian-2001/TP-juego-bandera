let index = 0 //Usado para iterar sobre las preguntas
let [tiempo_inicio, tiempo_final, tiempo_total] = [10, 0, 0] // [Tiempo establecido para el temporizador, tiempo tardado en responder, tiempo total de la partida]
let [puntaje, puntaje_total] = [0, 0] // [puntaje obtenido en la pregunta, puntaje acumulado en la partida]
let cantCorrectas = 0 // Refleja la cantidad de respuestas correctas
let temporizador = 10 // Tiempo restante para responder una pregunta
let conteo // Variable que guarda en cada pregunta, una funcion que permite descontar segundos del temporizador
let tiempo_promedio = 0 //El tiempo promedio tardado en responder cada pregunta
let [minutos, segundos]  = [0, 0] // [Cantidad de minutos, cantidad de segundos]
let duracion_msj = '' //Imprime en la pantalla de resultados, el tiempo total de la partida

//Cuando se carga la pagina, genera la pantalla con la pregunta, temporizador, sistema de puntaje y las respuestas
document.addEventListener("DOMContentLoaded", () => {
    mostrarPregunta()
});

const mostrarPregunta = () => {
    temporizador = tiempo_inicio
    let buttons = ''
    let item = ''

    const h1_pregunta = `<h1>${preguntas[index]['pregunta']}</h1>`
    
    if(preguntas[index]['capital']){
    
        item = `<h1 class='text-center mt-10 text-blue-500 '>${preguntas[index]['capital']}</h1>`

        preguntas[index]['respuestas'].forEach(resp => {
            if(resp['correcta']){
                buttons += `<button id='green' class='bg-white p-4 border-4 rounded-4xl hover:-translate-y-1 hover:bg-gray-400' onclick='resp_correcta()'>${resp['correcta']}</button>`
            } else if(resp['incorrecta']){
                buttons += `<button class='red bg-white p-4 border-4 rounded-4xl hover:-translate-y-1 hover:bg-gray-400' onclick='resp_incorrectas()'>${resp['incorrecta']}</button>`
            }
        })

        puntaje = 3
    } else if(preguntas[index]['bandera']){
        item = `<img src=${preguntas[index]['bandera']} height='300px' class='border-4 border-solid mt-10 w-auto ml-auto mr-auto'>`
    
        preguntas[index]['respuestas'].forEach(resp => {
            if(resp['correcta']){
                buttons += `<button id='green' class='bg-white p-4 border-4 rounded-4xl hover:-translate-y-1 hover:bg-gray-400' onclick='resp_correcta()'>${resp['correcta']}</button>`
            } else if(resp['incorrecta']){
                buttons += `<button class='red bg-white p-4 border-4 rounded-4xl hover:-translate-y-1 hover:bg-gray-400' onclick='resp_incorrectas()'>${resp['incorrecta']}</button>`
            }
        })

        puntaje = 5
    } else if(preguntas[index]['pais']){
        item = `<h1 class='text-center mt-10 text-green-600'>${preguntas[index]['pais']}</h1>`

        preguntas[index]['respuestas'].forEach(resp => {
            if(resp['correcta'] !== undefined){
                buttons += `<button id='green' class='bg-white p-4 border-4 rounded-4xl hover:-translate-y-1 hover:bg-gray-400' onclick='resp_correcta()'>${resp['correcta']}</button>`
            } else {
                buttons += `<button class='red bg-white p-4 border-4 rounded-4xl hover:-translate-y-1 hover:bg-gray-400' onclick='resp_incorrectas()'>${resp}</button>`
            }
        })

        puntaje = 3
    }

    document.getElementById('temporizador').innerHTML = `<h1> Tiempo: 0:10 </h1>`

    document.querySelector('.pregunta').innerHTML = ` ${h1_pregunta} ${item} `

    document.getElementById('pregunta_contador').innerHTML = `Preguntas ${index + 1}/10`
    
    document.querySelector('.btn_opciones').innerHTML = `${buttons}`

    document.querySelector('.puntos').innerHTML = ''


    conteo = setInterval(() => {
        temporizador--
        document.getElementById('temporizador').innerHTML = `Tiempo: 0:0${temporizador}`
        if(temporizador == 0) {
            document.querySelector('.puntos').innerHTML = `<h1 class='bg-white p-5 w-fit ml-auto mr-auto border-4'> Tiempo fuera!!! no ganas puntos </h1>`
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

    //Si responde correctamente, gana puntos
    puntaje_total += puntaje
 
    //Si responde correctamente, se imprime un mensaje indicando que la respuesta es correcta y dice cuantos puntos ganó
    document.querySelector('.puntos').innerHTML = `<h1 class='bg-white p-5 w-fit ml-auto mr-auto border-4'> <span class='text-lime-600'> Correcto!!</span>, ganaste ${puntaje} puntos </h1>`

    //Avanza a la siguiente pregunta
    avanzar()
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

    //Si responde incorrectamente, se imprime un mensaje indicando que la respuesta es incorrecta y que no obtiene puntos
    document.querySelector('.puntos').innerHTML = `<h1 class='bg-white p-5 w-fit ml-auto mr-auto border-4'> <span class='text-red-700'> Incorrecto</span>, no ganas puntos </h1>`

    //Avanza a la siguiente pregunta
    avanzar()
}


//Funcion que pasa a la siguiente pregunta
const avanzar = () => {

    //Sumamos el tiempo tardado en cada respuesta
    if(temporizador == 10 || temporizador == 0){
        tiempo_promedio += 0
    } else {
        tiempo_promedio += (tiempo_inicio - temporizador)
    }

    //Incrementa a uno la variable que permite pasar a otra pregunta
    index++

    // El tiempo total es la suma del tiempo restante en el temporizador después de cada respuesta
    console.log(`TEMPORIZADOR: ${temporizador}`)
    tiempo_total += temporizador != 10 ? tiempo_inicio - temporizador : 0
    console.log(`TIEMPO TOTAL: ${tiempo_total}`)
    console.log(`TIEMPO PROMEDIO: ${tiempo_promedio}`)

    //Si la variable no llega a 10, pasa a la otra pregunta, si no, mostramos los resultados de la partida
    if(index < 10){
        setTimeout(() => {
            mostrarPregunta()
        }, 2000);
    } else {
        //Obteniendo los minutos y segundos
        minutos = tiempo_total > 60 ? Math.floor((tiempo_total / 60)) : 0
        segundos = tiempo_total
        while(segundos > 60){
            segundos -= 60
        }

        //Creando el mensaje del tiempo total
        if(tiempo_total < 60){
            duracion_msj = `<h1 class='text-left mt-10'> Tiempo total de la partida: ${segundos} segundos  </h1>`
        } else if (tiempo_total == 60){
            duracion_msj = `<h1 class='text-left mt-10'> Tiempo total de la partida: 1 minuto  </h1>`
        } else {
            duracion_msj = `<h1 class='text-left mt-10'> Tiempo total de la partida: ${minutos} minuto y ${segundos} segundo/s  </h1>`
        }

        //Calcula el tiempo promedio tardado en responder cada pregunta. 
        tiempo_promedio = Math.round(tiempo_promedio / 10)
        setTimeout(() => {
            mostrar_resultados()
        }, 2000);
    }
}

const mostrar_resultados = () => {
    document.body.innerHTML = `
        <div class='w-fit ml-auto mr-auto mt-30 border-4 bg-white p-20'>
            <h1 class='text-center'> Resultados de la partida </h1>
            ${duracion_msj}
            <h1 class='text-left mt-10'> Tiempo promedio por pregunta: ${tiempo_promedio} segundos </h1>
            <h1 class='text-left mt-10'> Respuestas correctas: ${cantCorrectas} de 10 </h1>
            <h1 class='text-left mt-10'> Puntaje final: ${puntaje_total} </h1>
        </div>
    `
}