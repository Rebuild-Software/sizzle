// define all types we allow, like blob, etc, and this way its type safe when you define tables, without importing code?
type FieldType = "INTEGER PRIMARY KEY" | "TEXT";

export type Table<Key> = {
  [key in keyof Key]: FieldType;
};

export const table = <CustomTable extends Table<Key>, Key>(
  table: CustomTable
) => {
  return table;
};
