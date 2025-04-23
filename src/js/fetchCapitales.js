//Llama a la api con un endpoint que devuelve las capitales junto con su respectivo país (traducido al español)
export const fetchCapitales = async () => {

        const URL = 'https://restcountries.com/v3.1/all?fields=capital,translations'
        const response = await fetch(URL)
        const data = await response.json()

        return data
}
