const productRouter = require('./product.router');
const meRouter = require('./me.router');
const authRouter = require('./auth.router');
const cartRouter = require('./cart.router');

const middleware = require('../middleware/middleware');


function connect(app) {
    app.use('/', productRouter);
    app.use('/me', meRouter);
    app.use('/auth', middleware.getInfo, authRouter);
    app.use('/cart', cartRouter);
}

module.exports = connect;
