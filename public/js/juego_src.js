// Variables
let index = 0 // Usado para iterar sobre las preguntas
let [tiempo_inicio, tiempo_final, tiempo_total] = [10, 0, 0] // [Tiempo establecido para el temporizador, tiempo tardado en responder, tiempo total de la partida]
let [puntaje, puntaje_total] = [0, 0] // [puntaje obtenido en la pregunta, puntaje acumulado en la partida]
let cantCorrectas = 0 // Cantidad de respuestas correctas
let cantIncorrectas = 0 // Cantidad de respuestas incorrectas
let sinRespuestas = 0 // Cantidad de veces que el usuario no respondió la pregunta
let temporizador = 10 // Tiempo restante para responder una pregunta
let conteo // Variable que guarda en cada pregunta, una funcion que permite descontar segundos del temporizador
let tiempo_promedio = 0 // El tiempo promedio tardado en responder cada pregunta
let [minutos, segundos]  = [0, 0] // [Cantidad de minutos, cantidad de segundos]
let duracion_msj = '' // Imprime en la pantalla de resultados, el tiempo total de la partida

// Variable que guarda el nick ingresado por el usuario en un input
let nick_name = ''

// Guardamos elementos html en variables
const nick_container = document.querySelector('.nick_container')
const nick_input = document.getElementById('nick')
const boton_inicio = document.querySelector('.btn_inicio')
const temporizador_elem = document.getElementById('temporizador')
const pregunta_elem = document.querySelector('.pregunta')
const pregunta_contador = document.getElementById('pregunta_contador')
const btn_opciones = document.querySelector('.btn_opciones')
const puntos_elem = document.querySelector('.puntos')

// Indica si el usuario entró o no al ranking
let clasificado = false

// Mensaje que se crea si el usuario entró o no al ranking
let clasificado_msj = ''

// Guarda la partida del usuario
let result_final

// Al ingresar nuestro nick o nombre de usuario y dar click a "Iniciar juego", genera el juego completo
boton_inicio.addEventListener('click', () => {
    
    // Obtiene el nick ingresado 
    nick_name = nick_input.value

    // Desabilita el texto, input y boton de "Iniciar juego"
    nick_container.style.display = 'none'
    boton_inicio.style.display = 'none'

    // Habilitamos los elementos necesarios para generar el juego completo y mostrarlo por pantalla
    temporizador_elem.style.display = 'block'
    pregunta_elem.style.display = 'block'
    pregunta_contador.style.display = 'block'
    btn_opciones.style.display = 'grid'
    btn_opciones.style.gridTemplateColumns = 'repeat(2, 1fr)';
    puntos_elem.style.display = 'block'

    // Genera el juego con las preguntas y respuestas
    mostrarPregunta()
})

const mostrarPregunta = () => {
    
    // Temporizador inicializado con 10 segundos
    temporizador = tiempo_inicio

    let buttons = '' // Botones que contienen la respuesta correcta y el resto incorrectas
    let item = '' // Item de la pregunta (si es capital, bandera o pais que limitra con otros)

    const h1_pregunta = `<h1>${preguntas[index]['pregunta']}</h1>` // Genera la pregunta
    
    // Si la pregunta elegida se trata de la capital de un pais, mostramos la pregunta y respuestas
    if(preguntas[index]['capital']){
    
        item = `<h1 class='text-center mt-10 text-blue-500 '>${preguntas[index]['capital']}</h1>` // Muestra la pregunta
        
        // Genera las respuestas
        preguntas[index]['respuestas'].forEach(resp => {
            if(resp['correcta']){
                buttons += `<button id='green' class='bg-white p-4 border-4 rounded-4xl hover:-translate-y-1 hover:bg-gray-400' onclick='resp_correcta()'>${resp['correcta']}</button>`
            } else if(resp['incorrecta']){
                buttons += `<button class='red bg-white p-4 border-4 rounded-4xl hover:-translate-y-1 hover:bg-gray-400' onclick='resp_incorrectas()'>${resp['incorrecta']}</button>`
            }
        })

        // Puntaje establecido para la pregunta de capital
        puntaje = 3
    
        // Si la pregunta elegida se trata de la bandera de un pais, mostramos la pregunta y respuestas
    } else if(preguntas[index]['bandera']){
        item = `<img src=${preguntas[index]['bandera']} loading='lazy' width='320' height='240' class='border-4 border-solid mt-10 w-auto ml-auto mr-auto'>` //Muestra la pregunta
        
        // Genera las respuestas
        preguntas[index]['respuestas'].forEach(resp => {
            if(resp['correcta']){
                buttons += `<button id='green' class='bg-white p-4 border-4 rounded-4xl hover:-translate-y-1 hover:bg-gray-400' onclick='resp_correcta()'>${resp['correcta']}</button>`
            } else if(resp['incorrecta']){
                buttons += `<button class='red bg-white p-4 border-4 rounded-4xl hover:-translate-y-1 hover:bg-gray-400' onclick='resp_incorrectas()'>${resp['incorrecta']}</button>`
            }
        })

        // Puntaje establecido para la pregunta de bandera
        puntaje = 5

    // Si la pregunta elegida se trata de un pais que limita con otros, mostramos la pregunta y respuestas
    } else if(preguntas[index]['pais']){
        item = `<h1 class='text-center mt-10 text-green-600'>${preguntas[index]['pais']}</h1>` // Muestra la pregunta
        
        // Genera las respuestas
        preguntas[index]['respuestas'].forEach(resp => {
            if(resp['correcta'] !== undefined){
                buttons += `<button id='green' class='bg-white p-4 border-4 rounded-4xl hover:-translate-y-1 hover:bg-gray-400' onclick='resp_correcta()'>${resp['correcta']}</button>`
            } else {
                buttons += `<button class='red bg-white p-4 border-4 rounded-4xl hover:-translate-y-1 hover:bg-gray-400' onclick='resp_incorrectas()'>${resp}</button>`
            }
        })

        // Puntaje establecido para la pregunta de paises limitrofes
        puntaje = 3
    }

    // Cargamos el temporizador con 10 segundos por pregunta
    temporizador_elem.innerHTML = `<h1> Tiempo: 0:10 </h1>`

    // Cargamos la pregunta
    pregunta_elem.innerHTML = ` ${h1_pregunta} ${item} `

    // Cargamos un contador de preguntas
    pregunta_contador.innerHTML = `Preguntas ${index + 1}/10`
    
    // Cargamos las respuestas como botones, que el usuario puede hacer click, en una de ellas, para responder la pregunta
    btn_opciones.innerHTML = `${buttons}`

    // Cargamos un mensaje que dice si el usuario respondio bien o mal la pregunta, o no ha respondido nada en 10 segundos
    puntos_elem.innerHTML = ''

    // Funcion que permite funcionar el temporizador, el setInterval se ejecuta cada 1000 milisegundos pasados
    conteo = setInterval(() => {

        // Descontamos un segundo del temporizador
        temporizador--
        document.getElementById('temporizador').innerHTML = `Tiempo: 0:0${temporizador}`
        
        // Cuando el temporizador llegue a 0
        if(temporizador == 0) {

            // Si el usuario no ha respondidos en los 10 segundos restantes, muestra un mensaje indicando que, se acabó el tiempo y que no ha ganado puntos
            document.querySelector('.puntos').innerHTML = `<h1 class='bg-white p-5 w-fit ml-auto mr-auto border-4'> Tiempo fuera!!! no ganas puntos </h1>`

            // Aumentamos la cantidad de veces que el usuario no respondió la pregunta
            sinRespuestas++

            // Luego de 10 segundos, se deshabilita los botones y el usuario no puede hacer click en ninguno de ellos
            const botones = document.querySelectorAll('button')
            botones.forEach(btn => {
                btn.disabled = true
                btn.classList.remove('hover:-translate-y-1')
                btn.classList.remove('hover:bg-gray-400')
            })
            document.querySelectorAll('button').forEach(btn => btn.disabled = true)

            // Se detiene el temporizador
            clearInterval(conteo)

            // Avanza a la siguiente pregunta
            avanzar()
        }
    }, 1000)
}

// Cuando se elije la respuesta correcta, se ejecuta la siguiente funcion
const resp_correcta = () =>{

    // Se detiene el temporizador
    clearInterval(conteo)

    // Aumentamos el contador de respuestas correctas
    cantCorrectas++

    // Obtiene el boton con la respuesta correcta, se pinta de color verde y deshabilita sus clases
    const btn_green = document.getElementById('green')
    btn_green.style.backgroundColor = '#84cc16'
    btn_green.classList.remove('hover:-translate-y-1')
    btn_green.classList.remove('hover:bg-gray-400')
    
    // Guardo los botones con las respuestas incorrectas
    const btn_red = document.querySelectorAll('.red')

    // Se deshabilitan estos botones junto a sus clases y se pintan de color rojo
    for(let r = 0; r < btn_red.length; r++){  
        btn_red[r].classList.remove('hover:-translate-y-1')
        btn_red[r].classList.remove('hover:bg-gray-400')
        btn_red[r].disabled = 'true'
    }

    // Si responde correctamente, gana puntos
    puntaje_total += puntaje
 
    // Si responde correctamente, se imprime un mensaje indicando que la respuesta es correcta y dice cuantos puntos ganó
    document.querySelector('.puntos').innerHTML = `<h1 class='bg-white p-5 w-fit ml-auto mr-auto border-4'> <span class='text-lime-600'> Correcto!!</span>, ganaste ${puntaje} puntos </h1>`

    // Avanza a la siguiente pregunta
    avanzar()
}

// Cuando se elije una de las respuestas incorrectas, se ejecuta la siguiente funcion
const resp_incorrectas = () =>{
    
    // Se detiene el temporizador
    clearInterval(conteo)

    // Aumentamos el contador de respuestas incorrectas
    cantIncorrectas++

    // Guardo los botones con las respuestas incorrectas
    const btn_red = document.querySelectorAll('.red')

    // Se deshabilitan los botones junto a sus clases y se pintan de color rojo
    for(let r = 0; r < btn_red.length; r++){
        btn_red[r].style.backgroundColor = "#ef4444";    
        btn_red[r].classList.remove('hover:-translate-y-1')
        btn_red[r].classList.remove('hover:bg-gray-400')
        btn_red[r].disabled = 'true'
    }

    // Guarda el boton con al respuesta correcta 
    const btn_green = document.getElementById('green')

    // Se pinta de color verde y deshabilita el boton y sus clases
    btn_green.style.backgroundColor = '#84cc16'
    btn_green.classList.remove('hover:-translate-y-1')
    btn_green.classList.remove('hover:bg-gray-400')
    btn_green.disabled = 'true'

    // Si responde incorrectamente, se imprime un mensaje indicando que, la respuesta es incorrecta y no gana puntos
    document.querySelector('.puntos').innerHTML = `<h1 class='bg-white p-5 w-fit ml-auto mr-auto border-4'> <span class='text-red-700'> Incorrecto</span>, no ganas puntos </h1>`

    // Avanza a la siguiente pregunta
    avanzar()
}

// Funcion que pasa a la siguiente pregunta
const avanzar = () => {

    // Sumamos el tiempo tardado en cada respuesta
    if(temporizador == 10 || temporizador == 0){
        tiempo_promedio += 0
    } else {
        tiempo_promedio += (tiempo_inicio - temporizador)
    }

    // Incrementa a uno la variable que permite pasar a otra pregunta
    index++

    // Obtenemos el tiempo total, sumando en cada pregunta, el resultado de la diferencia entre los 10 segundos iniciales y el tiempo sobrante en el temporizador
    tiempo_total += temporizador != 10 ? tiempo_inicio - temporizador : 0

    // Si la variable es menor que 10, pasa a la otra pregunta, si no, mostramos los resultados de la partida
    if(index < 10){
        setTimeout(() => {
            mostrarPregunta()
        }, 2000);
    } else {
        
        // Se obtienen los minutos y segundos
        minutos = tiempo_total >= 60 ? Math.floor((tiempo_total / 60)) : 0
        segundos = tiempo_total
        while(segundos >= 60){
            segundos -= 60
        }

        // Creamos el mensaje del tiempo total que se verá en la pantalla de resultados
        if(tiempo_total < 60){
            duracion_msj = `<h1 class='text-left mt-10'> Tiempo total de la partida: ${segundos} segundos  </h1>`
        } else if (tiempo_total == 60){
            duracion_msj = `<h1 class='text-left mt-10'> Tiempo total de la partida: 1 minuto  </h1>`
        } else {
            duracion_msj = `<h1 class='text-left mt-10'> Tiempo total de la partida: ${minutos} minuto y ${segundos} segundo/s  </h1>`
        }

        // Calcula el tiempo promedio tardado en responder cada pregunta. 
        tiempo_promedio = Math.round(tiempo_promedio / 10)
        setTimeout(() => {
            mostrar_resultados()
        }, 2000);
    }
}

// Funcion que carga una pantalla de resultados mostrando la informacion requerida
const mostrar_resultados =  () => {

    // Conversion del tiempo total con la siguiente estructura -> "0:00"
    let tiempo_formato
    if(tiempo_total < 10) tiempo_formato = `0:0${segundos}`
    if(tiempo_total >= 10 && tiempo_total < 60) tiempo_formato = `0:${segundos}`
    if(tiempo_total === 60) tiempo_formato = `${minutos}:00`
    if(tiempo_total > 60) tiempo_formato = `${minutos}:${segundos}`

    /*
        Si el usuario cumple con las condiciones para entrar al ranking, se clasifica, se guarda informacion de la partida
        y se crea el mensaje notificando al usuario que ha clasificado
    */
    if(puntaje_total >= 15 && cantCorrectas >= 5 && tiempo_total <= 60){
        clasificado = true
        result_final = {nick: nick_name, ptaje: puntaje_total, resp: cantCorrectas, tiempo_record: tiempo_formato}
        clasificado_msj = `<h1 class='text-center mt-10'> ¡Felicidades! Entraste al ranking </h1>`
    } 

    // Mostrando pantalla de resultados
    document.body.innerHTML = `
        <div class='w-fit ml-auto mr-auto mt-15 border-4 bg-white p-20'>
            <h1 class='text-center'> Resultados de la partida </h1>
            ${duracion_msj}
            <h1 class='text-left mt-10'> Tiempo promedio por pregunta: ${tiempo_promedio} segundo/s </h1>
            <h1 class='text-left mt-10'> Respuestas correctas: ${cantCorrectas} de 10 </h1>
            <h1 class='text-left mt-10'> Respuestas incorrectas: ${cantIncorrectas} de 10 </h1>
            <h1 class='text-left mt-10'> Sin respuestas: ${sinRespuestas} de 10 </h1>
            <h1 class='text-left mt-10'> Puntaje final: ${puntaje_total} </h1>
            ${clasificado_msj}
        </div>

        <div class='buttons w-fit ml-auto mr-auto mt-10'>
            <a href='/juego'>
                <button class='bg-white border-4 text-4xl p-2.5 font-mono hover:bg-lime-200 rounded-4xl'> Volver a Jugar </button>
            </a>
            <a href='/'>
                <button class='bg-white border-4 ml-5 text-4xl p-2.5 font-mono hover:bg-blue-300 rounded-4xl'> Volver a Inicio </button>
            </a>
            <a href='/ranking'>
                <button class='bg-white border-4 ml-5 text-4xl p-2.5 font-mono hover:bg-pink-300 rounded-4xl'> Ver ranking </button>
            </a>
        </div>
    `

    // Hago fetch a la siguiente ruta como POST enviando el resultado de la partida del usuario, solo si ha clasificado
    if(clasificado){        
        fetch('/juego', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(result_final)
        })
    }
}