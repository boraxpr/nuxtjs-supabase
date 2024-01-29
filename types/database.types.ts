export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      customers: {
        Row: {
          address: string
          branch_code: string
          branch_name: string
          id: string
          is_branch: boolean
          name: string | null
          tax_id: string
          zipcode: string
        }
        Insert: {
          address: string
          branch_code?: string
          branch_name?: string
          id?: string
          is_branch?: boolean
          name?: string | null
          tax_id: string
          zipcode: string
        }
        Update: {
          address?: string
          branch_code?: string
          branch_name?: string
          id?: string
          is_branch?: boolean
          name?: string | null
          tax_id?: string
          zipcode?: string
        }
        Relationships: []
      }
      notes: {
        Row: {
          id: number
          title: string | null
        }
        Insert: {
          id?: number
          title?: string | null
        }
        Update: {
          id?: number
          title?: string | null
        }
        Relationships: []
      }
      product: {
        Row: {
          barcode: string | null
          category: string | null
          created_at: string
          income_account: string | null
          main_unit: number | null
          product_code: number | null
          product_description: string | null
          product_img: string | null
          product_name: string | null
          product_number: number
          product_type: string | null
          selling_price: number | null
          unit: string | null
          vat: number | null
        }
        Insert: {
          barcode?: string | null
          category?: string | null
          created_at?: string
          income_account?: string | null
          main_unit?: number | null
          product_code?: number | null
          product_description?: string | null
          product_img?: string | null
          product_name?: string | null
          product_number?: number
          product_type?: string | null
          selling_price?: number | null
          unit?: string | null
          vat?: number | null
        }
        Update: {
          barcode?: string | null
          category?: string | null
          created_at?: string
          income_account?: string | null
          main_unit?: number | null
          product_code?: number | null
          product_description?: string | null
          product_img?: string | null
          product_name?: string | null
          product_number?: number
          product_type?: string | null
          selling_price?: number | null
          unit?: string | null
          vat?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      project: {
        Row: {
          detail: string | null
          price: number | null
          project_name: string
        }
        Insert: {
          detail?: string | null
          price?: number | null
          project_name: string
        }
        Update: {
          detail?: string | null
          price?: number | null
          project_name?: string
        }
        Relationships: []
      }
      "QuotationProduct ": {
        Row: {
          doc_num: string
          product_number: number
          quantity: number | null
        }
        Insert: {
          doc_num: string
          product_number: number
          quantity?: number | null
        }
        Update: {
          doc_num?: string
          product_number?: number
          quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "QuotationProduct _doc_num_fkey"
            columns: ["doc_num"]
            isOneToOne: false
            referencedRelation: "quotations"
            referencedColumns: ["doc_num"]
          },
          {
            foreignKeyName: "QuotationProduct _product_number_fkey"
            columns: ["product_number"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["product_number"]
          }
        ]
      }
      quotations: {
        Row: {
          created_date: string | null
          currency: string | null
          customer_id: string | null
          doc_num: string
          due_date: string | null
          grand_total: number | null
          project_name: string | null
          status: string | null
        }
        Insert: {
          created_date?: string | null
          currency?: string | null
          customer_id?: string | null
          doc_num: string
          due_date?: string | null
          grand_total?: number | null
          project_name?: string | null
          status?: string | null
        }
        Update: {
          created_date?: string | null
          currency?: string | null
          customer_id?: string | null
          doc_num?: string
          due_date?: string | null
          grand_total?: number | null
          project_name?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quotations_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotations_project_name_fkey"
            columns: ["project_name"]
            isOneToOne: false
            referencedRelation: "project"
            referencedColumns: ["project_name"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
