class productController{
    home(req, res){
        res.render("home");
    }
}

module.exports = new productController()
