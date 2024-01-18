<script setup>
const client = useSupabaseClient();
import DataTable from "primevue/datatable";
import Column from "primevue/column";
const quotations = ref([]);
async function fetchData() {
  const { data } = await client.from("quotations").select("*");

  quotations.value = data || [];
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <DataTable :value="quotations" :show-gridlines="true">
    <Column field="doc_num" header="#"></Column>
    <Column field="created_date" header="Created Date"></Column>
    <Column field="status" header="Status"></Column>
    <Column field="project_name" header="Project"></Column>
  </DataTable>
</template>
