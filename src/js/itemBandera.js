export const itemBandera = (banderas) => {
    //Declaracion de variables
    let select_bandera = ''
    let país_bandera = ''
    let bandera_elem = 0
    let index = 0
    let arr_index = Math.floor(Math.random() * 4)
    
    //Array que guarda las respuestas/opciones
    const arr_respuestas = []

    //Almacena en una variable, la bandera aleatoria elegida
    while(select_bandera == '' || select_bandera == undefined){
        index = Math.floor(Math.random() * (banderas.length))
        select_bandera = banderas[index].flags.png
        país_bandera = banderas[index].translations.spa.common
    }

    //Llena el array con la respuesta correcta y las demas incorrectas
    for(let e = 0; e < 4; e++){
        bandera_elem = Math.floor(Math.random() * (banderas.length))
        arr_respuestas.push( e == arr_index ? {correcta: país_bandera} : {incorrecta: banderas[bandera_elem].translations.spa.common})
    }

    //Devuelve la bandera y el array con las opciones
    return {
        pregunta: 'El país xx esta representado por la siguiente bandera',
        bandera: select_bandera, 
        respuestas: arr_respuestas}
}