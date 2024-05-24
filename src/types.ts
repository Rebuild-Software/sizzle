import type Database from "bun:sqlite";

export type Sizzle = (db: Database) => {
  query: (strings: TemplateStringsArray, ...params: any[]) => SizzleMethods;
};

export type SizzleMethods = {
  all: () => any;
  run: () => void;
  sql: () => string;
  rawSql: () => string;
};
