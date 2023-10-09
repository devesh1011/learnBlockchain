const express = require('express');
const bodyParser = require('body-parser');
const { BlockChain } = require('./blockchain');
const {Publish} = require('./publishSubscribe');

const app = express();
const PORT = 5000;

const blockchain = new BlockChain();
const pubSub = new Publish({blockchain});

setTimeout(
    () => {
        pubSub.broadcastChain()
    }, 1000
);

app.use(bodyParser.json());
app.get('/api/blocks', (req, res) => {
    res.json(blockchain.chain);
});

app.post('/api/mine', (req, res) => {
    const { data } = req.body;

    blockchain.addBlock({ data });
    res.redirect('/api/blocks');
});

app.listen(PORT || 5000, () => {
    console.log(`Listening to port ${PORT}`)
});