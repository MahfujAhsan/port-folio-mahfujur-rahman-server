const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.j5g1e.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();

        const projects = client.db('portfolio').collection('projectsCollection');

        app.get('/projects', async (req, res) => {
            const query = {};
            const cursor = projects.find(query);
            const project = await cursor.toArray();
            res.send(project) 
        });

        app.get('/projects/:projectId', async (req, res) => {
            const id = req.params.projectId;
            const query = { _id: ObjectId(id)};
            const results = await projects.findOne(query);
            res.send(results);
        });

    }
    finally {

    }
};

run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('HeY, Portfolio Running')
});

app.listen(port, () => {
    console.log(`Server Running, ${port}`)
});