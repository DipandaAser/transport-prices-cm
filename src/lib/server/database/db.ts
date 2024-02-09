import { Db, MongoClient } from "mongodb"
import { env } from '$env/dynamic/private';

let client: MongoClient;

export async function connect() {
    client = new MongoClient(env.DB_URI);
    await client.connect()
}

// disconnect from the database
export async function disconnect(): Promise<void> {
    await client.close();
}

// get the database
export function getDB(): Db {
    return client.db('transport-prices');
}