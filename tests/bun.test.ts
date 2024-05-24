// todo we move this to the actual src, just playing rn

import Database from "bun:sqlite";
import { expect, test } from "bun:test";
import { sql } from "../src/sql";
import { sizzle } from "../src/adapters/bun";

test("basic untyped methods", () => {
  const db = new Database(":memory:");

  // insert a dummy user sql query:

  const client = sizzle(db);

  client.query`
    CREATE TABLE users (
        id INTEGER PRIMARY KEY,
        name TEXT
    )
  `.run();

  client.query`
    INSERT INTO users (name) VALUES ("bob")
  `.run();

  // client.
  expect(client.query`select * from users WHERE name=${"bob"}`.all()).toEqual([
    {
      id: 1,
      name: "bob",
    },
  ]);

  // injection doesnt work
  expect(
    client.query`select * from users WHERE name=${"bob; AND"}`.sql()
  ).toEqual("select * from users WHERE name='bob'");

  expect(
    client.query`select * from users WHERE name=${"bob"}`.rawSql()
  ).toEqual("select * from users WHERE name=$1");
});

test("type safe ideas", () => {
  const db = new Database(":memory:");

  // insert a dummy user sql query:

  const client = sizzle(db);

  //client.insert();
});
