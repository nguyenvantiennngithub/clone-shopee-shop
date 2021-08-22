const express = require('express')
const morgan = require('morgan')
const exphbs  = require('express-handlebars')
const path = require('path')
const router  = require('./router/index.router')
const connect = require('./config/db/index.db')
const jsdom = require("jsdom");
const methodOverride = require('method-override');
const middleware = require('./middleware/middleware')
const api = require('./api/router/cart.router')
var JSDOM = jsdom.JSDOM;
const app = express()
const cookieParser = require('cookie-parser')
// app.use(morgan('combined'))
app.use(express.static(path.join(__dirname, 'public')));
app.engine('.hbs', exphbs({
    extname: '.hbs',
    helpers: {
        if_equal: function (string1, string2, option) { 
            return (string1 == string2) ? option.fn(this) : option.inverse(this) 
        },
        if_not_equal: function (string1, string2, option) { 
            return (string1 != string2) ? option.fn(this) : option.inverse(this) 
        },
        numberWithDots: function (x) {
            if (x){
                var parts = x.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                return parts.join(".");
            }
        },
        convertString: function(a){
            return a.toString();
        }
    }
}));
app.set('view engine', '.hbs');

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(methodOverride('_method'));

app.use(express.json());
app.use(cookieParser("daylamotcaichuoinhunghientaichuabietvietgi"))

app.set('views', path.join(__dirname, 'resources', 'views'));
connect();
api(app);
app.use(middleware.getInfo, middleware.testAjax);
router(app);


app.listen(process.env.PORT || 8080)