export const itemLimitrofes = (limitrofes) => {
    //Declaracion de variables
    let select_pais = ''
    let borders_cant;
    let [borders_elem, index, arr_index] = [0, 0, Math.floor(Math.random() * 4)]

    //Array que guarda las respuestas/opciones
    const arr_respuestas = []

    //Almacena en una variable, el pais junto con la cantidad de paises que lo limitan
    while(select_pais == '' || select_pais == undefined){
        index = Math.floor(Math.random() * (limitrofes.length + 1))
        select_pais = limitrofes[index].translations.spa.common
        if((limitrofes[index].borders.every((element) => false))){
            borders_cant = 0
        } else {
            borders_cant = limitrofes[index].borders.length
        }
    }

    //Llena el array con la respuesta correcta y las demas incorrectas
    for(let e = 0; e < 4; e++){
        borders_elem = Math.floor(Math.random() * (limitrofes.length + 1))
        arr_respuestas.push( e == arr_index ? {correcta: limitrofes[index].borders.length} : {incorrecta: limitrofes[borders_elem].borders.length})
    }

    //Devuelve el pais y el array con las opciones
    return {pais: select_pais, respuestas: arr_respuestas}
}