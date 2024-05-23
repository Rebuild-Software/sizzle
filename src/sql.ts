export const sql = (strings: TemplateStringsArray, ...values: any[]) => {
  let query = "";
  for (let i = 0; i < strings.length; i++) {
    query += strings[i];
    if (i < values.length) {
      // Replace variables with placeholders
      query += "$" + (i + 1);
    }
  }
  return { query, values };
};
