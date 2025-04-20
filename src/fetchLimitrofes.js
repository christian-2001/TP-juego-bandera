export const fetchLimitrofes = async (req, res, result = [], select_pais = '', borders_cant = {}) => {
    try {
        const URL = 'https://restcountries.com/v3.1/all?fields=borders,translations'
        const response = await fetch(URL)
        const data = await response.json()

        let [arr_index, borders_elem, num_index] = [0, 0, Math.floor(Math.random() * 4)]
        const arr_random = []

        for(let elem in data){
            if(!data[elem].borders.length == 0){
                result.push({
                    pais: data[elem].translations.spa.common,
                    limitrofes: data[elem].borders.length
                })
            }
        }

        arr_index = Math.floor(Math.random() * (result.length + 1))
        select_pais = result[arr_index].pais
        borders_cant['correcta'] = result[arr_index].limitrofes 

        for(let e = 0; e < 4; e++){
            borders_elem = Math.floor(Math.random() * (result.length + 1))
            arr_random.push( e == num_index ? borders_cant : {incorrecta: result[borders_elem].limitrofes} )
        }

        console.log(select_pais)
        console.log(arr_random)

        res.render('juego', {select_pais, arr_random})

    } catch (error) {
        console.log('ERROR' + error)
    }

}