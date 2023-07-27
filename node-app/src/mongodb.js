const { MongoClient } = require('mongodb');


const connectionString = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_INITDB_HOST}:${process.env.MONGO_INITDB_PORT}`;
const dbClient = new MongoClient(connectionString);

const dbName = `nodeapp`;
const tbName = `Products`;


async function read() {
    try {
        await dbClient.connect();
        let result = await dbClient.db(dbName).collection(tbName).find().toArray();
        return result;
    }
    catch (e) {
        console.log(e);
        throw e;
    }
    finally {
        await dbClient.close();
    }
}

async function write(product) {
    try {
        await dbClient.connect();
        await dbClient.db(dbName).collection(tbName).insertOne({ Product: product });
    }
    catch (e) {
        console.log(e);
        throw e;
    }
    finally {
        await dbClient.close();
    }
}

module.exports = {
    read, write
};