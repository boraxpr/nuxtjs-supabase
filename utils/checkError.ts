import type { PostgrestError } from "@supabase/supabase-js";

export default function (funcName: String, error: PostgrestError | null) {
    if(error){
        console.log("error ",funcName,": ",error)
      }
  }
  