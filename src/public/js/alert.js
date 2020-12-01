var btnAdd = document.getElementById("add-cart")
var alertElement = document.querySelector('.alert')

btnAdd.onclick = function(e){
    alertElement.classList.add('pushIn')
    setTimeout(function(){ 
        alertElement.classList.remove('pushIn')
        alertElement.classList.add('pushOut')
        setTimeout(function(){
            alertElement.classList.remove('pushOut')
        }, 1000)
    }, 3000);
}