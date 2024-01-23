<script setup>
const { data } = await useFetch("/api/get/quotations");
</script>

<template>
  <QuotationList :quotations="data" />
</template>
