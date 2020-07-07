import {MongoClient} from "mongodb";

let database = undefined;

/**
 * @returns {import("mongodb").Db}
 */
export function db() {
  if (database === undefined) {
    console.error("Database is not initialized!");
  }
  return database;
}

export async function initDatabase() {
  const client = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  database = client.db();

  console.log("Connected to MongoDB database");
}
