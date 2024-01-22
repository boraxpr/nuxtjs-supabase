import type { Database } from "@/.nuxt/types/database.types";
export default async function getQuotations(
  tableName: string,
  columns: string
) {
  const client = useSupabaseClient<Database>();
  if (tableName === "") {
    throw "Please specify a table name";
  }
  if (columns === "") {
    columns = "*";
  }

  const { data, error } = await client.from(tableName).select(columns);
  if (error) {
    throw error.message;
  }
  console.log(data);
  return data;
}
// TODO: INSERT

// TODO: UPDATE

// TODO: DELETE
