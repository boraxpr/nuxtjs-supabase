<script setup>
const client = useSupabaseClient();
import DataTable from "primevue/datatable";
import Column from "primevue/column";
const quotations = ref([]);
async function fetchData() {
  const { data } = await client.from("quotations").select(` 
      doc_num,
      created_date,
      status,
      currency,
      project_name,
      grand_total,
      customers(id, name),
      due_date
      `);

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
    <Column field="customers.name" header="Customer Name"></Column>
    <Column field="status" header="Status"></Column>
    <Column field="project_name" header="Project"></Column>
    <Column field="grand_total" header="Grand Total">
      <template #body="slotProps">
        {{
          new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: slotProps.data.currency,
            //minimumFractionDigits: 2,
          }).format(slotProps.data.grand_total)
        }}
      </template>
    </Column>
  </DataTable>
</template>
