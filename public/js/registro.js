const validaciones = {
    nick: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[A-Za-z\d_-]{8,20}$/,
    mail: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
    password: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
    reglas: {
        nick: ['El nick debe tener: Mayuscula, minuscula, numero, longitud entre 8 y 20 caracteres', 'No se permiten: ".", espacios y caracteres especiales("<", ":", etc)'],
        mail: ['No se permiten: "." al incio y final del correo, espacios, caracteres especiales("<", ":", etc)'],
        password: ['La contraseña debe tener: Mayuscula, minuscula, numero, caracter especial, longitud entre 8 y 16 caracteres']
    }
}

const val_estilos = {
    ul_reglas: ['text-red-500', 'list-none', 'font-bold'],
    campos: ['border-4', 'border-red-400']
}

//Variables
const estilos = ['outline-4', 'outline-solid', 'outline-blue-500']
const nick_input = document.getElementById('nick')
const mail_input = document.getElementById('mail')
const password_input = document.getElementById('password')
const confirm_input = document.getElementById('confirm')
const ul_nick = document.querySelector('.listado1')
const ul_mail = document.querySelector('.listado2')
const ul_password = document.querySelector('.listado3')
const msj = document.querySelector('.msj')
const ul_reglas = document.createElement('ul')

//Eventos 'focus', 'blur' e 'input' agregados a los campos
document.querySelectorAll('#registroForm input').forEach(input => {
    input.addEventListener('focus', () => {
      estilos.forEach(css => input.classList.add(css));
    });
    input.addEventListener('blur', () => {
      estilos.forEach(del => input.classList.remove(del));
    });
    input.addEventListener('input', validarFormulario)
});

//Segun el evento "input", se ejecutara la funcion para validar uno o varios campos
function validarFormulario(i) {
    switch(i.target.name){
        case 'nick':
            validar_campos(validaciones['nick'], validaciones['reglas']['nick'], ul_nick, ul_reglas, nick_input, msj, confirm_input, i)
        break;

        case 'mail':
            validar_campos(validaciones['mail'], validaciones['reglas']['mail'], ul_mail, ul_reglas, mail_input, msj, confirm_input, i)
        break;

        case 'password':
            validar_campos(validaciones['password'], validaciones['reglas']['password'], ul_password, ul_reglas, password_input, msj, confirm_input, i)
        break;
                    
        case 'confirm':
            confirmar_contraseña(validaciones['password'], ul_password, msj, confirm_input)
        break;
    }
}

//Validar nick, mail y contraseña
function validar_campos (val, val_reglas, listado, ul_reglas, campos, msj, confirm_input, input){
    ul_reglas.textContent = '' 
    val_estilos['ul_reglas'].forEach(style =>  ul_reglas.classList.add(style))
    
    if(!campos.value.length){
        val_estilos['campos'].forEach(style => campos.classList.remove(style))
        campos.classList.remove('border-lime-400')
        listado.innerHTML = ''
    } else if(!val.test(input.target.value)){
        val_estilos['campos'].forEach(style => {campos.classList.add(style)})

        val_reglas.forEach(elem => {
            const li = document.createElement('li')
            li.style.fontSize = '15px'
            li.style.fontFamily = 'Arial'
            li.textContent = elem
            ul_reglas.appendChild(li)
        })

        listado.appendChild(ul_reglas)
    } else {
        campos.classList.remove('border-red-400')
        campos.classList.add('border-lime-400')
        listado.innerHTML = ''
    }
//Cuando ambas contraseñas no son iguales
    if((input.target.value !== confirm_input.value)){ 
        if(confirm_input.value.length > 0){
            msj.innerHTML = ''
            confirm_input.classList.remove('border-lime-400')
            val_estilos['campos'].forEach(style => confirm_input.classList.add(style))
            const p = document.createElement('p')
            p.classList.add('text-red-500')
            p.classList.add('text-bold')
            p.textContent = 'Las contraseñas no son iguales'
            msj.appendChild(p)
        }
    } else if((input.target.value == confirm_input.value) && (!val.test(input.target.value))){
        msj.innerHTML = 'La contraseña debe tener: Mayuscula, minuscula, numero, caracter especial, longitud entre 8 y 16 caracteres'
        confirm_input.classList.add('border-red-500')
    }else if((input.target.value == confirm_input.value) && val.test(input.target.value)){ //Cuando son iguales y cumplen con los requerimientos
        msj.innerHTML = ''
        confirm_input.classList.remove('border-red-400')
        confirm_input.classList.add('border-lime-400')
    } 

    if((!campos.value.length) && (!confirm_input.value.length)){
        campos.classList.remove('border-4')
        confirm_input.classList.remove('border-4')
        listado.innerHTML = ''
        msj.innerHTML = ''
    }
}

//Confirmar contraseña ingresada
function confirmar_contraseña(val, ul_password, msj, confirm_input){
    msj.textContent = ''

    if(!confirm_input.value.length){
        val_estilos['campos'].forEach(style => confirm_input.classList.remove(style))
        confirm_input.classList.remove('border-lime-400')
        msj.innerHTML = ''
    } else if(confirm_input.value !== password_input.value){

        val_estilos['campos'].forEach(style => confirm_input.classList.add(style))
        const p = document.createElement('p')
        p.classList.add('text-red-500')
        p.classList.add('text-bold')
        p.textContent = 'Las contraseñas no son iguales'
        msj.appendChild(p)

    } else {
        confirm_input.classList.remove('border-red-400')
        confirm_input.classList.add('border-lime-400')
        msj.innerHTML = ''
    }

    if((password_input.value == confirm_input.value) && (!val.test(password_input.value))){ //Cuando ambas contraseñas son iguales, pero no cumplen con los requerimientos
        confirm_input.classList.add('border-4')
        confirm_input.classList.remove('border-lime-400')
        confirm_input.classList.add('border-red-400')
        msj.innerHTML = ''
        msj.textContent = 'La contraseña debe tener: Mayuscula, minuscula, numero, caracter especial, longitud entre 8 y 16 caracteres'
    } else if ((password_input.value == confirm_input.value) && val.test(password_input.value)){ // Cuando ambas contraseñas son iguales y cumplen con los requerimientos
        msj.innerHTML = ''
        confirm_input.classList.remove('border-red-400')
        confirm_input.classList.add('border-lime-400')
    }

    if((!password_input.value.length) && (!confirm_input.value.length)){ //Ambos campos relacionados a contraseña vacios o sin caracteres
        password_input.classList.remove('border-4')
        confirm_input.classList.remove('border-4')
        ul_password.innerHTML = ''
        msj.innerHTML = ''
    }
}