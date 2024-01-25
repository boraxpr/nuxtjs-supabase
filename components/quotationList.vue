<template>
  <div class="card">
    <DataTable
      :value="quotations"
      showGridlines
      stripedRows
      selectionMode="single"
    >
      <Column field="doc_num" header="Doc Num"></Column>
      <!-- <Column field="created_date" header="Created Date"></Column> -->
      <!-- <Column field="customers.name" header="Customer Name"></Column> -->
      <!-- <Column field="status" header="Status"></Column> -->
      <!-- <Column field="project_name" header="Project"></Column> -->
      <!-- <Column field="grand_total" header="Grand Total"> -->
      <!-- <template #body="slotProps">
          {{
            currencyFormat(slotProps.data.grand_total, slotProps.data.currency)
          }}
        </template> -->
      <!-- </Column> -->
    </DataTable>
  </div>
</template>

<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup"; // optional
import Row from "primevue/row"; // optional

const { quotations } = defineProps(["quotations"]);
</script>
