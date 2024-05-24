const query: string[] = [];

const SqlFilters = {
  equals(s: string) {
    query.push("equals");
    query.push(s);
    return db as Pick<typeof db, "run">;
  },
};

export const db = {
  select(s = "*") {
    query.push("select");
    query.push(s);
    return db as Pick<typeof db, "from">;
  },
  insert() {},
  from(s: string) {
    query.push("from");
    query.push(s);
    return db as Pick<typeof db, "where" | "run">;
  },
  where(s: string) {
    query.push("where");
    query.push(s);
    return SqlFilters;
  },
  async run() {
    return query.join(",").replace(/\,/gi, " ");
  },
};
