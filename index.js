const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const req = require('express/lib/request');
const members = require('./Members');

const app = express();
const hbs = exphbs.create({defaultLayout: 'main'});

//init middleware
// app.use(logger);

//handlebars middleware
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//homepage route
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members
}));

//if you put homepage route before static folder than the homepage route will show
//if you put static folder before homepage route than the static homepage will show

/* app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
}); */

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//members api routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));