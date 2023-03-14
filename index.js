const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;


const app = express();

//middleware

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tg7jnth.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function linkland() {
    try {
        const socialPostCollection = client.db('linklandSocial').collection('socialPosts');

        //Create posts
        app.post('/socialPosts', async (req, res) => {
            const post = req.body;
            const result = await socialPostCollection.insertOne(post);
            res.send(result);
            console.log(result)
        });

        //data get
        app.get('/socialPosts', async (req, res) => {
            const query = {};
            const posts = await socialPostCollection.find(query).toArray();
            res.send(posts);
        })

    }
    finally {

    }

}
linkland().catch(console.log);


app.get('/', async (req, res) => {
    res.send('linkland server portal is running');
})

app.listen(port, () => console.log(`linkland portal running on ${port}`));