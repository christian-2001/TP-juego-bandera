//Cuando se elije la respuesta correcta, se ejecuta la siguiente funcion
const resp_correcta = () =>{

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

}

//Cuando se elije una de las respuestas incorrectas, se ejecuta la siguiente funcion
const resp_incorrectas = () =>{

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

}