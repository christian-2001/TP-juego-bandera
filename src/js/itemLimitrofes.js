export const itemLimitrofes = (limitrofes) => {
    // Declaracion de variables
    let select_pais = ''
    let borders_cant;
    let [borders_elem, index, arr_index1] = [0, 0, Math.floor(Math.random() * 4)]
    let [resp, arr_index2] = [0, 0]

    // Array que guarda las respuestas/opciones
    const arr_respuestas = []

    // Array que guarda respuestas incorrectas
    const resp_incorrectas = []

    // Almacena en una variable, el pais junto con la cantidad de paises que lo limitan
    while(select_pais == '' || select_pais == undefined){
        index = Math.floor(Math.random() * (limitrofes.length))
        select_pais = limitrofes[index].translations.spa.common
        if((limitrofes[index].borders.every((element) => false))){
            borders_cant = 0
        } else {
            borders_cant = limitrofes[index].borders.length
        }
    }

    // Llena un array con 3 respuestas incorrectas
    for(let i = 0; i < 3; i++){
        borders_elem = Math.floor(Math.random() * (limitrofes.length))
        resp = limitrofes[borders_elem].borders.length
        if(resp == borders_cant){
            while(resp == borders_cant){
                borders_elem = Math.floor(Math.random() * (limitrofes.length))
                resp = limitrofes[borders_elem].borders.length
            }
            resp_incorrectas.push(resp)
        } else {
            resp_incorrectas.push(resp)
        }
    }

    // Creamos un nuevo array eliminando respuestas repetidas del array anterior en caso de tenerlos
    const arraySinRepe = [...new Set(resp_incorrectas)] 

    // En caso que falten elementos, se llena el array sin repeticiones
    while(arraySinRepe.length < 3){
        borders_elem = Math.floor(Math.random() * (limitrofes.length))
        resp = limitrofes[borders_elem].borders.length
        if(resp == borders_cant){
            while(resp == borders_cant){
                borders_elem = Math.floor(Math.random() * (limitrofes.length))
                resp = limitrofes[borders_elem].borders.length
            }
            if(!arraySinRepe.includes(resp)) arraySinRepe.push(resp)
        } else {
            if(!arraySinRepe.includes(resp)) arraySinRepe.push(resp)
        }
    }

    // Llena otro array con la respuesta correcta y las demas incorrectas
    for(let e = 0; e < 4; e++){
        if(e == arr_index1){
            arr_respuestas.push({correcta: borders_cant})
        } else {
            arr_respuestas.push(arraySinRepe[arr_index2])
            arr_index2++
        }
    }

    // Devuelve el pais aleatorio y el array con las respuestas
    return {
        pregunta: `¿Cuantos países limítrofes tiene el siguiente <span class='text-green-600'>país</span>?`,
        pais: select_pais, 
        respuestas: arr_respuestas}
}