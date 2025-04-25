//Expresiones regulares para validacion de campos del formulario
const validaciones = {
    mail: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
    password: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/
}

//Declaracion de variables
const mail_item = document.getElementById('mail')
const password_item = document.getElementById('password')
const estilos = ['outline-4', 'outline-solid', 'outline-blue-500']

//Al enfocar en el campo del mail, se agregan estilos
mail_item.addEventListener('focus', () => {
    estilos.forEach(css => mail_item.classList.add(css))
})

//Al perder el foco, se quitan los estilos
mail_item.addEventListener('blur', () => {
    estilos.forEach(del => mail_item.classList.remove(del))
})

//Al enfocar en el campo de contraseña, se agregan estilos
password_item.addEventListener('focus', () => {
    estilos.forEach(css =>  password_item.classList.add(css))
})

//Al perder el foco, se quitan los estilos
password_item.addEventListener('blur', () => {
    estilos.forEach(del => password_item.classList.remove(del))
})