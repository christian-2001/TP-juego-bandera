export const itemCapital = (capitales) => {
    //Declaracion de variables
    let select_capital = ''
    let país_capital = ''
    let [index, pais_elem, arr_index] = [0, 0, Math.floor(Math.random() * 4)]

    //Array que guarda las respuestas/opciones
    const arr_respuestas = []


    //Almacena en una variable, la capital aleatoria elegida
    while(select_capital == '' || select_capital == undefined){
        index = Math.floor(Math.random() * (capitales.length))
        select_capital = capitales[index].capital[0]
        país_capital = capitales[index].translations.spa.common
    }

    //Llena el array con la respuesta correcta y las demas incorrectas
    for(let e = 0; e < 4; e++){  
        pais_elem = Math.floor(Math.random() * (capitales.length))
        arr_respuestas.push( e == arr_index ? {correcta: país_capital} : {incorrecta: capitales[pais_elem].translations.spa.common} )
    }

    //Devuelve la capital y el array con las opciones
    return {
        pregunta: `¿Cual es el país de la siguiente <span class='text-blue-500'>ciudad capital</span>?`, 
        capital: select_capital, 
        respuestas: arr_respuestas}
}