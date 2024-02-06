import { MongoClient } from "mongodb"
import { env } from '$env/dynamic/private';

const client = new MongoClient(env.DB_URI)
await client.connect()

console.log('Connected to database')
export default client.db('transport-prices')