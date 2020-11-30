const productRouter = require('./product.router');
const meRouter = require('./me.router');
const authRouter = require('./auth.router');
const middleware = require('../middleware/middleware');


function connect(app) {
    app.use('/', productRouter);
    app.use('/me', meRouter);
    app.use('/auth', authRouter);
}

module.exports = connect;
