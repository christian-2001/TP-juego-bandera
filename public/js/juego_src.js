let temporizador = 10
let conteo
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



    conteo = setInterval(() => {
        temporizador--
        document.getElementById('temporizador').innerHTML = `0:0${temporizador}`
        if(temporizador == 0) {
            document.querySelector('.puntos').innerHTML = `<h1> Tiempo fuera!!! </h1>`
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

const avanzar = () => {
    index++

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
        <div class='w-fit ml-auto mr-auto mt-60 border-4 bg-white p-20'>
            <h1 class='text-center'> Resultados de la partida </h1>
            <h1 class='text-left mt-10'> Puntaje final: 0 </h1>
            <h1 class='text-left mt-5'> Tiempo promedio en cada respuesta: 0 segundos </h1>
        </div>
    `
}

//Cuando se elije la respuesta correcta, se ejecuta la siguiente funcion
const resp_correcta = () =>{

    clearInterval(conteo)

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

    avanzar()
}

//Cuando se elije una de las respuestas incorrectas, se ejecuta la siguiente funcion
const resp_incorrectas = () =>{
    
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

    avanzar()
}