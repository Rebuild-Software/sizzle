import { db } from "./src/query/builder";

async function main() {
  const result = await db.select().from("users").where("id").equals("1").run();
  console.log("query:", result);
}
main();

console.log("Hello via Bun!");
