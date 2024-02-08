import { Db, MongoClient } from "mongodb"
import { env } from '$env/dynamic/private';

const client = new MongoClient(env.DB_URI)

export async function connect() {
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