export const itemCapital = (capitales) => {
    //Declaracion de variables
    let select_capital = ''
    let país_capital = ''
    let [index, pais_elem, arr_index, arr_index2] = [0, 0, Math.floor(Math.random() * 4), 0]
    let resp = ''

    //Array que guarda las respuestas/opciones
    const arr_respuestas = []

    //Array que guarda respuestas incorrectas
    const resp_incorrectas = []

    //Almacena en una variable, la capital aleatoria elegida y su pais siendo la respuesta correcta
    while(select_capital == '' || select_capital == undefined){
        index = Math.floor(Math.random() * (capitales.length))
        select_capital = capitales[index].capital[0]
        país_capital = capitales[index].translations.spa.common
    }

    //Llenamos un array con 3 respuestas incorrectas
    for(let i = 0; i < 3; i++){
        pais_elem = Math.floor(Math.random() * (capitales.length))
        resp = capitales[pais_elem].translations.spa.common
        if(resp == país_capital){
            while(resp == país_capital){
                pais_elem = Math.floor(Math.random() * (capitales.length))
                resp = capitales[pais_elem].translations.spa.common        
            }
        }
        resp_incorrectas.push(resp)
    }

    //Creamos un nuevo array eliminando respuestas repetidas del array anterior en caso de tenerlos
    const arraySinRepe = [...new Set(resp_incorrectas)]

    //En caso que falten elementos, se llena el nuevo array sin repeticiones
    while(arraySinRepe.length < 3){
        pais_elem = Math.floor(Math.random() * (capitales.length))
        resp = capitales[pais_elem].translations.spa.common
        if(!arraySinRepe.includes(resp)) arraySinRepe.push(resp)
    }


    //Llena otro array con la respuesta correcta y las demas incorrectas
    for(let elem = 0; elem < 4; elem++){
       if(elem == arr_index){
            arr_respuestas.push({correcta: país_capital})
       } else {
            arr_respuestas.push({incorrecta: arraySinRepe[arr_index2]})
            arr_index2++
        }
    }

    //Devuelve la capital y el array con las respuestas
    return {
        pregunta: `¿Cual es el país de la siguiente <span class='text-blue-500'>ciudad capital</span>?`, 
        capital: select_capital, 
        respuestas: arr_respuestas}
}