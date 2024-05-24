import { Database } from "bun:sqlite";
import { qb } from "../query/builder";

export function jizzle(bunD: Database) {
  return { ...qb, bunD };
}
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
    insert: (table) => {
      // need table key as string ex. "users"
      return {
        values: (data) => {
          // const {keys, values} = Object.entries(data);
          const { id, name } = data as { id: string; name: string };
          db.query("insert into users (name) values (?)").run(name);
          return {
            returning(returningParams) {
              if (!returningParams) {
                const res = db
                  .query("select * from users where name = (?)")
                  .all(name);
                return res[0] as typeof table;
              }
              //id example
              const col1 = Object.keys(data)[0];
              const res = db
                .query(`select (${col1}) from users where ${col1} = ?`)
                .all(id);
              return res[0] as typeof table;
            },
          };
        },
        sql: () => {
          return "test sql";
        },
        rawSql: () => {
          return "test rawsql";
        },
      };
    },
  };
};
