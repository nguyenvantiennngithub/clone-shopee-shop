
var search = window.location.search
function addUrlParameter(key, value) {
    switch(key){
        case 'category':{
                
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
        case 'page':{
            if (search.indexOf(`${key}=`)){
                console.log(search, search.indexOf(`${key}=`))
            }
        }
    }
}

var btnPage = document.querySelectorAll(".pagination-item__link")
if (btnPage){
    btnPage.forEach(btn=>{
        btn.onclick = function(){
            page = search.indexOf('page=')
            if (page){
                console.log(page, search)
            }
        }
    })
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