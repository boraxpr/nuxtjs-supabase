<script setup>
const { data } = await useFetch("/api/get/quotations");
import { useHead } from 'vue/head';
useHead({
  title: "Dashboard",
})
</script>

<template>
  <QuotationList :quotations="data" />
</template>
