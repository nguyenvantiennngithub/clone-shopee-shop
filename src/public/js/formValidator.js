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
        // console.log(input)
        var rules = ruleSelector[rule.selector]
        for (var i = 0; i < rules.length; i++){
            var messageError = rules[i](input.value)
            if (messageError){
                break;
            }
        }
        if (messageError){
            getParentForm(input, options.formGroup).classList.add('invalid')
            messageElement.innerText = messageError
        }else{
            getParentForm(input, options.formGroup).classList.remove('invalid')
            messageElement.innerText = ''
        }
        return !messageError



        // var messageError = rule.test(input.value)
        // if (!messageError){
        //     getParentForm(input, options.formGroup).classList.remove('invalid')
        //     messageElement.innerText = ''
        //     return true
        // }
        // getParentForm(input, options.formGroup).classList.add('invalid')
        // messageElement.innerText = messageError
        // return false
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
                form.submit()
            }
        }
        var ruleSelector = {}
        options.rules.forEach(function(rule){
            if (Array.isArray(ruleSelector[rule.selector])){
                ruleSelector[rule.selector].push(rule.test)
            }else{
                ruleSelector[rule.selector] = [rule.test]
            }
            var inputElements = form.querySelectorAll(rule.selector)
            Array.from(inputElements).forEach(function(input){
                var messageElement = getParentForm(input, options.formGroup).querySelector(options.messageElement)
                input.onblur = function(e){
                    Validate(input, rule, messageElement)
                }

                input.oninput = function(){
                    messageElement.innerText = ''
                    getParentForm(input, options.formGroup).classList.remove('invalid')
                }
            })
        })

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

Validator.passwordConfig = function(selector, message, password){
    return {
        selector: selector,
        test: function(data){
            return password() === data ? undefined : message
        }
    }
}