try {
 
    document.getElementById('logout').addEventListener('click', () => {
        document.cookie = 'jsonwebtoken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        document.location.href = '/'
    })

} catch (error) {
    console.log('ERROR: ' + error)
}