const productRouter = require('./product.router');
const meRouter = require('./me.router');


function connect(app) {
    app.use('/', productRouter);
    app.use('/me', meRouter);

}

module.exports = connect;
