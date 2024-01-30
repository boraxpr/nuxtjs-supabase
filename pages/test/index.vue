<template>
    <div>
      <h1>Quotations</h1>
      <form @submit.prevent="addQuotation">
        <input type="text" v-model="newQuotation.content" placeholder="Quotation content" />
        <button type="submit">Add Quotation</button>
      </form>
      <ul>
        <li v-for="quotation in quotations" :key="quotation.id">
          <span>{{ quotation.content }}</span>
          <button @click="updateQuotation(quotation.id, 'Updated content')">Update</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { insertQuotation, selectQuotations, updateQuotation } from '../../utils/quotationfunction';
  
  export default {
    data() {
      return {
        quotations: [],
        newQuotation: { content: '' }
      };
    },
    mounted() {
      this.fetchQuotations();
    },
    methods: {
      async fetchQuotations() {
        const data = await selectQuotations();
        if (data) {
          this.quotations = data;
        }
      },
      async addQuotation() {
        const insertedQuotation = await insertQuotation(this.newQuotation);
        if (insertedQuotation) {
          this.quotations.push(insertedQuotation);
          this.newQuotation = { content: '' };
        }
      },
      async updateQuotation(quotationId, updatedContent) {
        const updatedQuotation = await updateQuotation(quotationId, { content: updatedContent });
        if (updatedQuotation) {
          this.quotations = this.quotations.map(q => q.id === quotationId ? updatedQuotation : q);
        }
      }
    }
  };
  </script>
  