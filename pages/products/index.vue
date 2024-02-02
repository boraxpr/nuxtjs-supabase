<template>
  <div>
    <header>
      <div class="Container grid grid-cols-2 gap-4 mb-4 h-40">
        <div class="Container flex items-center">
          <div class="text-5xl">Product</div>
        </div>
        <div class="Container flex justify-end items-end">
          <Nuxt-link :to="`/products/create`">
            <div
              class="flex justify-center items-center border-2 w-32 h-10 hover:bg-gray-200 rounded-[16px]"
            >
              + Product
            </div>
          </Nuxt-link>
        </div>
      </div>
    </header>
    <main>
      <div>
        <DataTable
          v-model:filters="filters"
          :value="products"
          paginator
          :rows="5"
          :rowsPerPageOptions="[5, 10, 20, 50]"
          stripedRows
          tableStyle="min-width: 50rem"
          dataKey="id"
          :loading="loading"
          :globalFilterFields="[
            'product_name',
            'product_code',
            'product_type',
            'category',
            'main_unit',
            'barcode',
            'selling_price',
            'vat',
            'product_description',
            'income_account',
            'unit',
          ]"
        >
          <template #header>
            <div class="flex justify-content-end">
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Keyword Search"
                />
              </span>
            </div>
          </template>
          <template #empty> No customers found. </template>
          <template #loading> Loading customers data. Please wait. </template>
          <Column field="product_name" header="Product Name">
            <template #body="product">
              <Nuxt-link
                :to="`/products/${product.data.product_number}`"
                class="underline"
                >{{ product.data.product_name }}</Nuxt-link
              >
            </template>
          </Column>
          <Column field="product_code" header="Product Code">
            <template #body="product">
              <div class="text-center">
                {{ product.data.product_code }}
              </div>
            </template>
          </Column>
          <Column field="product_type" header="Product Type"></Column>
          <Column field="category" header="Category"></Column>
          <Column field="main_unit" header="Main Unit">
            <template #body="product">
              <div class="text-center">
                {{ product.data.main_unit }}
              </div>
            </template>
          </Column>
          <Column field="barcode" header="Barcode"></Column>
          <Column field="selling_price" header="Selling Price">
            <template #body="product">
              <div class="text-center">
                <!-- {{ currencyFormat(product.data.selling_price,"") }} -->
                {{ formatCurrency(product.data.selling_price) }}
                <!-- {{ product.data.selling_price }} -->
              </div>
            </template>
          </Column>
          <Column field="vat" header="Vat">
            <template #body="product">
              <div class="text-center">
                {{ product.data.vat }}
              </div>
            </template>
          </Column>
          <Column
            field="product_description"
            header="Product Description"
          ></Column>
          <Column field="income_account" header="Income Account"></Column>
          <Column field="unit" header="Unit"></Column>
        </DataTable>
      </div>
    </main>
  </div>
</template>

<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { FilterMatchMode } from "primevue/api";

const client = useSupabaseClient();
const products = ref([]);
const loading = ref(true);

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  product_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  product_code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  product_type: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  category: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  main_unit: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  barcode: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  selling_price: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  vat: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  product_description: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  income_account: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  unit: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});

async function fetchData() {
  const { data } = await client.from("product").select("*");
  products.value = data || [];
}
const formatCurrency = (value) => {
  return value.toLocaleString(undefined, { minimumFractionDigits: 2 });
};
useHead({
  title: "Dashboard",
});

onMounted(() => {
  fetchData();
  loading.value = false;
});
</script>

<style>
.p-column-header-content {
  white-space: nowrap;
  height: 56px;
}
.p-row-even {
  height: 56px;
}
.p-row-odd {
  height: 56px;
}
</style>
