//Expresiones regulares para validacion de campos del formulario
// const validaciones = {
 //     nick: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[A-Za-z\d_-]{8,20}$/,
 //     password: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/
 // }

//Declaracion de variables

const nick_item = document.getElementById('nick')
const password_item = document.getElementById('password')
const msj_registro = document.getElementById('registro')
const msj = document.createElement('p')
const estilos = ['outline-4', 'outline-solid', 'outline-blue-500']
const error_style = ['mt-5', 'font-bold', 'text-red-500', 'text-[18px]', 'font-[Arial,_Helvetica,_sans-serif]', 'p-6', 'w-fit', 'ml-auto', 'mr-auto', 'bg-red-200']

error_style.forEach(style => msj.classList.add(style))
msj.innerHTML = `Error al inciar sesión. Asegurate de que <br> el nick y contraseña sean correctos`

//Eventos 'focus' y 'blur' agregados a los campos
 //Se apllican estilos al hacer enfoque en cualquier campo ('focus')
 //Se quitan estilos al desenfocar cualquier campo ('blur')
 document.querySelectorAll('#loginForm input').forEach(input => {
    input.addEventListener('focus', () => {
        estilos.forEach(css => input.classList.add(css))
    })
    input.addEventListener('blur', () => {
        estilos.forEach(del => input.classList.remove(del))
    })
    
})

document.getElementById('loginForm').addEventListener('submit', async(e) => {
    e.preventDefault()
    const nick = e.target.children.nick.value
    const password = e.target.children.password.value

    const res = await fetch('https://tp-juego-bandera.vercel.app/api/login', {
        method:'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            nick, password
        })
    })

    if(!res.ok){
        return msj_registro.insertAdjacentElement('afterend', msj);
    }

    const resJson = await res.json()
    if(resJson.redirect)window.location.href = resJson.redirect
    
})