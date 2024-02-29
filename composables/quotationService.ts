// quotationService.ts
import type { Database } from "~/types/database.types";

export function useQuotation() {
  // Initialize Supabase client
  const supabase = useSupabaseClient<Database>();

  // Function to insert a new quotation
  async function insertQuotation(quotationData: any) {
    const { data, error } = await supabase
      .from("quotations")
      .insert([quotationData]);

    if (error) {
      console.error("Error inserting quotation:", error.message);
      return null;
    }

    return data ? data[0] : null;
  }

  // Function to retrieve all quotations
  async function selectQuotations() {
    const { data, error } = await supabase.from("quotations").select("*");

    if (error) {
      console.error("Error selecting quotations:", error.message);
      return null;
    }

    return data;
  }

  // Function to update an existing quotation
  async function updateQuotation(quotationId: number, updatedData: any) {
    const { data, error } = await supabase
      .from("quotations")
      .update(updatedData)
      .eq("id", quotationId);

    if (error) {
      console.error("Error updating quotation:", error.message);
      return null;
    }

    return data ? data[0] : null;
  }
  return {
    insert: insertQuotation,
    select: selectQuotations,
    update: updateQuotation,
  };
}
