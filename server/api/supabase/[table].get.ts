import { serverSupabaseClient } from "#supabase/server";
import { Database } from "@/types/database.types";

export default eventHandler(async (event) => {
  const table = getRouterParam(event, "table");
  const client = await serverSupabaseClient<Database>(event);

  const { data } = await client.from(table!).select("*");

  return data;
});
