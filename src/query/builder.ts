import { sql } from "../sql";
const query: string[] = [];
const escaped_values: any[] = [];

const SqlFilters = {
  equals(s: string) {
    query.push(sql`= ${s}`.query);
    escaped_values.push(sql`= ${s}`.params[0]);
    return qb as Pick<typeof qb, "run">;
  },
};

export const qb = {
  select(s = "*") {
    query.push(sql`select ${s}`.query);
    escaped_values.push(sql`= ${s}`.params[0]);
    return qb as Pick<typeof qb, "from">;
  },
  insert() {},
  from(s: string) {
    query.push(sql`from ${s}`.query);
    escaped_values.push(sql`= ${s}`.params[0]);
    return qb as Pick<typeof qb, "where" | "run">;
  },
  where(s: string) {
    query.push(sql`where ${s}`.query);
    escaped_values.push(sql`= ${s}`.params[0]);
    return SqlFilters;
  },
  async run() {
    console.log(query);
    console.log(escaped_values);
    return query.join(",").replace(/\,/gi, " ");
  },
};
