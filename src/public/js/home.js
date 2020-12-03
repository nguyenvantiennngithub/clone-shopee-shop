var search = window.location.search
function addUrlParameter(key, value) {
    console.log(window.location.search);
    switch(key){
        case 'category':{
            window.location.search += (window.location.search == '') ? `?${key}=${value}` : `&${key}=${value}` 
            break;
        }
        case 'price':{
            if (search.includes(`${key}=desc`)){
                window.location.search = search.replace('desc', value)
            }else if (search.includes(`${key}=asc`)){
                window.location.search = search.replace('asc', value)
            }else if(!search.includes(key)){
                window.location.search += (window.location.search == '') ? `?${key}=${value}` : `&${key}=${value}` 
            }
            break;
        }
    }
}

function check(){
    var inputs = document.querySelectorAll('.category-brand-item-input')
    
    //lập qua thẻ checkbox
    Array.from(inputs).forEach((input)=>{
        //tìm xem checkbox nào checked
        if (input.checked == true){
            if (search.includes('brand')){ //nếu đã có thì replace nó
                Array.from(inputs).forEach(inputt=>{
                    if (search.includes(`brand=${inputt.value}`)){
                        window.location.search = search.replace(`${inputt.value}`, `${input.value}`)
                    }
                })
            //nếu chưa thì thêm vào
            }else{
                window.location.search += (window.location.search == '') ? `?brand=${input.value}` : `&brand=${input.value}`     
            }
        }

    })
}