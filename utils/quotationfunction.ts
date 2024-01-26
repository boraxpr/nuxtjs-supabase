// quotationService.ts

import { createClient } from '@supabase/supabase-js';

// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

// Get Supabase URL and Key from environment variables
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL!, SUPABASE_KEY!);

// Function to insert a new quotation
async function insertQuotation(quotationData: any) {
    const { data, error } = await supabase
        .from('quotations')
        .insert([quotationData]);

    if (error) {
        console.error('Error inserting quotation:', error.message);
        return null;
    }

    return data ? data[0] : null;
}

// Function to retrieve all quotations
async function selectQuotations() {
    const { data, error } = await supabase
        .from('quotations')
        .select('*');

    if (error) {
        console.error('Error selecting quotations:', error.message);
        return null;
    }

    return data;
}

// Function to update an existing quotation
async function updateQuotation(quotationId: number, updatedData: any) {
    const { data, error } = await supabase
        .from('quotations')
        .update(updatedData)
        .eq('id', quotationId);

    if (error) {
        console.error('Error updating quotation:', error.message);
        return null;
    }

    return data ? data[0] : null;
}

export { insertQuotation, selectQuotations, updateQuotation };
