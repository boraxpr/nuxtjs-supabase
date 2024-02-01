<template>
  <div>
    <header>
      <div class="Container grid grid-cols-2 gap-4 mb-4 h-40">
        <div class="Container flex items-center">
          <div class="text-3xl">Products</div>
        </div>
        <div class="Container flex justify-end items-end">
          
        </div>
      </div>
    </header>
    <main>
      <div>
        <DataTable v-model:filters="filters" :value="products" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" stripedRows tableStyle="min-width: 50rem"
        dataKey="id" :loading="loading" :globalFilterFields="['product_name', 'product_code', 'product_type', 'category', 'main_unit', 'barcode', 'selling_price', 'vat', 'product_description', 'income_account','unit']"
        paginatorTemplate="PrevPageLink CurrentPageReport NextPageLink "
        currentPageReportTemplate="{first} to {last} of {totalRecords}">
          <template #header>
            <div class="flex justify-between">
              <div class="flex gap-5">
                <div class="flex justify-content-end">
                    <span class="p-input-icon-right">
                        <InputText v-model="filters['global'].value" class="rounded-[25px] w-[404px] h-[54px] p-6" placeholder="Search by Name , Code , Barcode , ..." />
                        <i class="pi pi-search mr-2" />
                    </span>
                </div>
                <div>
                  <Dropdown v-model="filters['product_type_id'].value" optionValue="id" :options="productTypeDropdown" optionLabel="product_type_name" placeholder="Type" class="p-column-filter w-[184px] h-[54px] rounded-[25px] flex items-center text-center" style="min-width: 12rem" :showClear="true">
                      <template #option="slotProps">
                          <Tag :value="slotProps.option.product_type_name" />
                      </template>
                  </Dropdown>
                </div>
                <div>
                  <Dropdown v-model="filters['category_id'].value" optionValue="id" :options="categoryDropdown" optionLabel="category_name" placeholder="Category" class="p-column-filter w-[184px] h-[54px] rounded-[25px] flex items-center text-center" style="min-width: 12rem" :showClear="true">
                      <template #option="slotProps">
                          <Tag :value="slotProps.option.category_name" />
                      </template>
                  </Dropdown>
                </div>
              </div>
              <div>
                <Nuxt-link :to="`/products/create`">
                  <div class="flex justify-center items-center w-[203px] h-[54px] hover:bg-gray-200 rounded-[24px] bg-[#F17121] text-white text-xl">
                    + New Product
                  </div>
                </Nuxt-link>
              </div>
            </div>
            <div class="container w-full h-[58px] rounded-[20px] bg-[#F17121] mt-5 flex items-center">
              <button class="w-[151px] h-[42px] bg-white rounded-[15px] ml-4 font-bold text-lg">Total</button>
              <Divider layout="vertical" class="w-[1px] bg-white min-h-[20px]" />
              <button class="w-[151px] h-[42px] bg-white rounded-[15px] ml-4 font-bold text-lg">Active</button>
              <Divider layout="vertical" class="w-[1px] bg-white min-h-[20px]" />
              <button class="w-[151px] h-[42px] bg-white rounded-[15px] ml-4 font-bold text-lg">InActive</button>
            </div>
          </template>
          <template #empty> No customers found. </template>
          <template #loading> Loading customers data. Please wait. </template>
          <Column field="product_code" header="Product Code">
            <template #body="product">
                <div class="text-center">
                    {{ product.data.product_code }}
                </div>
            </template>
          </Column>
          <Column field="barcode" header="Barcode"></Column>
           <Column field="product_name" header="Product Name">
            <template #body="product">
              <Nuxt-link :to="`/products/${product.data.product_number}`" class="underline">{{
                product.data.product_name
              }}</Nuxt-link>
            </template>
          </Column>
          <Column field="productType" header="Product Type">
            <template #body="product">
                <div>
                    {{ product.data.productType?.product_type_name }}
                </div>
            </template>
          </Column>
          <Column field="category" header="Category">
            <template #body="product">
                <div>
                    {{ product.data.category?.category_name }}
                </div>
            </template>
          </Column>
          <Column field="selling_price">
            <template #header>
              <div class="flex justify-center w-full">
                <div>
                  Selling Price
                </div>
              </div>
            </template>
            <template #body="product">
                <div class="text-center">
                    {{ formatCurrency(product.data.selling_price) }}
                </div>
            </template>
          </Column>
          <Column field="unit" header="Unit"></Column>
          <!-- <Column field="main_unit" header="Main Unit">
            <template #body="product">
                <div class="text-center">
                    {{ product.data.main_unit }}
                </div>
            </template>
          </Column> -->
           <Column field="isActive" header="Status"></Column>
          <!-- <Column field="vat" header="Vat">
            <template #body="product">
                <div class="text-center">
                    {{ product.data.vat }}
                </div>
            </template>
          </Column>
          <Column field="product_description" header="Product Description"></Column>
          <Column field="income_account" header="Income Account"></Column> -->
          <column header="Latest Modifier"></column>
          <column header="Edit"></column>
        </DataTable>
      </div>
    </main>
  </div>
</template>

<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { FilterMatchMode } from 'primevue/api';

const client = useSupabaseClient();
const products = ref([]);
const loading = ref(true);
const productTypeDropdown = ref([]);
const categoryDropdown = ref([]);

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    product_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    product_code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    product_type_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    category_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    main_unit: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    barcode: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    selling_price: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    vat: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    product_description: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    income_account: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    unit: { value: null, matchMode: FilterMatchMode.STARTS_WITH }

});

async function fetchData() {
  const { data } = await client.from('product').select('*, productType(id,product_type_name), category(*)');
  products.value = data || [];
  // console.log("products.value ",products.value);
  // console.log("products.product_type_name ",products.value[0].productType.product_type_name);
}

async function fetchCategory() {
  const { data } = await client.from('category').select('*');
  categoryDropdown.value = data || [];
}

async function fetchProductType() {
  const { data } = await client.from('productType').select('*');
  productTypeDropdown.value = data || [];
}

const formatCurrency = (value) => {
    return value.toLocaleString(undefined, { minimumFractionDigits: 2 });
};
useHead({
  title: "Dashboard",
})

onMounted(() => {
  fetchData();
  fetchProductType();
  fetchCategory();
  loading.value = false;
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
