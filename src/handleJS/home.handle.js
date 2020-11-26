
function addUrlParameter(key, value) {
    console.log(window.location.search);
    var search = window.location.search
   
//     var category = document.getElementsByClassName('category-trademark-item')
// console.log("category", category)
    switch(key){
        case 'category':{
            
            if (search.includes(`${key}=smart-phone`)){
                window.location.search = search.replace('smart-phone', value)
            }else if (search.includes(`${key}=tablet`)){
                window.location.search = search.replace('tablet', value)
            }
            else if (search.includes(`${key}=laptop`)){
                window.location.search = search.replace('laptop', value)
            }else{
                window.location.search += (window.location.search == '') ? `?${key}=${value}` : `&${key}=${value}` 
            }
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

console.log("hlfjkashdfksahfkjlashfkjashfkjashfk")