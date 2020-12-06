const productModel = require('../../module/product.module')
const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const mongooseToObject = require('../../until/index.mongoose')


class productController{
    
    //[GET] /
    home(req, res, next){
        // lấy ra từng cái trademark với category tương ứng
        function getBrandOfCategoryUnique(){
            var brandOfCategory = []
            return productModel.find({})
                .then(products=>{
                    for (var i of products){
                        if (i.slugCategory == req.query.category){
                            brandOfCategory.push(i.brand);
                        }
                    }
                    return Array.from(new Set(brandOfCategory))
                })
                .catch(err=>{
                    next(err);
                })
        }
        // lấy ra category  
        function getCategoryUnique(){
            var categoryUniqueArray = []
            return productModel.find({})
                .then((products)=>{
                    for (var i of products){
                        categoryUniqueArray.push(i.category);
                    }
                    // return Array.from(new Set(categoryUniqueArray))
                    return Array.from(new Set(categoryUniqueArray))
                })
                .catch((err)=>{
                    next(err)
                })
        }

        //biến để find trong db
        var filter = {}
        var currentBrand;
        //filter theo category và sort theo price
        if (req.query.hasOwnProperty("category")){
            filter.slugCategory = req.query.category
        }
        if (req.query.hasOwnProperty("brand")){
            if (req.query.brand != "all"){
                currentBrand = req.query.brand
                filter.brand = req.query.brand
            }
        }else{
            currentBrand = undefined
        }

        //biến tạm khi đọc db
        var tempProductModel =  productModel.find(filter)
        if (req.query.hasOwnProperty("price")){

            var typesOfPrice = ['asc', 'desc']
            if (typesOfPrice.indexOf(req.query.price) == -1){
                req.originalUrl = req.originalUrl.replace(req.query.price, 'asc')
                req.query.price = 'asc'
            }
            tempProductModel = tempProductModel.sort({price: req.query.price})
        }
        var categoryQuery = getCategoryUnique();
        var brandQuery = getBrandOfCategoryUnique()
        //chia trang
        var page = parseInt(req.query.page) || 1;
        var perPage = 10; // x
        var begin = (page-  1) * perPage;
        var end = perPage * page;
        Promise.all([categoryQuery, brandQuery, tempProductModel])
            .then(([categoryUnique, brandUnique, products])=>{
                res.render("home", {
                    products: mongooseToObject.mongoosesToObject(products).slice(begin, end),
                    filterCategory: req.query.category,
                    brandOfCategory: brandUnique,
                    categoryUnique: categoryUnique,
                    currentBrand: currentBrand,
                })
            })
            .catch(err=>{
                next(err);
            })
    }
    //[GET /:slug/detail
    detail(req, res, next){
        productModel.findOne({ slug: req.params.slug })
            .then(product=>{
                res.render("product/detail", {
                    product: mongooseToObject.mongooseToObject(product),
                    
                })
            })
            .catch(err=>{
                next(err);
            })
        
    }
    //[GET] /create
    create(req, res, next){
        res.render("product/create")
    }

    //[POST] /save
    save(req, res, next){
        req.body.color = req.body.color.split(",")
        req.body.idUser = req.signedCookies.idUser;
        const product = new productModel(req.body);
        product.save()
            .then(()=>{
                res.redirect('/')   
            })    
            .catch((err)=>{
                next(err);
            })
    }
    //[DELETE] /:slug/delete
    delete(req, res, next){
        productModel.deleteOne({ _id: req.params.slug})
            .then(()=>{
                res.redirect("/me/list/trash");
            })
            .catch((err)=>{
                next(err);
            })
    }
    //[DELETE] /:slug/soft-delete
    softDelete(req, res, next){
        productModel.delete({ _id: req.params.slug})
        .then(()=>{
            res.redirect("/me/list/show");
        })
        .catch((err)=>{
            next(err);
        })
    }
    //[GET] /:slug/restore
    restore(req, res, next){
        productModel.restore({ _id: req.params.slug})
            .then(()=>{
                res.redirect("/me/list/trash");
            })
            .catch((err)=>{
                next(err);
            })
    }
    //[GET] /:slug/edit
    edit(req, res, next){
        productModel.findOne({ _id: req.params.slug})
        .then((product)=>{
            res.render("product/edit", {
                product: mongooseToObject.mongooseToObject(product)
            })
        })
        .catch((err)=>{
            next(err);
        })
    }

    //[POST] /:slug/update
    update(req, res, next){
        //hàm bỏ dấu tiếng việt
        function change_alias(alias) {
            var str = alias;
            str = str.toLowerCase();
            str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
            str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
            str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
            str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
            str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
            str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
            str = str.replace(/đ/g,"d");
            str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
            str = str.replace(/ + /g," ");
            return str;
        }
        //tạo slug bằng hàm
        function generate_slug(text) {
            text = change_alias(text)
            return text.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-').trim();
        };

        //update slug 
        req.body.color = req.body.color.split(",")
        req.body.slug = generate_slug(req.body.name)
        req.body.slugCategory = generate_slug(req.body.category)
        req.body.slugBrand = generate_slug(req.body.brand)
        productModel.updateOne({ _id: req.params.slug}, req.body)
            .then(()=>{
                res.redirect("/");
            })
            .catch(err=>{
                next(err);
            })
    }
    
}

module.exports = new productController()




