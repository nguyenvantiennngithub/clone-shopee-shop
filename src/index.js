const express = require('express')
const morgan = require('morgan')
const exphbs  = require('express-handlebars')
const path = require('path')
const router  = require('./router/index.router')
const connect = require('./config/db/index.db')
const jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;
const app = express()
// app.use(morgan('combined'))
app.use(express.static(path.join(__dirname, 'public')));
app.engine('.hbs', exphbs({
    extname: '.hbs',
    helpers: {
        if_equal: function (string1, string2, option) { 
            return (string1 == string2) ? option.fn(this) : option.inverse(this) 
        },
        numberWithDots: function (x) {
            var parts = x.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            return parts.join(".");
        },
        
        insertParam: function (key, value) {
            key = encodeURIComponent(key);
            value = encodeURIComponent(value);
        
            // kvp looks like ['key1=value1', 'key2=value2', ...]
            var kvp = document.location.search.substr(1).split('&');
            let i=0;
        
            for(; i<kvp.length; i++){
                if (kvp[i].startsWith(key + '=')) {
                    let pair = kvp[i].split('=');
                    pair[1] = value;
                    kvp[i] = pair.join('=');
                    break;
                }
            }
        
            if(i >= kvp.length){
                kvp[kvp.length] = [key,value].join('=');
            }
        
            // can return this or...
            let params = kvp.join('&');
        
            // reload page with new params
            document.location.search = params;
        }
        
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