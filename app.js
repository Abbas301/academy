const express = require('express');
const cors = require('cors');
const app = express();
const port = 2000;
const auth = require('./routes/authr')
const image = require('./routes/image')
const path = require('path');

// env config
require('dotenv').config();

// importing database
require('./config/db');

// cors middleware
app.use(cors());

// bodyparser middleware
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join('public/images')));
app.use(express.json());

app.use('/api', auth)

app.use('/image', image)


app.get('/', (req, res) => {
    res.json({requestHeaders: req.headers, responseHeaders: res.getHeaders(), app: 'Medifit', path: '/'});
});

app.use((err, req, res, next) => {
    res.json({error: true, message: err, errorMeassage: 'Some Internal Error Ocured'});
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
