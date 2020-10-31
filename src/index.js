const express = require('express')
const morgan = require('morgan')
const exphbs  = require('express-handlebars')
const path = require('path')
const app = express()
 
app.use(morgan('combined'))
app.use(express.static(path.join(__dirname, 'public')));


app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.set('views', path.join(__dirname, 'resources', 'views'));

app.get('/', function (req, res) {
  res.render('home')
})
 
app.listen(8080)