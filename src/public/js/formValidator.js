function Validator(options){

    //Hàm lấy ra thẻ cha tương ứng với biến selector
    function getParentForm(input, selector){
       while(input.parentElement){
           
           if (input.parentElement.matches(selector)){
               return input.parentElement;
           }
           input = input.parentElement;
       }
    }

    //Hàm kiểm tra xem input.value có đúng với yêu câu chưa
    function Validate(input, rule, messageElement){
        var messageError = rule.test(input.value)
        if (!messageError){
            getParentForm(input, options.formGroup).classList.remove('invalid')
            messageElement.innerText = ''
            return true
        }
        getParentForm(input, options.formGroup).classList.add('invalid')
        messageElement.innerText = messageError
        return false
    }

    //thẻ form chính
    var form = document.querySelector(options.form)
    if (form){
       
        form.onsubmit = function(e){
            var isAllValidate = true;
            e.preventDefault();
            //lập qua từng rule
            options.rules.forEach(function(rule){
                var input = form.querySelector(rule.selector)
                var messageElement = getParentForm(input, options.formGroup).querySelector(options.messageElement)
                var isValidate = Validate(input, rule, messageElement)
                if (!isValidate){
                    isAllValidate = false;
                }
            })
            if (isAllValidate){
                console.log("here")
                // var inputElements = form.querySelectorAll('input[name]')
                // console.log(inputElements)
                form.submit()
            }
        }
    }
    
}

Validator.isRequired = function(selector, message){
    return {
        selector: selector,
        test: function(data){
            return data ? undefined : message 
        }
    }
}

Validator.minLength = function(selector, minLength, message){
    return {
        selector: selector,
        test: function(data){
            return data.length >= minLength ? undefined : message 
        }
    }
}