
let words = document.getElementById('words');
let word = document.getElementById('word');
let bth = document.getElementById('bth');
let clear = document.getElementById('clear');
let count = 0


function safeload(){
    for(let i=1;i<=localStorage.length;i++){
        let newwords=document.createElement("li");
        newwords.textContent=localStorage.getItem("name");
        word.appendChild(newwords);
        count++
        
    }
}

function get_to_do_list(){
    let new_word=words.value;
    let newwords=document.createElement("li");
    newwords.textContent=new_word;
    localStorage.setItem("name",words.value)
    word.appendChild(newwords);
    count ++   
    localStorage.setItem(`${count}`,`${new_word}`) 
}


function delete_list(){
    word.innerHTML="";
    localStorage.clear
}


clear.addEventListener('click',delete_list);
bth.addEventListener('click',get_to_do_list);
window.onload = safeload();

localStorage.setItem('test', chelik1);