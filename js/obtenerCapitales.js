export const fetchCapitales = async (req, res) => {
    try{
        const URL = 'https://restcountries.com/v3.1/all?fields=capital,translations'
        const response = await fetch(URL)
        const data = await response.json()

        const result = []
        let [arr_index, pais_elem, num_index] = [0, 0, Math.floor(Math.random() * 4)]
        let [select_capital, select_pais] = ['', {}]
        const paises_random = []
    
        
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
        select_pais['correcta'] = result[arr_index].pais
        
        for(let e = 0; e < 4; e++){  
            pais_elem = Math.floor(Math.random() * (result.length + 1))
            
            paises_random.push(
                e == num_index ? select_pais : {incorrecta: result[pais_elem].pais}
            )
            
        }

         console.log(select_capital, paises_random)

        res.render('juego', {select_capital, paises_random})
    
    } catch(error){
        console.log(error)
    }
}



// fetch('https://restcountries.com/v3.1/all?fields=capital,translations')
    // .then(response => response.json())
    // .then(data => {
    //     const result = []
    //     let [arr_index, pais_elem, num_index] = [0, 0, Math.floor(Math.random() * 4)]
    //     let [select_capital, select_pais] = ['', {}]
    //     const paises_random = []

    //     for(let elem in data){
    //         if(!data[elem].capital[0] == ''){
    //             result.push({
    //                 capital: data[elem].capital[0], 
    //                 pais: data[elem].translations.spa.common
    //             })
    //         } 
    //     } 

    //     arr_index = Math.floor(Math.random() * (result.length + 1))
    //     select_capital = result[arr_index].capital
    //     select_pais['correcta'] = result[arr_index].pais

    //     for(let e = 0; e < 4; e++){  
    //         pais_elem = Math.floor(Math.random() * (result.length + 1))
    //         // paises_random.push(
    //         //     e == num_index ? select_pais : result[pais_elem].pais
    //         // )
            
    //         paises_random.push(
    //             e == num_index ? select_pais : {incorrecta: result[pais_elem].pais}
    //         )
            
    //     }

    //     console.log(select_capital)
    //     console.log(select_pais)
    //     console.log(paises_random)
    //     res.render('juego', {select_capital, paises_random})
    // })