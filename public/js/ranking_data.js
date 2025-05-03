//Variables
let select_value = document.getElementById('select_rank')
let table_data = document.getElementById('rank_content')
let ranking = ranking_data
table_data.innerHTML = ''

//Al cargar la pagina, se ordena la tabla por puntaje (mayor a menor puntaje) por predeterminado
document.addEventListener('DOMContentLoaded', () => {
    
    if(select_value.value == 'puntaje'){

        //Ordenamos por puntaje (mayor a menor puntaje)
        ranking.sort((a, b) => b.ptaje - a.ptaje)

        //Se obtienen las mejores 20 partidas
        let top20 = ranking.slice(0, 20)

        //Mostramos la tabla ordenada con las mejores 20 partidas
        table_data.innerHTML = `
            <table class='border-2'>
                <thead>
                    <tr class="p-10 bg-gray-400">
                        <th class="border-4 text-center p-5 text-4xl"> Posicion </th>
                        <th class="border-4 text-center p-5 text-4xl"> Jugador </th>
                        <th class="border-4 text-center p-5 text-4xl"> Puntaje </th>
                        <th class="border-4 text-center p-5 text-4xl"> Resp. Correctas </th>
                        <th class="border-4 text-center p-5 text-4xl"> Tiempo </th></tr>
                    </tr>
                </thead>
    
                <tbody id='table_body' class="text-center text-[35px] font-mono bg-purple-300">
                ${top20.map((rank, index) => `
                     <tr>
                        <td class='border-4 p-3'> ${index + 1} </td>
                        <td class='border-4 p-3'> ${rank.nick} </td>
                        <td class='border-4 p-3'> ${rank.ptaje} </td>
                        <td class='border-4 p-3 w-60'> ${rank.resp} </td>
                        <td class='border-4 p-3'> ${rank.tiempo_record} </td>
                     </tr>
                    `).join('')}
                </tbody>
            </table>
        `  
    }

})

//Se ordena la tabla en funcion del filtro aplicado
select_value.addEventListener('change', () => {

    //Ordenamos por cantidad de respuestas correctas (mayor a menor cantidad)
    if(select_value.value == 'respuestas'){
        ranking.sort((a, b) => b.resp - a.resp)

        //Se obtiene las mejores 20 partidas
        let top20 = ranking.slice(0, 20)

        //Mostramos la tabla ordenada con las mejores 20 partidas
        document.getElementById('table_body').innerHTML = `
            ${top20.map((rank, index) => `
                <tr>
                    <td class='border-4 p-3'> ${index + 1} </td>
                    <td class='border-4 p-3'> ${rank.nick} </td>
                    <td class='border-4 p-3'> ${rank.ptaje} </td>
                    <td class='border-4 p-3 w-60'> ${rank.resp} </td>
                    <td class='border-4 p-3'> ${rank.tiempo_record} </td>
                </tr>
            `).join('')}
        `
    //Ordenamos por puntaje (mayor a menor puntaje)
    } else if (select_value.value == 'puntaje'){
        ranking.sort((a, b) => b.ptaje - a.ptaje)

        //Se obtienen las mejores 20 partidas
        let top20 = ranking.slice(0, 20)

        //Mostramos la tabla ordenada con las mejores 20 partidas
        document.getElementById('table_body').innerHTML = `
            ${ranking.map((rank, index) => `
                <tr>
                    <td class='border-4 p-3'> ${index + 1} </td>
                    <td class='border-4 p-3'> ${rank.nick} </td>
                    <td class='border-4 p-3'> ${rank.ptaje} </td>
                    <td class='border-4 p-3 w-60'> ${rank.resp} </td>
                    <td class='border-4 p-3'> ${rank.tiempo_record} </td>
                </tr>
            `).join('')}
        `
    //Ordenar por tiempo total (menor a mayor tiempo)
    } else if (select_value.value == 'tiempo'){

        //Para ordenar la tabla, primero se formatea el tiempo total en segundos para determinar su orden
        let ordenar_tiempo = ranking_data

        const formatear_tiempo = (tiempo) => {
            const partes = tiempo.split(':').map(Number)
            return partes[0] * 60 + partes[1]
        }

        //Ordenamos la tabla
        ordenar_tiempo.sort((a,b) => formatear_tiempo(a['tiempo_record']) - formatear_tiempo(b['tiempo_record']))

        //Se obtienen las mejores 20 partidas
        let top20 = ordenar_tiempo.slice(0, 20)

        //Mostramos la tabla ordenada con las mejores 20 partidas
        document.getElementById('table_body').innerHTML = `
            ${top20.map((rank, index) => `
                <tr>
                    <td class='border-4 p-3'> ${index + 1} </td>
                    <td class='border-4 p-3'> ${rank.nick} </td>
                    <td class='border-4 p-3'> ${rank.ptaje} </td>
                    <td class='border-4 p-3 w-60'> ${rank.resp} </td>
                    <td class='border-4 p-3'> ${rank.tiempo_record} </td>
                </tr>
            `).join('')}
        `
    }
})