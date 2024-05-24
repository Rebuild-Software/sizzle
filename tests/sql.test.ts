import { expect, test } from "bun:test";
import { sql } from "../src/sql";

test("generates prepared statement correctly", () => {
  expect(sql`SELECT * FROM users WHERE id = ${100}`.query).toBe(
    `SELECT * FROM users WHERE id = $1`
  );
  expect(sql`SELECT * FROM users WHERE id = ${100}`.params).toEqual([100]);
});
