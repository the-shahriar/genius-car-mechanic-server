const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config()
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json())

const port = process.env.PORT || 5000;

// database connection
// 271oDPejxlYKnc3G
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ra2hb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("GeniusMechanics");
        const collection = database.collection("services");

        // POST API
        app.post('/services', async (req, res) => {
            // getting data from post method
            const doc = req.body;

            const result = await collection.insertOne(doc);
            res.send(result);
        })

    } finally {
        // await client.close();
    }
}

run().catch(console.dir)

app.get('/', async (req, res) => {
    res.send("Hello I am from my Genius Car Mechanic Server")
})

app.listen(port, () => {
    console.log("Server is running from", port);
})