const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');

const SortMiddleware = require('./app/middlewares/SortMiddleware');

const app = express();
const port = 3030;

const route = require('./routes');
const db = require('./config/db');
const { type } = require('os');

//connect to DB
db.connect();

//use static folder

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(methodOverride('_method'));

//custom middlewares
app.use(SortMiddleware);

// HTTP logger
// app.use(morgan('combined'));

//Template enginer
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: require('./helpers/handlebars')
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource', 'views'));

// console.log(path.join(__dirname, 'resource/views'));

//Route
//route init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
