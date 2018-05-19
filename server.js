const express = require ('express');
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');
const CORS = require('cors');

const server = express();
const port = process.env.PORT || 3030;

const routes = require ('./api/routes/routes');

const corsOptions = {
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204 
};

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://justinborek:stripetest@ds123500.mlab.com:23500/stripetest', { useMongoClient: true });

server.use(bodyParser.json());
server.use(CORS());

server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
})

routes(server);

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});