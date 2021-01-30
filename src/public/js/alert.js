
var btnColorElements = document.querySelectorAll("button[name='btn-color']") // nut chon mau
var inputColorElement = document.querySelector("#input-color") //the input tam de luu gia tri cua mau khi click vao nut chon mau
var formAddCart = document.querySelector("#form-add-cart") //form submit de them vao gio ahng
var btnSubmitElement = document.querySelector("#add-cart") // cai nut de submit cai form them vao gio hang
var messageError = document.querySelector("#message-error") // the hien thi loi
var quantityElement = document.querySelector("#quantity") //the so luong
var userName = document.querySelector("#user-name") //bien luu ten cua user khi da dang nhap
var cartProducts = document.querySelector("#cart-products") // the de innerHTML khi ajax trang cart
var btnBuyElement = document.querySelector("#cart-buy") // the mua

btnColorElements.forEach(function(btn){ //gan gia tri cua btn cho the input chua value color 
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
    btnSubmitElement.onclick = function(e){ //kiem tra neu chua login thi redirect ve trang login
        if (!userName.value){
            window.location.assign("/auth/login")
        }
        e.preventDefault() //ko cho sumbit
    }
}

function numberWithDots(x) { //them dau cham vao sau 3 so
    if (x){
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return parts.join(".");
    }
}


//su ly o input chi cho nham so duong
function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
        textbox.addEventListener(event, function() {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
      });
    });
  }

// doc du lieu  
async function fetch_data_cart(){
    await $.ajax({
        url: "http://localhost:8080/api/cart",
        method: "GET",
        success: await function(data){
            console.log(data)
            if (cartProducts){
                btnBuyElement.onclick = function(e){
                    swal({
                        title: "Are you sure?",
                        text: "Còn 1 dòng ở đây nhưng biết viết gì ...",
                        icon: "success",
                        buttons: true,
                        dangerMode: true,
                    })
                    .then((willDelete) => {
                        if (willDelete){
                            var formBuy = document.querySelector("#form-buy")
                            formBuy.submit()
                        }
                    });
                    e.preventDefault()
            }

                //cartProducts.innerHTML
                var html = `
                    <div class="col l-12 pb-20">
                        <div class="cart__product-container">
                            <input class="cart__product-pick-input" type="checkbox" name="cart-checkbox-all" checked>
                            <div class="cart__product-header-img">
                                <span class="cart__product-title">Hình ảnh</span>
                            </div>
                            <div class="cart__product-header-info">
                                <span class="cart__product-title">Tên sản phẩm</span>
                            </div>
                            <div class="cart__product-header-price">
                                <span class="cart__product-title">Giá</span>
                            </div>
                            <div class="cart__product-header-quantity">
                                <span class="cart__product-title">Số lượng</span>
                            </div>
                        </div>
                    </div>
                `;

                html += '<form action="/cart/buy" method="POST" id="form-buy">'
                html += data.map(function(product){
                    tempPrice = numberWithDots(product.price)
                    return `
                    
                        <div class="col l-12">
                            <div class="cart__product-container">
                                <input class="cart__product-pick-input" type="checkbox" name="cart-checkbox" value="${product.slug}|${product.color}|${product.quantity}" checked>
                                <div class="cart__product-container-img">
                                    <img src="${product.img}" class="cart__product-img">
                                </div>
                                <div class="cart__product-info">
                                    <div class="cart__product-info-name">
                                        <a href="/${product.slug}/detail" class="header__cart-product-name-link">${product.name}</a h>
                                    </div>
                                    <div class="cart__product-info-deliver">
                                        <span class="cart__product-info-deliver-text" name="cart-color">Màu: ${product.color}</span>
                                    </div>
                                    <div>
                                        <a href="#" name="${product.slug}/${product.color}" class="cart__product-info-delete">Xóa</a>
                                        <a href="#" class="cart__product-info-buy-later">Để dành mua sau</a>
                                    </div>
                                </div>
                                <div class="cart__product-price">
                                    <span class="cart__product-price-text" name="cart-price">${tempPrice}</span>
                                </div>
                                <div class="cart__product-quantity">
                                    <span class="btn-quantity right" name="cart-input-down">-</span>
                                    <input type="text" class="cart__product-quantity-input" name="cart-input" value="${product.quantity}">
                                    <span class="btn-quantity left" name="cart-input-up">+</span>
                                </div>
                            </div>
                        </div>
                    `
                })
                html += '</form>'
                cartProducts.innerHTML = html;
            }


            // sau khi render html Xong
            // nhan su kien onclick vao the xoa thi thuc hien xoa
            var btnDelete = document.querySelectorAll(".cart__product-info-delete") // nut xoa san pham trong /cart
            var cartTitleElement = document.querySelector("#cart__title")
            if (cartTitleElement){
                cartTitleElement.innerHTML = `Giỏ hàng <span class="cart__product-count">(${data.length} sản phẩm)</span>`
            }

            btnDelete.forEach(function(btn){
                btn.onclick = function(){
                    //doc du lieu
                    swal({
                        title: "Are you sure?",
                        text: "Once deleted, you will not be able to recover this imaginary file!",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                    .then((willDelete) => {
                        if (willDelete) {
                        // Xoa du lieu
                            $.ajax({
                                url: `http://localhost:8080/cart/${btn.name}/delete`, 
                                method: "GET", //doc du lieu tu url tren
                                success: function(){ //khi thanh cong thi map cai html voi cai vua doc duoc roi innerHTML vo cai bien ul
                                    cartTitleElement.innerHTML = `Giỏ hàng <span class="cart__product-count">(${data.length} sản phẩm)</span>`
                                    fetch_data_cart();
                                    fetch_data_miniCart()
                                }
                            })
                            swal("Poof! Your imaginary file has been deleted!", {
                                icon: "success",
                            });
                        }
                    });
                }
            })
            
            // Install input filters.
            var inputQuantityElement = document.querySelectorAll("input[name='cart-input']") //the input so luong
            var btnQuantityUp = document.querySelectorAll("span[name='cart-input-up']") //nut tang 
            var btnQuantityDown = document.querySelectorAll("span[name='cart-input-down']") // nut giam
            var totalPriceElement = document.querySelector("#total-price") //the tong tien
            var totalPriceTempElement = document.querySelector("#total-price-temp") //the tam tinh tong tien
            var checkboxElements = document.querySelectorAll("input[name='cart-checkbox']") //the input checkbox
            var checkboxAllElement = document.querySelector("input[name='cart-checkbox-all']") // the input cehckbox all
            function totalPrice(){
                var total = 0;
                for (var i = 0; i < data.length; i++){
                    if (checkboxElements[i].checked){
                        total += (data[i].price*parseInt(inputQuantityElement[i].value))
                    }
                }
                return total;
            }
            function innerTextPrice(){
                var totalPriceText = numberWithDots(totalPrice());
                if (totalPriceText == undefined){
                    totalPriceText = 0;
                }
                totalPriceElement.innerHTML = `${totalPriceText} đ`
                totalPriceTempElement.innerHTML = `${totalPriceText} đ`
            }
            if (totalPriceElement){
                innerTextPrice();
            }
            
            
            //su ly chi cho nhhap so
            inputQuantityElement.forEach(function(input, index){

                setInputFilter(input, function(value) { // test xem value nhap vao co ok ko
                    return /^\d*$/.test(value); 
                });
            })

            //khi ma tang so luong len 1
            btnQuantityUp.forEach(function(btn, index){ //lap va bat sk onlcik cua the +
                if (inputQuantityElement[index].value == 1){ // kiem tra lan dau xem neu gia tri == 1 thi add class disabled vao
                    btn.classList.add("disabled")
                }
                btn.onclick = function(){
                    inputQuantityElement[index].value++; // tang the input len 1
                    if (inputQuantityElement[index].value != 1){ // neu ma the input khac 1 thi xoa cai class disabled
                        btnQuantityDown[index].classList.remove("disabled")
                    }
                    $.ajax({
                        url: `http://localhost:8080/cart/${data[index].slug}/${inputQuantityElement[index].value}/${data[index].color}/edit-cart`, 
                        method: "GET", //doc du lieu tu url tren
                        success: function(){ //khi thanh cong thi map cai html voi cai vua doc duoc roi innerHTML vo cai bien ul
                            fetch_data_cart();
                            fetch_data_miniCart();
                            console.log(data)
                            cartTitleElement.innerHTML = `Giỏ hàng <span class="cart__product-count">(${data.length} sản phẩm)</span>`
                            innerTextPrice();
                        }
                    })
                }
            })

            //khi ma giap so luong xuong 1
            btnQuantityDown.forEach(function(btn, index){ // lap qua the -
                if (inputQuantityElement[index].value == 1){ // kiem tra lan dau xem neu gia tri == 1 thi add class disabled vao
                    btn.classList.add("disabled")
                }
                btn.onclick = function(){
                    if (inputQuantityElement[index].value != 1){ // khi ma giam gia tri xuong thi kiem tra lan nua
                        inputQuantityElement[index].value--;
                        if (inputQuantityElement[index].value == 1){ // kiem tra lan dau xem neu gia tri == 1 thi add class disabled vao
                            btn.classList.add("disabled")
                        }
                    }
                    $.ajax({
                        url: `http://localhost:8080/cart/${data[index].slug}/${inputQuantityElement[index].value}/${data[index].color}/edit-cart`, 
                        method: "GET", //doc du lieu tu url tren
                        success: function(){ //khi thanh cong thi map cai html voi cai vua doc duoc roi innerHTML vo cai bien ul
                            fetch_data_cart();
                            fetch_data_miniCart();
                            console.log(data)
                            cartTitleElement.innerHTML = `Giỏ hàng <span class="cart__product-count">(${data.length} sản phẩm)</span>`
                            innerTextPrice();
                        }
                    })
                }
            })

            // su ly khi click vao checkbox
            checkboxElements.forEach(function(checkbox){
                checkbox.onclick = function(){
                    //su ly khi tat ca cac checkbox deu checked thi phai check cai checkbox all va nguoc lai
                    var checkboxCheckedElements = document.querySelectorAll("input[name='cart-checkbox']:checked")
                    if (checkboxCheckedElements.length == checkboxElements.length){
                        checkboxAllElement.checked = true;
                    }else{
                        checkboxAllElement.checked = false;
                    }
                    if (totalPriceElement){
                        innerTextPrice();
                    }
                }
                // sy ly khi click vao checkbox all
                checkboxAllElement.onclick = function(){
                    
                    if (this.checked == true){ 
                        console.log(checkboxElements)
                        checkboxElements.forEach(function(checkbox){
                            checkbox.checked = true;
                        })
                    }else{
                        checkboxElements.forEach(function(checkbox){
                            checkbox.checked = false;
                        })
                    }
                    if (totalPriceElement){
                        innerTextPrice();
                    }
                }
            })
        }
    })
}
fetch_data_cart()
// $(document).ready(function(){
// kiem tra khi dang nhap
//doc du lieu ajax
if (userName && userName.value){
    var listElement = document.querySelector("#cart-list")
    var quantityElement = document.querySelector("#cart-quantity")
    function fetch_data_miniCart(){ // doc du lieu cua trnang detail
        $.ajax({
            url: "http://localhost:8080/api/cart", 
            method: "GET", //doc du lieu tu url tren
            success: function(data){ //khi thanh cong thi map cai html voi cai vua doc duoc roi innerHTML vo cai bien ul
                quantityElement.innerHTML = data.length; //so luong vo hang
                listElement.innerHTML = data.map(function(cart){
                    cart.price = numberWithDots(cart.price)
                    return  ` 
                        <li class="header__cart-item">
                            <a href="/${cart.slug}/detail" class="header__cart-link">
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
//doc du lieu moi khi f5 hoac mo trang
//ajax them san pham ko reload trang
    fetch_data_miniCart();
    $('#add-cart').on('click', function(){
        var slug = $("#slug").val() //lay gai tir
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
                method: "POST", // post len aci url tren
                data: {isPaid: false, slug, name, price, img, category, color, idProduct, quantity},
                success: function(data){
                    swal("Thêm sản phẩm thành công", 'Còn 1 dòng ở đây nhưng chưa biết gi gì', "success");
                    // inputColorElement.value = '' // khi thanh cong thi alert len thong bao 
                    fetch_data_miniCart();
                }
            })
        }else{
            messageError.innerHTML = 'Vui lòng chọn đúng và đủ thông tin' // message error khi nguoi dung k nhap du thong tin
        }
    })
}
    
$.ajax({
    url: `http://localhost:8080/api/address`,
    method: "GET", //doc du lieu tu url tren
    success: function(data){
        if (provincialInputElement){
            var provincialInputElement = document.querySelector("#provincial") // the input chọn tỉnh
            var districtInputElement = document.querySelector("#district") // the input chọ hyện
            var provincial = {}; // bien luu 1 object của 1 tỉnh khi chọn tỉnh xong

            // inner html vào thẻ tỉnh
            var htmlProvincial = `<option name="provincial" value="">--Chọn Quận, Tỉnh--</option>` //option nháp
            htmlProvincial += data.map(function(address){
                return `<option name="provincial" value="${address.name}">${address.name}</option>` // map cái option thành html để inner
            })
            provincialInputElement.innerHTML = htmlProvincial //inner

            //inner html vào thẻ huyện
            
            provincial = provincialInputElement.onchange = function(e){ // khi mà chọn tỉnh xong thì sét huyện
                if (this.value){ // khi mà chọn tỉnh thì bỏ attri disabled ra
                    districtInputElement.disabled = false;
                }
                $.ajax({
                    url: `http://localhost:8080/api/address`, // đọc đử liệu
                    method: "GET", //doc du lieu tu url tren
                    success: function(data2){ // khi mà change thì phải đọc ajax lại 1 lần nữa
                        var provincialObject = data2.find(function(provincial){ // tìm cái tỉnh mà vừa chọn ở trên
                            return provincial.name == provincialInputElement.value 
                        })
                        //option nháp 
                        var htmlDistrict = `<option name="district" value="">--Chọn Quận, Huyện--</option>`
                        htmlDistrict += provincialObject.districts.map(function(address){ // innerhtml vào cái select huyện
                            return `<option name="district" value="${address.name}">${address.name}</option>`
                        })
                        districtInputElement.innerHTML = htmlDistrict   

                        //tiếp tục bắt sk khi mà chọn xong huyện thì tới xã
                        $.ajax({
                            url: `http://localhost:8080/api/address`, // đọc đử liệu
                            method: "GET", //doc du lieu tu url tren
                            success: function(data3){
                                provincialObject.districts
                            }
                        })
                    }
                })
            }
        }
    }
})



   
$.ajax({
    url: `http://localhost:8080/api/address`,
    method: "GET", //doc du lieu tu url tren
    success: function(data){
        var provincialInputElement = document.querySelector("#provincial") // the input chọn tỉnh
        var districtInputElement = document.querySelector("#district") // the input chọ hyện
        var communeInputElement = document.querySelector("#commune")
        var provincialObject // the chua thong tinh cua tinh sau khi da chon o tren
        // inner html vào thẻ tỉnh

        if (provincialInputElement){

            var htmlProvincial = `<option name="provincial" value="">--Chọn Quận, Tỉnh--</option>` //option nháp
            htmlProvincial += data.map(function(address){
                return `<option name="provincial" value="${address.name}">${address.name}</option>` // map cái option thành html để inner
            })
            provincialInputElement.innerHTML = htmlProvincial //inner

            //inner html vào thẻ huyện
            provincialInputElement.onchange = function(){ // khi mà chọn tỉnh xong thì sét huyện
                communeInputElement.value = ''; // khi mà chọn lại tỉnh thì set cái value của xã về 0 và cho nó disalbed
                communeInputElement.disabled = true;
                if (this.value){ // khi mà chọn tỉnh thì bỏ attri disabled ra
                    districtInputElement.disabled = false;
                    provincialObject = data.find(function(provincial){ // tìm cái tỉnh mà vừa chọn ở trên
                        return provincial.name == provincialInputElement.value 
                    })
                    //option nháp 
                    var htmlDistrict = `<option name="district" value="">--Chọn Quận, Huyện--</option>`
                    htmlDistrict += provincialObject.districts.map(function(district){ // innerhtml vào cái select huyện
                        return `<option name="district" value="${district.name}">${district.name}</option>`
                    })
                    districtInputElement.innerHTML = htmlDistrict   
                }else{
                    districtInputElement.disabled = true; // khi mà chọn lại mà lại chọn cái value của tỉnh là 0 thì set lại cái huyện luôn
                    districtInputElement.value = '';
                }
            }

            districtInputElement.onchange = function(){
                if (this.value){ // khi mà chọn huyen thì bỏ attri disabled ra
                    communeInputElement.disabled = false;
                    var communeObject = provincialObject.districts.find(function(commune){
                        return commune.name == districtInputElement.value
                    })
                    var htmlCommune = `<option name="commune" value="">--Chọn Xã, Phường--</option>`
                    htmlCommune += communeObject.wards.map(function(commune){
                        return `<option name="commune" value="${commune.name}">${commune.name}</option>`
                    })
                    communeInputElement.innerHTML = htmlCommune
                }else{
                    communeInputElement.disabled = true;
                    communeInputElement.value = '';
                }
            }
        }
    }
})


