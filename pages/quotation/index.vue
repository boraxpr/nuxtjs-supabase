<script setup>
const { data } = await useFetch("/api/get/quotations");
useHead({
  title: "Dashboard",
})
</script>

<template>
  <QuotationList :quotations="data" />
</template>
