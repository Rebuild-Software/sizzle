import { Statement } from "bun:sqlite";
import { paramsToObject } from "../helpers";
import { sql } from "../sql";
import type { Sizzle, SizzleMethods } from "../types";

export type SizzleContext = {
  statement: Statement;
  params: any[];
  query: string;
};

export const sizzle: Sizzle = (db) => {
  const methods = ({
    statement,
    params,
    query,
  }: SizzleContext): SizzleMethods => ({
    run: () => {
      statement.run(paramsToObject(params));
    },
    all: () => {
      return statement.all(paramsToObject(params));
    },
    sql: () => {
      return statement.toString();
    },
    rawSql: () => {
      return query;
    },
  });

  return {
    query: (strings, ...values) => {
      const { query, params } = sql(strings, ...values);
      const statement = db.query(query);
      return methods({ statement, params, query });
    },
  };
};
