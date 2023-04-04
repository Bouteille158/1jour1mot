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

export function getSurrealCompatibleDate(date: Date): string {
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  const formattedDate = year + month + day;

  console.log(formattedDate); // affiche une date sous le format YYMMDD (par exemple, 230327 pour le 27 mars 2023)
  return formattedDate;
}

export { connectSurreal, db };
