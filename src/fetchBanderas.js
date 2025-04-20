export const fetchBanderas = async (req, res, result = [], select_bandera = '', país_bandera = {}) => {
    try {
        const URL = 'https://restcountries.com/v3.1/all?fields=flags,translations'
        const response = await fetch(URL)
        const data = await response.json()

        let [arr_index, bandera_elem, num_index] = [0, 0, Math.floor(Math.random() * 4)]
        const arr_random = []

        for(let elem in data){
            if(!data[elem].flags.png == ''){
                result.push({
                    bandera: data[elem].flags.png,
                    pais: data[elem].translations.spa.common
                })
            }
        }

        arr_index = Math.floor(Math.random() * (result.length + 1))
        select_bandera = result[arr_index].bandera
        país_bandera['correcta'] = result[arr_index].pais 

        for(let e = 0; e < 4; e++){
            bandera_elem = Math.floor(Math.random() * (result.length + 1))
            arr_random.push( e == num_index ? país_bandera : {incorrecta: result[bandera_elem].pais} )
        }

        console.log(select_bandera)
        console.log(arr_random)

        res.render('juego', {select_bandera, arr_random})

    } catch (error) {
        console.log('ERROR' + error)
    }

}