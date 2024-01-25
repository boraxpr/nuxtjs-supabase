<template>
  <div>
    <header>
      <div class="Container grid grid-cols-2 gap-4 mb-4 h-40">
        <div class="Container flex items-center">
          <div class="text-5xl">Product</div>
        </div>
        <div class="Container flex justify-end items-end">
          <Nuxt-link :to="`/products/create`">
            <div class="flex justify-center items-center border-2 w-32 h-10 hover:bg-gray-200 rounded-[16px]">
              + Product
            </div>
          </Nuxt-link>
        </div>
      </div>
    </header>
    <main>
      <div>
        <DataTable :value="products" tableStyle="min-width: 50rem">
          <Column field="product_name" header="Product Name">
            <template #body="product">
              <Nuxt-link :to="`/products/${product.data.product_number}`" class="underline">{{
                product.data.product_name
              }}</Nuxt-link>
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
          <Column field="product_description" header="Product Description"></Column>
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

const client = useSupabaseClient();
const products = ref([]);
async function fetchData() {
  const { data } = await client.from("product").select("*");
  products.value = data || [];
}
const formatCurrency = (value) => {
    return value.toLocaleString(undefined, { minimumFractionDigits: 2 });
};
useHead({
  title: "Dashboard",
})

onMounted(() => {
  fetchData();
});
</script>

<style>
.p-column-header-content{
    white-space: nowrap;
    height: 56px;
}
.p-row-even{
    height: 56px;
}
.p-row-odd{
    height: 56px;
}
</style>
