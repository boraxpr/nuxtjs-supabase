<script setup>
const { data } = await useFetch("/api/get/quotations");
useHead({
  title: "Quotation - List",
});
</script>

<template>
  <QuotationList :quotations="data" />
</template>
