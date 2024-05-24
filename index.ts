import { jizzle } from "./src/adapters/bun";
import { Database } from "bun:sqlite";
import { table } from "./src/table";

const sqlite = new Database("./databases/sqlite.db");
const db = jizzle(sqlite);

// // sqlite.run("not exists CREATE TABLE foo (bar TEXT)");
// sqlite.run("INSERT INTO foo VALUES (?)", ["abc"]);
// console.log(sqlite.query("SELECT * FROM foo").all());

// const query = sqlite.query("select 'Hello world' as message;");
// query.get(); // => { message: "Hello world" }
// sqlite.
// db.bunD
const users = table({
  id: "INTEGER PRIMARY KEY",
  name: "TEXT",
});

interface Tusers {
  id: string;
  name: string;
}

// type Statuses = "failed" | "complete";
// const thisRecord: Record<string, Tusers> = {
//   usersTable: users,
// };
// console.log(thisRecord["usersTable"]);
const thisMap = new Map<string, Tusers>(); // <string, tableTypes>
console.log(thisMap);
console.log(thisMap.set("users", users)); // on create table
console.log(thisMap.get("users")); // when accessing types for type safety

async function main() {
  const result = await db.select().from("users").where("id").equals("1").run();
  console.log("query:", result);
}
main();

console.log("Hello via Bun!");
