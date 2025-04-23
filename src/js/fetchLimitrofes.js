//Llama a la api con un endpoint que devuelve el pais (traducido al español) junto con los paises limitrofes si lo tiene
export const fetchLimitrofes = async () => {
    
        const URL = 'https://restcountries.com/v3.1/all?fields=borders,translations'
        const response = await fetch(URL)
        const data = await response.json()

        return data
}
