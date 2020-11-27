// //login
// var formLogin = document.querySelector('#form-login') //thẻ form login
// var tagLogins = document.querySelectorAll('[name="login"]'); //thẻ đăng nhập phần header
// var tagCloseLogin = formLogin.querySelector('.auth-form__control-back') //thẻ đóng trong from login
// //submit-login
// var submitLogin = document.querySelector('#submit-login')
// //register
// var formRegister = document.querySelector('#form-register')
// var tagRegisters = document.querySelectorAll('[name="register"]')

// console.log(submitLogin)

// //hàm tắt form đăng nhập
// function addAttriInForm(form){
//     form.setAttribute('hidden', 'hidden')
// }

// //hàm bật form đăng nhập
// function removeAttriInForm(form){
//     form.removeAttribute('hidden', 'hidden')
// }

// //sử lý bật form login
// tagLogins.forEach(function(tag){
//     tag.onclick = function(){
//         addAttriInForm(formRegister)
//         removeAttriInForm(formLogin)
//     }
// })


// //sử lý bật form đăng ký
// tagRegisters.forEach(function(tag){
//     tag.onclick = function(){
//         addAttriInForm(formLogin)
//         removeAttriInForm(formRegister)
//     }
// })


// //sử lý submit formLogin
