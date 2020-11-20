const express = require('express')
const morgan = require('morgan')
const exphbs  = require('express-handlebars')
const path = require('path')
const router  = require('./router/index.router')
const connect = require('./config/db/index.db')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const app = express()
// app.use(morgan('combined'))
app.use(express.static(path.join(__dirname, 'public')));

app.engine('.hbs', exphbs({
    extname: '.hbs',
    helpers: {
        if_equal: function (string1, string2, option) { 
            return (string1 == string2) ? option.fn(this) : option.inverse(this) 
        },
        
        
    }
}));
app.set('view engine', '.hbs');

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.set('views', path.join(__dirname, 'resources', 'views'));
connect();
router(app);


app.listen(8080)