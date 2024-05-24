import { sizzle } from "./src/adapters/bun";
import { Database } from "bun:sqlite";

const sqlite = new Database("./databases/sqlite.db");
const db = sizzle(sqlite);

// // sqlite.run("not exists CREATE TABLE foo (bar TEXT)");
// sqlite.run("INSERT INTO foo VALUES (?)", ["abc"]);
// console.log(sqlite.query("SELECT * FROM foo").all());

// const query = sqlite.query("select 'Hello world' as message;");
// query.get(); // => { message: "Hello world" }
// sqlite.
// db.bunD
async function main() {
  const result = await db.select().from("users").where("id").equals("1").run();
  console.log("query:", result);
}
main();

console.log("Hello via Bun!");
