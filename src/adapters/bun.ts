import { Database } from "bun:sqlite";
import { qb } from "../query/builder";

export function sizzle(bunD: Database) {
  return { ...qb, bunD };
}
