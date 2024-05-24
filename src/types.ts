import type Database from "bun:sqlite";
import type { Table } from "./table";

export type Sizzle = (db: Database) => {
  //non-typesafe methods
  query: (strings: TemplateStringsArray, ...params: any[]) => SizzleMethods;

  //typesafe methods
  insert: <Key>(table: Table<Key>) => SizzleInsertMethods<Table<Key>>;
};

export type SizzleBaseMethods = {
  sql: () => string;
  rawSql: () => string;
};
export type SizzleMethods = SizzleBaseMethods & {
  all: () => any;
  run: () => void;
};

export type SizzleInsertMethods<Table> = SizzleBaseMethods & {
  values: (data: { [key in keyof Table]: any }) => void;
};
