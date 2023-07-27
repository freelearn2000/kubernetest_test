const express = require('express');
const os = require('os');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
let config = require('../configs/config.json');
let {read, write} = require('./mongodb');


const port = process.env.NODE_PORT ?? 3000;

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res)=> {
    res.json({
        message: `Welcome to API!`,
        environment: process.env.ENV,
        config: config.apikey,
        hostname: os.hostname()
    });
});

app.get('/products', async(req, res)=> {
    let products = await read();
    res.status(200).send(products);
});

app.post('/products', async(req, res)=> {
    const {product} = req.body;

    await write(product);
    res.status(200).send(`Success`);
});

app.listen(port, ()=> {
    console.log(`App listening to port ${port}`);
});
