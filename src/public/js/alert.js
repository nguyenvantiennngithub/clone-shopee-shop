var btnAdd = document.getElementById("add-cart")
var alertElement = document.querySelector('.alert')
var btnClose = document.querySelector(".close-btn")



function notification(){
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

if (btnSubmitElement){
    btnSubmitElement.onclick = function(e){
        e.preventDefault()
    }
}


// }
// loadDoc()

// //ham doc data
// function loadDoc() {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             console.log(this.responseText);
//         }
//     };
//     xhttp.open("GET", "http://localhost:8080/api/cart", true);
//     xhttp.send();
// }

//doc du lieu ajax
console.log("Hihiih")
function numberWithDots(x) {
    if (x){
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return parts.join(".");
    }
}
// $(document).ready(function(){
    var listElement = document.querySelector("#cart-list")
    var quantityElement = document.querySelector("#cart-quantity")
    function fetch_data(){
        $.ajax({
            url: "http://localhost:8080/api/cart", 
            method: "GET",
            success: function(data){
                // $('#demo1').html(data)
                console.log(data)
                quantityElement.innerHTML = data.length;
                listElement.innerHTML = data.map(function(cart){
                    cart.price = numberWithDots(cart.price)
                    return  `
                        <li class="header__cart-item">
                            <a href="${cart.slug}/detail" class="header__cart-link">
                            <div class="header__cart-item-container-img">
                                <img src="${cart.img}" class="header__cart-item-img">
                            </div>
                            <div class="header__cart-item-container-text">
                                <div class="header__cart-item-header">
                                    <span class="header__cart-item-info">${cart.name} - ${cart.color}</span>
                                    <div class="header__cart-item-container-price">
                                        <span class="header__cart-item-price">${cart.price}</span>
                                        <span class="header__cart-item-multiple">x</span>
                                        <span class="header__cart-item-quantity">${cart.quantity}</span>
                                        </div>
                                    </div>

                                    <div class="header__cart-item-body">
                                        <span class="header__cart-item-description">Loại: ${cart.category}</span>
                                        <a href="/cart/${cart.slug}/${cart.color}/delete"class="header__cart-item-remove">Xóa</a>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            `
                })
            }
        })
    }
// })
//doc du lieu moi khi f5 hoac mo trang
fetch_data();
//ajax them san pham ko reload trang
$('#add-cart').on('click', function(){
    var slug = $("#slug").val()
    var name = $("#name").val()
    var price = $("#price").val()
    var img = $("#img").val()
    var category = $("#category").val()
    var color = $("#input-color").val()
    var idProduct = $("#idProduct").val()
    var quantity = $("#quantity").val()
    if (color){
        $.ajax({
            url: `/cart/${idProduct}/add-cart`,
            method: "POST",
            data: {isPaid: false, slug, name, price, img, category, color, idProduct, quantity},
            success: function(data){
                swal("Thêm sản phẩm thành công", 'Còn 1 dòng ở đây nhưng chưa biết gi gì', "success");
                fetch_data();
            }
        })
    }else{
        messageError.innerHTML = 'Vui lòng chọn đúng và đủ thông tin'
    }
})


//reset bien moi khi chay lai tranh truong hop sai khi f5
// inputColorElement.value = ''
// btnSubmitElement.onclick = function(e){
//     e.preventDefault();
//     if(inputColorElement.value && quantityElement.value >= 1){
//         formAddCart.submit()
//         setTimeout(function(){
//             swal("Good job!", "You clicked the button!", "success");
//         }, 500)
//     }else{
//         messageError.innerHTML = 'Vui lòng chọn đúng và đủ thông tin'
//     }
// } 