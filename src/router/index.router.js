const productRouter = require('./product.router');


function connect(app) {
    app.use('/', productRouter);
}

module.exports = connect;
