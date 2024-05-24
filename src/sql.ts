export const sql = (strings: TemplateStringsArray, ...params: any[]) => {
  let query = "";
  for (let i = 0; i < strings.length; i++) {
    query += strings[i];
    if (i < params.length) {
      // Replace variables with placeholders
      query += "$" + (i + 1);
    }
  }
  return { query, params };
};
