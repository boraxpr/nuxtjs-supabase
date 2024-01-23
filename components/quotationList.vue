<template>
  <div>
    <DataTable :value="quotations" :show-gridlines="true">
      <Column field="doc_num" header="#"></Column>
      <Column field="created_date" header="Created Date"></Column>
      <Column field="customers.name" header="Customer Name"></Column>
      <Column field="status" header="Status"></Column>
      <Column field="project_name" header="Project"></Column>
      <Column field="grand_total" header="Grand Total">
        <template #body="slotProps">
          {{
            currencyFormat(slotProps.data.grand_total, slotProps.data.currency)
          }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
const { quotations } = defineProps(["quotations"]);
</script>
