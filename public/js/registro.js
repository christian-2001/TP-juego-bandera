//Variables
const confirm_input = document.getElementById('confirm')
const msj = document.createElement('p')
 const estilos = ['outline-4', 'outline-solid', 'outline-blue-500']
 const error_style = ['mt-5', 'font-bold', 'text-red-500', 'text-[18px]', 'font-[Arial,_Helvetica,_sans-serif]', 'p-3', 'w-fit', 'ml-auto', 'mr-auto', 'bg-red-200']

error_style.forEach(style => msj.classList.add(style))
 msj.innerHTML = `Ocurrió un error al registrarse`

//Eventos 'focus' y 'blur' agregados a los campos
 //Se apllican estilos al hacer enfoque en cualquier campo ('focus')
 //Se quitan estilos al desenfocar cualquier campo ('blur')
document.querySelectorAll('#registroForm input').forEach(input => {
    input.addEventListener('focus', () => {
      estilos.forEach(css => input.classList.add(css));
    });
    input.addEventListener('blur', () => {
      estilos.forEach(del => input.classList.remove(del))
    })

})

document.getElementById('registroForm').addEventListener('submit', async (e) => {
  e.preventDefault()

  const res = await fetch('https://tp-juego-bandera.vercel.app/api/registro', {
    method:'POST',
    headers:{
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({
      nick: e.target.children.nick.value,
      password: e.target.children.password.value,
      confirm: e.target.children.confirm.value
    })
  })
  if(!res.ok){
    return confirm_input.insertAdjacentElement('afterend', msj)
  } 
  
  const resJson = await res.json()
  if(resJson.redirect) window.location.href = resJson.redirect 
  
})