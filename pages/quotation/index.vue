<script setup>
const { data } = await useFetch("/api/get/quotations");
useHead({
  title: "Quotation - List",
});
</script>

<template>
  <header>
    <div class="Container grid grid-cols-2 gap-4 mb-4 h-40">
      <div class="Container flex items-center">
        <div class="text-5xl">Quotations</div>
      </div>
      <div class="Container flex justify-end items-end">
        <Button
          label="Create"
          rounded
          outlined
          class="ml-auto"
          :onclick="() => navigateTo('/quotation/create')"
        ></Button>
      </div>
    </div>
  </header>
  <div class="space-y-5 flex flex-col">
    <div>
      <QuotationList :quotations="data" />
    </div>
  </div>
</template>
