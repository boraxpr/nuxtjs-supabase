export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      category: {
        Row: {
          category_name: string | null
          created_at: string
          id: number
        }
        Insert: {
          category_name?: string | null
          created_at?: string
          id?: number
        }
        Update: {
          category_name?: string | null
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      customers: {
        Row: {
          account_number: number | null
          account_type: string | null
          address: string | null
          attachment: string | null
          bank: string | null
          bank_branch: string | null
          branch_code: string | null
          branch_name: string | null
          business_name: string | null
          business_type: string | null
          contact_name: string | null
          contact_type: string | null
          created_at: string | null
          created_by: string | null
          credit_date: string | null
          customer_name: string | null
          email: string | null
          fax_number: number | null
          id: string
          mobile: string | null
          notes: string | null
          phone: number | null
          shipping_address: string | null
          status: boolean | null
          tax_id: string | null
          updated_at: string | null
          updated_by: string | null
          website: string | null
          zipcode: string | null
        }
        Insert: {
          account_number?: number | null
          account_type?: string | null
          address?: string | null
          attachment?: string | null
          bank?: string | null
          bank_branch?: string | null
          branch_code?: string | null
          branch_name?: string | null
          business_name?: string | null
          business_type?: string | null
          contact_name?: string | null
          contact_type?: string | null
          created_at?: string | null
          created_by?: string | null
          credit_date?: string | null
          customer_name?: string | null
          email?: string | null
          fax_number?: number | null
          id?: string
          mobile?: string | null
          notes?: string | null
          phone?: number | null
          shipping_address?: string | null
          status?: boolean | null
          tax_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
          website?: string | null
          zipcode?: string | null
        }
        Update: {
          account_number?: number | null
          account_type?: string | null
          address?: string | null
          attachment?: string | null
          bank?: string | null
          bank_branch?: string | null
          branch_code?: string | null
          branch_name?: string | null
          business_name?: string | null
          business_type?: string | null
          contact_name?: string | null
          contact_type?: string | null
          created_at?: string | null
          created_by?: string | null
          credit_date?: string | null
          customer_name?: string | null
          email?: string | null
          fax_number?: number | null
          id?: string
          mobile?: string | null
          notes?: string | null
          phone?: number | null
          shipping_address?: string | null
          status?: boolean | null
          tax_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
          website?: string | null
          zipcode?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_customers_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_customers_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
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
          category_id: number | null
          created_at: string
          created_by: string | null
          income_account: string | null
          main_unit: number | null
          product_code: number | null
          product_description: string | null
          product_img: string | null
          product_name: string | null
          product_number: number
          product_type_id: number | null
          selling_price: number | null
          status: boolean | null
          unit: string | null
          updated_at: string | null
          updated_by: string | null
          vat: number | null
        }
        Insert: {
          barcode?: string | null
          category_id?: number | null
          created_at?: string
          created_by?: string | null
          income_account?: string | null
          main_unit?: number | null
          product_code?: number | null
          product_description?: string | null
          product_img?: string | null
          product_name?: string | null
          product_number?: number
          product_type_id?: number | null
          selling_price?: number | null
          status?: boolean | null
          unit?: string | null
          updated_at?: string | null
          updated_by?: string | null
          vat?: number | null
        }
        Update: {
          barcode?: string | null
          category_id?: number | null
          created_at?: string
          created_by?: string | null
          income_account?: string | null
          main_unit?: number | null
          product_code?: number | null
          product_description?: string | null
          product_img?: string | null
          product_name?: string | null
          product_number?: number
          product_type_id?: number | null
          selling_price?: number | null
          status?: boolean | null
          unit?: string | null
          updated_at?: string | null
          updated_by?: string | null
          vat?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "product_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_product_type_id_fkey"
            columns: ["product_type_id"]
            isOneToOne: false
            referencedRelation: "productType"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      productType: {
        Row: {
          created_at: string
          id: number
          product_type_name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          product_type_name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          product_type_name?: string | null
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
          created_at: string
          created_by: string | null
          customer_id: string | null
          detail: string | null
          id: number
          price: number | null
          project_name: string | null
          status: boolean | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          detail?: string | null
          id?: number
          price?: number | null
          project_name?: string | null
          status?: boolean | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          detail?: string | null
          id?: number
          price?: number | null
          project_name?: string | null
          status?: boolean | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      quotation: {
        Row: {
          attachment: string | null
          created_date: string | null
          credit_day: number | null
          currency: string | null
          customer_id: string | null
          doc_num: number
          due_date: string | null
          grand_total: number | null
          is_active: boolean | null
          note: string | null
          project_name: number | null
          remark: string | null
          running: string | null
          status: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          attachment?: string | null
          created_date?: string | null
          credit_day?: number | null
          currency?: string | null
          customer_id?: string | null
          doc_num?: number
          due_date?: string | null
          grand_total?: number | null
          is_active?: boolean | null
          note?: string | null
          project_name?: number | null
          remark?: string | null
          running?: string | null
          status?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          attachment?: string | null
          created_date?: string | null
          credit_day?: number | null
          currency?: string | null
          customer_id?: string | null
          doc_num?: number
          due_date?: string | null
          grand_total?: number | null
          is_active?: boolean | null
          note?: string | null
          project_name?: number | null
          remark?: string | null
          running?: string | null
          status?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quotation_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotation_project_name_fkey"
            columns: ["project_name"]
            isOneToOne: false
            referencedRelation: "project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotation_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      "QuotationProduct ": {
        Row: {
          doc_num: number
          product_number: number
          quantity: number | null
        }
        Insert: {
          doc_num?: number
          product_number: number
          quantity?: number | null
        }
        Update: {
          doc_num?: number
          product_number?: number
          quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "QuotationProduct _doc_num_fkey"
            columns: ["doc_num"]
            isOneToOne: false
            referencedRelation: "quotation"
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_quotation_running: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      log_message_and_print: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
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
