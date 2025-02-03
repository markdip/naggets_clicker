let nagg=document.getElementById("nagg")
let score=document.getElementById("score")
let double=document.getElementById("double")
let chet=Number(localStorage.getItem("chet"))
let clear=document.getElementById("clear")

function get_plus(){
    new_chet = chet++;
    console.log("+1")
    score.textContent=`Счёт:${new_chet}`
    localStorage.setItem("chet", new_chet)
    if(chet>=20){
        double.addEventListener("click",get_double)
    }
}

function get_double(){
    new_chet = chet+=2;
    console.log("+2")
    score.textContent=`Счёт:${chet}`
    localStorage.setItem("chet", new_chet)
}

nagg.addEventListener("click",get_plus)
double.addEventListener("click",get_double)
localStorage.getItem("chet")
window.onload=function(){
    score.textContent=`Счёт:${chet}`
    if(new_chet>=20){
        double.addEventListener("click",get_double)
    }
}


clear.addEventListener("click", function(){
    localStorage.clear()
    location.reload()
})







