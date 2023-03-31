import Surreal from "surrealdb.js";

const db = new Surreal("https://surreal.bouteille93.de/rpc");

async function connectSurreal() {
  console.log("Starting Surreal connection");
  // Signin as a namespace, database, or root user
  await db.signin({
    user: "root",
    pass: "SurrealDB+",
  });
  // Select a specific namespace / database
  await db.use("onedayoneword", "test");
  console.log("Connection to Surreal established");
}

export { connectSurreal, db };
