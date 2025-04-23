//Expresiones regulares para validacion de campos del formulario
const validaciones = {
    mail: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
    password: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/
}

//Declaracion de variables
const mail_item = document.getElementById('mail')
const password_item = document.getElementById('password')

//Al enfocar en el campo del mail, se elimina el borde
mail_item.addEventListener('focus', () => {
    mail_item.style.outline = 'none'
})

//Al enfocar en el campo de contraseña, se elimina el borde
password_item.addEventListener('focus', () => {
    password_item.style.outline = 'none'
})