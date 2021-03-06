import { MongoClient } from 'mongodb'

let uri = process.env.MONGODB_URI
let dbName = process.env.MONGODB_DB

let cachedClient;
let cachedDb;

if (!uri) {
    throw new Error('Please add your Mongo URI to .env.local')
}
if (!dbName) {
    throw new Error('Please add your MONGODB_DB to .env.local')
}

export async function connectToDataBase() {
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb }
    }

    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    
    const db = await client.db(dbName);

    cachedClient = client;
    cachedDb = db;

    return { client, db }
}


