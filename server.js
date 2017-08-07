const express = require('express');
const app = express();
const port = 4000;
const engine = require('ejs-locals');
const router = require('./router/index')(app);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('ejs', engine);

let server = app.use(express.static('public')).listen(port, () => {
    console.log(`Express server has started on port:${port}`);
});
