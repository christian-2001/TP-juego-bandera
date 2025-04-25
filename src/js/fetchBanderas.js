//Llama a la api con un endpoint que devuelve las banderas junto con su respectivo país (traducido al español)
export const fetchBanderas = async () => {
       
        const URL = 'https://restcountries.com/v3.1/all?fields=flags,translations'
        const response = await fetch(URL)
        const data = await response.json()

        return data
}