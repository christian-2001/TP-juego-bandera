function resp_correcta(){

    const btn_green = document.getElementById('green')
    btn_green.style.backgroundColor = '#84cc16'
    btn_green.classList.remove('hover:text-white')
    btn_green.classList.remove('hover:-translate-y-1')
    btn_green.classList.remove('hover:bg-black')
    
    const red = document.querySelectorAll('.red')
    for(let r = 0; r < red.length; r++){
        red[r].classList.remove('hover:text-white')
        red[r].classList.remove('hover:-translate-y-1')
        red[r].classList.remove('hover:bg-black')
    }

}

function resp_incorrectas(){

    const red = document.querySelectorAll('.red')
    for(let r = 0; r < red.length; r++){
        red[r].style.backgroundColor = "#ef4444";
        red[r].classList.remove('hover:text-white')
        red[r].classList.remove('hover:-translate-y-1')
        red[r].classList.remove('hover:bg-black')
    }

    const btn_green = document.getElementById('green')
    btn_green.style.backgroundColor = '#84cc16'
    btn_green.classList.remove('hover:text-white')
    btn_green.classList.remove('hover:-translate-y-1')
    btn_green.classList.remove('hover:bg-black')

}

