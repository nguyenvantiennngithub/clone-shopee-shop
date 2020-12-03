var btnAdd = document.getElementById("add-cart")
var alertElement = document.querySelector('.alert')
var btnClose = document.querySelector(".close-btn")



function notification(){
    console.log("hihi")
    var alertElement = document.querySelector("#alert")
    
    alertElement.classList.add("show")
    alertElement.classList.remove("hide")
    setTimeout(function(){
        alertElement.classList.add("hide")
        alertElement.classList.remove("show")
    }, 900)
    btnClose.onclick = function(){
        alertElement.classList.remove("show")
        alertElement.classList.add("hide")
    }
   
}

var btnColorElements = document.querySelectorAll("button[name='btn-color']") // nut chon mau
var inputColorElement = document.querySelector("#input-color") //the input tam de luu gia tri cua mau khi click vao nut chon mau
var formAddCart = document.querySelector("#form-add-cart") //form submit de them vao gio ahng
var btnSubmitElement = document.querySelector("#add-cart") // cai nut de submit cai form them vao gio hang
var messageError = document.querySelector("#message-error") // the hien thi loi
var quantityElement = document.querySelector("#quantity") //the so luong
btnColorElements.forEach(function(btn){
    btn.onclick = function(e){
        e.preventDefault()

        inputColorElement.value = btn.value
        btnColorElements.forEach(function(btn2){
            btn2.classList.remove('active')
            
        })
        btn.classList.add('active')

        messageError.innerHTML = ''
    }
})

//reset bien moi khi chay lai tranh truong hop sai khi f5
inputColorElement.value = ''
btnSubmitElement.onclick = function(e){
    e.preventDefault();
    if(inputColorElement.value && quantityElement.value >= 1){
        notification()
        setTimeout(function(){
            formAddCart.submit()
        }, 1800)
    }else{
        messageError.innerHTML = 'Vui lòng chọn đúng và đủ thông tin'
    }
} 