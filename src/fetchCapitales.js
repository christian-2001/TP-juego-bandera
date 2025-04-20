export const fetchCapitales = async (req, res, result = [], select_capital = '', país_capital = {}) => {
    try{
        const URL = 'https://restcountries.com/v3.1/all?fields=capital,translations'
        const response = await fetch(URL)
        const data = await response.json()

        let [arr_index, pais_elem, num_index] = [0, 0, Math.floor(Math.random() * 4)]
        const arr_random = []

        for(let elem in data){
            if(!data[elem].capital[0] == ''){
                result.push({
                    capital: data[elem].capital[0], 
                    pais: data[elem].translations.spa.common
                })
            } 
        }


        arr_index = Math.floor(Math.random() * (result.length + 1))
        select_capital = result[arr_index].capital
        país_capital['correcta'] = result[arr_index].pais
        
        for(let e = 0; e < 4; e++){  
            pais_elem = Math.floor(Math.random() * (result.length + 1))
            arr_random.push( e == num_index ? país_capital : {incorrecta: result[pais_elem].pais} )
        }
        console.log(select_capital, arr_random)

        res.render('juego', {select_capital, arr_random})
    
    } catch(error){
        console.log('ERROR' + error)
    }
}