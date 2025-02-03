let count = 0;
let timer
let counter=document.getElementById("count")
let startbtn=document.getElementById("start")
let stopbtn=document.getElementById("stop")

function time(){
    timer=setInterval(() => {
    count++;
    console.log(`Прошло ${count} секунд`); 
    counter.textContent=`Прошло ${count} секунд`
    }, 1000);
}

function stop(){
    clearInterval(timer)
    console.log('Остановлено');
}

startbtn.addEventListener('click',time);
stopbtn.addEventListener('click',stop);



// let timeout=setTimeout(() => {
//     console.log('Не увидишь меня');
// }, 5000);

// clearTimeout(timeout);




// let seconds=10;
// let countdown=setInterval(() => {
//     console.log(seconds);
//     seconds--;

//     if(seconds<0){
//         clearInterval(countdown);
//         console.log('Время вышло');
//     }
// }, 1000);




























































































































































































































































