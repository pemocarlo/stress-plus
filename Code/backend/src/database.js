import {MongoClient} from "mongodb";
//import {MongoClient, ObjectID} from "mongodb";

let database = undefined;

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

  //console.log(`DatabaseName ${db.databaseName}`);

  //const result = await db.collection("stress-test").insertOne({foo: 123});
  //console.log(`Inserted ID ${result.insertedId}`);

  //const fetch = await db
  //  .collection("stress-test")
  //  .find({_id: ObjectID("5efc7041b30fb01dc46407b8")});
  //console.log(fetch);

  //const deletedResult = await db.collection("stress-test").deleteMany({foo: 123});
  //console.log(`Deleted ${deletedResult.deletedCount}`);

  //await db
  //  .collection("stress-test")
  //  .find({})
  //  .forEach((entry) => console.log(entry));

  //const collections = await db.collections();
  //collections.forEach((c) => console.log(c.namespace));

  //await client.close();
}
