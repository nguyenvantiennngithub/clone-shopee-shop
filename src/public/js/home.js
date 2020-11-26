var search = window.location.search
function addUrlParameter(key, value) {
    console.log(window.location.search);
    
   
//     var category = document.getElementsByClassName('category-trademark-item')
// console.log("category", category)
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
            }else{
                window.location.search += (window.location.search == '') ? `?${key}=${value}` : `&${key}=${value}` 
            }
            break;
        }
    }
}

function check(){
    var inputs = document.querySelectorAll('.category-trademark-item-input')
    
    var flag = false;
    Array.from(inputs).forEach((input)=>{
        if (input.checked == true){
            
            if (search.includes('trademark')){

                Array.from(inputs).forEach(inputt=>{
                    if (search.includes(`trademark=${inputt.value}`)){
                        window.location.search = search.replace(`${inputt.value}`, `${input.value}`)
                    }
                    
                })
            }else{
                window.location.search += (window.location.search == '') ? `?trademark=${input.value}` : `&trademark=${input.value}` 
            }
        }

    })
}