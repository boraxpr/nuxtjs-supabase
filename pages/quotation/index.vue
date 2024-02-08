<script setup>
const { data } = await useFetch("/api/get/quotation");
useHead({
  title: "Quotation - List",
});
</script>

<template>
  <header>
    <div class="Container mb-4 grid h-40 grid-cols-2 gap-4">
      <div class="Container flex items-center">
        <div class="text-5xl">Quotations</div>
      </div>
      <div class="Container flex items-end justify-end">
        <NuxtLink to="/quotation/create">
          <Button label="Create" rounded outlined class="ml-auto"></Button>
        </NuxtLink>
      </div>
    </div>
  </header>
  <div class="flex flex-col space-y-5">
    <div>
      <QuotationList :quotations="data" />
    </div>
  </div>
</template>
