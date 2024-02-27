<template>
  <DataTable
  :value="createQuotationFormData.userInputs.products"
  editMode="cell"
  :filters="filters"
  @cell-edit-complete="onCellEditComplete"
  class="add-product-table"
  :pt="{
    table: { style: 'min-width: 50rem' },
    column: {
      bodycell: ({ state }) => ({
        class: [{ 'pt-2 pb-2': state['d_editing'] }],
      }),
    },
  }"
  ><Column field="code" header="Code" style="width: 20%">
    <template #editor="{ data, field }">
      <InputText v-model="data[field]" />
    </template>
    <template #body="{ data, field }">
      <template v-if="data[field] === ''">
        <span class="border border-amber-700">{{ data[field] }}</span>
      </template>
      <template v-else>{{ data[field] }}</template>
    </template>
  </Column>
  <Column field="name" header="Name" style="width: 20%">
    <template #editor="{ data, field }">
      <InputText v-model="data[field]" />
    </template>
  </Column>
  <Column field="quantity" header="Quantity" style="width: 20%">
    <template #editor="{ data, field }">
      <InputText v-model="data[field]" />
    </template>
  </Column>
  <Column field="price" header="Price" style="width: 20%">
    <template #editor="{ data, field }">
      <template
        v-if="createQuotationFormData.userInputs.currency == null"
      >
        <InputNumber v-model="data[field]" />
      </template>
    </template>
  </Column>
  <Column :exportable="false" style="width: 5%">
    <template #body="slotProps">
      <Button
        icon="pi pi-trash"
        outlined
        rounded
        severity="danger"
        @click="deleteProduct(slotProps.data)"
      />
    </template>
  </Column>
  <!-- <Column
      v-for="col of columns"
      :key="col.field"
      :field="col.field"
      :header="col.header"
      style="width: 25%"
      ><template #body="{ data, field }">
        {{ data[field] }}
      </template>
      <template #editor="{ data, field }">
        <InputText v-model="data[field]" autofocus />
      </template>
    </Column> -->
</DataTable>
</template>

<script>

</script>

<style scoped>

</style>