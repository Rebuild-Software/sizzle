import { db } from "./queryBuilder/queryBuilder";

//testing
async function main() {
  const result = await db.select().from("users").where("id").equals("1").run();
  console.log("query:", result);
}
main();
