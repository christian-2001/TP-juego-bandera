export const itemBandera = (banderas) => {
    //Declaracion de variables
    let select_bandera = ''
    let país_bandera = ''
    let [pais_elem, index, arr_index, arr_index2] = [0, 0, Math.floor(Math.random() * 4), 0]
    let resp = ''

    //Array que guarda las respuestas/opciones
    const arr_respuestas = []

    //Array que guarda respuestas incorrectas
    const resp_incorrectas = []

    //Almacena en una variable, la bandera aleatoria elegida y su pais siendo la respuesta correcta
    while(select_bandera == '' || select_bandera == undefined){
        index = Math.floor(Math.random() * (banderas.length))
        select_bandera = banderas[index].flags.png
        país_bandera = banderas[index].translations.spa.common
    }

    //Llenamos un array con 3 respuestas incorrectas
    for(let i = 0; i < 3; i++){
        pais_elem = Math.floor(Math.random() * (banderas.length))
        resp = banderas[pais_elem].translations.spa.common
        if(resp == país_bandera){
            while(resp == país_bandera){
                pais_elem = Math.floor(Math.random() * (banderas.length))
                resp = banderas[pais_elem].translations.spa.common        
            }
        }
        resp_incorrectas.push(resp)
    }

    //Creamos un nuevo array eliminando respuestas repetidas del array anterior en caso de tenerlos
    const arraySinRepe = [...new Set(resp_incorrectas)]

    //En caso que falten elementos, se llena el nuevo array sin repeticiones
    while(arraySinRepe.length < 3){
        pais_elem = Math.floor(Math.random() * (banderas.length))
        resp = banderas[pais_elem].translations.spa.common
        if(!arraySinRepe.includes(resp)) arraySinRepe.push(resp)
    }


    //Llena otro array con la respuesta correcta y las demas incorrectas
    for(let elem = 0; elem < 4; elem++){
        if(elem == arr_index){
            arr_respuestas.push({correcta: país_bandera})
        } else {
            arr_respuestas.push({incorrecta: arraySinRepe[arr_index2]})
            arr_index2++
        }
    }

    //Devuelve la bandera y el array con las respuestas
    return {
        pregunta: 'El país xx esta representado por la siguiente bandera',
        bandera: select_bandera, 
        respuestas: arr_respuestas}
}