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
        dataKey="id" :loading="loading" :globalFilterFields="['product_name', 'product_code', 'product_type', 'category', 'barcode', 'selling_price', 'vat', 'product_description', 'income_account','unit','isActive']"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink" 
        currentPageReportTemplate="{first} - {last} of {totalRecords} products" >
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
                  <div class="flex justify-center items-center w-[203px] h-[54px] hover:bg-gray-200 rounded-[20px] bg-[#F17121] text-white text-xl">
                    + New Product
                  </div>
                </Nuxt-link>
              </div>
            </div>
            <div class="w-full h-[58px] rounded-[20px] bg-[#F17121] mt-5 flex items-center">
              <div class="flex ml-4">
                <button class="w-[151px] h-[42px] bg-white rounded-[15px] text-lg" 
                :class="total ? 'active': 'inActive'" 
                @click="changeStatusBtn('')">
                  Total
                </button>
                <Divider layout="vertical" class="w-[1px] bg-white min-h-[20px]" />
                <button class="w-[151px] h-[42px] bg-white rounded-[15px] text-lg"
                :class="active ? 'active': 'inActive'" 
                @click="changeStatusBtn(1)">
                  Active
                </button>
                <Divider layout="vertical" class="w-[1px] bg-white min-h-[20px]" />
                <button class="w-[151px] h-[42px] bg-white rounded-[15px] text-lg"
                :class="inActive ? 'active': 'inActive'"
                @click="changeStatusBtn(2)">
                  In Active
                </button>
              </div>
            </div>
          </template>
          <template #empty> No customers found. </template>
          <template #loading> Loading customers data. Please wait. </template>
          <Column field="barcode">
            <template #header>
              <div class="flex justify-center w-full">
                Code/Barcode
              </div>
            </template>
            <template #body="product">
              <div class="flex justify-between">
                <div class="flex items-center">
                  <img :src="product.data.linkImg" alt="" class="h-48">
                </div>
                <div class="flex items-center">
                  {{ product.data.barcode }}
                </div>
              </div>
            </template>
          </Column>
          <Column field="product_name">
            <template #header>
              <div class="flex justify-center w-full">
                Product
              </div>
            </template>
            <template #body="product">
              <div class="flex justify-between">
                <div class="flex items-center">
                  {{ product.data.product_name }}
                </div>
                <div>
                  <div class="text-end">
                    {{ product.data.productType?.product_type_name }}
                  </div>
                  <div class="text-end">
                    {{ product.data.category?.category_name }}
                  </div>
                </div>
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
          <Column field="unit">
            <template #header>
              <div class="flex justify-center w-full">
                <div>
                  Unit
                </div>
              </div>
            </template>
            <template #body="product">
                <div class="text-center">
                    {{ product.data.unit }}
                </div>
            </template>
          </Column>
           <Column>
            <template #header>
              <div class="flex justify-center w-full">
                <div>
                  Status
                </div>
              </div>
            </template>
            <template  #body="product">
              <div class="flex justify-center w-full">
                <div :class="product.data.status ? 'inActive': 'active'" class="w-[111px] h-[35px] rounded-[10px] border flex justify-center items-center text-[12px]">
                  <span v-if="product.data.status" >Active</span>
                  <span v-else >In Active</span>
                </div>
              </div>
            </template>
           </Column>
          <column>
            <template #header>
              <div class="flex justify-center w-full">
                Latest Modifier
              </div>
            </template>
            <template #body="product">
              <div class="flex justify-center w-full">
                <span v-if="product.data.updated_by?.full_name">
                  <div class="flex justify-center w-full">
                    {{ product.data.updated_by?.full_name }}
                  </div>
                  <div class="mt-2">
                    {{ formatDate(product.data.updated_at) }}
                  </div>
                  <div>
                    {{ formatTime(product.data.updated_at) }}
                  </div>
                </span>
                <span v-else>
                  <div class="flex justify-center w-full">
                    {{ product.data.created_by?.full_name }}
                  </div>
                  <div class="mt-2">
                    {{ formatDate(product.data.created_at) }}
                  </div>
                  <div>
                    {{ formatTime(product.data.created_at) }}
                  </div>
                </span>
              </div>
            </template>
          </column>
          <column header="Edit">
            <template #body="product">
              <Nuxt-link :to="`/products/${product.data.product_number}`" class="underline">
                <img src="/assets/img/edit.png" class="h-[27px]"/>
              </Nuxt-link>
            </template>
          </column>
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
const total = ref(true);
const active = ref(false);
const inActive = ref(false);

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
    unit: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    status: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const changeStatusBtn = (value) => {
  if(value === ""){
    total.value = true
    active.value = false
    inActive.value = false
    filters.value.status.value = null
  }else if(value === 1){
    total.value = false
    active.value = true
    inActive.value = false
    filters.value.status.value = true
  }else if(value === 2){
    total.value = false
    active.value = false
    inActive.value = true
    filters.value.status.value = false
  }
}

function formatDate(date) {
  let d = new Date(date);
  let month, day, year

  month = '' + (d.getMonth() + 1);
  day = '' + d.getDate();
  year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;
  return [day, month, year].join('/');
}

function formatTime(date) {
  let d = new Date(date);
  let hour, min, sec
  hour = d.getHours();
  min = '' + d.getMinutes();
  sec = '' + d.getSeconds();

  if (hour.length < 2) 
      hour = '0' + hour;
  if (min.length < 2) 
      min = '0' + min;
  if (sec.length < 2) 
      sec = '0' + sec;
  return [hour, min, sec].join(' : ');
}

async function fetchData() {
  const { data } = await client.from('product').select('*, productType(id,product_type_name), category(*), created_by:created_by(*), updated_by:updated_by(*)');
  products.value = data || [];
  console.log("products.value ",products.value);

  for(let i in products.value){
    if(products.value[i].product_img !== ''){
      let link = await getLinkImg(products.value[i].product_img);
      products.value[i].linkImg = link;
    }
  }
}

async function fetchCategory() {
  const { data } = await client.from('category').select('*');
  categoryDropdown.value = data || [];
}

async function fetchProductType() {
  const { data } = await client.from('productType').select('*');
  productTypeDropdown.value = data || [];
}

const getLinkImg = async (path) => {
    const { data, error } = await client
    .storage
    .from('product')
    .createSignedUrl(path, 600)
    return data.signedUrl;
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

.active {
  background-color: white;
  color: black;
}
.inActive{
  background-color: #F17121;
  color: white;
}
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
.p-paginator-current{
  margin-right: auto;
}
.p-datatable .p-datatable-header{
  background-color: white;
}
</style>
