<template>
  <div>
    <header>
      <div class="Container grid grid-cols-2 gap-4 mb-4 h-20">
        <div class="Container flex items-end">
          <div class="text-4xl font-semibold">Products</div>
        </div>
        <div class="Container flex justify-end items-end">
        </div>
      </div>
    </header>
    <main>
      <div>
        <DataTable v-model:filters="productList.filters" :value="productList.db.products" paginator :rows="10" stripedRows tableStyle="min-width: 50rem"
        dataKey="id" :loading="productList.param.loading" :globalFilterFields="['product_name', 'product_code', 'productType.product_type_name', 'category.category_name', 'barcode', 'selling_price', 'vat', 'product_description', 'income_account','unit']"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink" 
        currentPageReportTemplate="{first} - {last} of {totalRecords} products">
        <div class="mb-4">
            <div class="flex justify-between">
              <div class="flex gap-5">
                <div class="flex justify-content-end">
                    <span class="p-input-icon-right">
                        <InputText v-model="productList.filters.global.value" class="rounded-[25px] w-[404px] h-[54px] p-6" placeholder="Search by Name , Code , Barcode , ..." />
                        <i class="pi pi-search mr-2" />
                    </span>
                </div>
                <div>
                  <MultiSelect v-model="productList.filters.product_type_id.value" display="chip" optionValue="id" :options="productList.db.productTypeDropdown" optionLabel="product_type_name" placeholder="Type" class="p-column-filter w-[184px] h-[54px] rounded-[25px] flex items-center text-center" style="min-width: 14rem" :maxSelectedLabels="2">
                      <template #option="slotProps">
                          <div class="flex align-items-center gap-2">
                              <span>{{ slotProps.option.product_type_name }}</span>
                          </div>
                      </template>
                  </MultiSelect>
                </div>
                <div>
                  <MultiSelect v-model="productList.filters.category_id.value" display="chip" optionValue="id" :options="productList.db.categoryDropdown" optionLabel="category_name" placeholder="Category" class="p-column-filter w-[184px] h-[54px] rounded-[25px] flex items-center text-center" style="min-width: 14rem" :maxSelectedLabels="2">
                      <template #option="slotProps">
                          <div class="flex align-items-center gap-2">
                              <span>{{ slotProps.option.category_name }}</span>
                          </div>
                      </template>
                  </MultiSelect>
                </div>
              </div>
              <div>
                <NuxtLink :to="`/products/create`">
                  <div class="flex justify-center items-center w-[203px] h-[54px] hover:bg-gray-200 rounded-[20px] bg-[#F17121] text-white text-xl">
                    + New Product
                  </div>
                </NuxtLink>
              </div>
            </div>
            <div class="w-full h-[58px] rounded-[20px] bg-[#F17121] mt-5 flex items-center">
              <div class="flex ml-4">
                <button class="w-[151px] h-[42px] bg-white rounded-[15px] text-lg" 
                :class="productList.param.total ? 'active-btn': 'inActive-btn'" 
                @click="changeStatusBtn('')">
                  Total
                </button>
                <Divider layout="vertical" class="w-[1px] bg-white min-h-[20px]" />
                <button class="w-[151px] h-[42px] bg-white rounded-[15px] text-lg"
                :class="productList.param.active ? 'active-btn': 'inActive-btn'" 
                @click="changeStatusBtn(1)">
                  Active
                </button>
                <Divider layout="vertical" class="w-[1px] bg-white min-h-[20px]" />
                <button class="w-[151px] h-[42px] bg-white rounded-[15px] text-lg"
                :class="productList.param.inActive ? 'active-btn': 'inActive-btn'"
                @click="changeStatusBtn(2)">
                  In Active
                </button>
              </div>
            </div>
          </div>
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
                  <NuxtImg :src="getLinkImg(product.data.product_img)" alt="" class="max-h-24 h-auto" loading="lazy"/>
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
                <div :class="product.data.status ? 'inActive-btn': 'active-btn'" class="w-[111px] h-[35px] rounded-[10px] border flex justify-center items-center text-[12px]">
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
              <div class="flex w-full">
                <span v-if="product.data.updated_by?.full_name">
                  <div class="flex w-full text-[#F17121]">
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
                  <div class="flex w-full text-[#F17121]">
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
              <NuxtLink :to="`/products/${product.data.product_number}`" class="underline">
                <img src="/assets/img/edit.png" class="h-[27px]"/>
              </NuxtLink>
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
import { FilterMatchMode } from "primevue/api";

const client = useSupabaseClient();
const productList = reactive({
  db: {
    products: ref(),
    productTypeDropdown: ref([]),
    categoryDropdown: ref([])
  },
  param: {
    loading: ref(true),
    total: ref(true),
    active: ref(false),
    inActive: ref(false)
  },
  filters: ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    product_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    product_code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    product_type_id: { value: null, matchMode: FilterMatchMode.IN },
    category_id: { value: null, matchMode: FilterMatchMode.IN },
    main_unit: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    barcode: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    selling_price: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    vat: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    product_description: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    income_account: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    unit: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    test:{ value: null, matchMode: FilterMatchMode.EQUALS }
  })
});

const changeStatusBtn = (value) => {
  if(value === ""){
    productList.param.total = true
    productList.param.active = false
    productList.param.inActive = false
    productList.filters.status.value = null
  }else if(value === 1){
    productList.param.total = false
    productList.param.active = true
    productList.param.inActive = false
    productList.filters.status.value = true
  }else if(value === 2){
    productList.param.total= false
    productList.param.active = false
    productList.param.inActive = true
    productList.filters.status.value = false
  }
}

function formatDate(date) {
  let d = new Date(date);
  let month, day, year

  month = '' + (d.getMonth() + 1);
  day = '' + d.getDate();
  year = d.getFullYear();

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }
  return [day, month, year].join('/');
}
function formatTime(date) {
  let d = new Date(date);
  let hour, min, sec

  hour = ''+d.getHours();
  min = '' + d.getMinutes();
  sec = '' + d.getSeconds();

  if (hour.length < 2) {
    hour = '0' + hour;
  }
  if (min.length < 2) {
    min = '0' + min;
  }
  if (sec.length < 2) {
    sec = '0' + sec;
  }
  return [hour, min, sec].join(' : ');
}
const formatCurrency = (value) => {
  if(value !== null){
    return value.toLocaleString(undefined, { minimumFractionDigits: 2 });
  }
};

const fetchProduct = async () => {
  const { data, error } = await client
    .from("product")
    .select('*, productType(id,product_type_name), category(*), created_by:created_by(*), updated_by:updated_by(*)');
    let product = data;
  if(error){
    console.log("error:product ",error);
  }
  return product;
};

const getLinkImg = (path) =>{
  const { data, error } = client.storage.from('product').getPublicUrl(path);
  if(error){
    console.log("error:getLinkImg ",error);
  }
  return data.publicUrl;
}

const { data: productData } = await useLazyAsyncData(
  "product",
  fetchProduct
);

async function fetchCategory() {
  const { data } = await client.from('category').select('*');
  return data;
}

const { data: categoryDropdownData } = await useLazyAsyncData(
  "category",
  fetchCategory
);

async function fetchProductType() {
  const { data } = await client.from('productType').select('*');
  return data;
}

const { data: productTypeDropdown } = await useLazyAsyncData(
  "productType",
  fetchProductType
);
useHead({
  title: "Products",
});

productList.db.products = productData;
productList.db.productTypeDropdown = productTypeDropdown;
productList.db.categoryDropdown = categoryDropdownData;
productList.param.loading = false
  
</script>

<style>

.active-btn {
  background-color: white;
  color: black;
}
.inActive-btn {
  background-color: #F17121;
  color: white;
}
.p-column-header-content{
    white-space: nowrap;
}
.p-paginator-current{
  margin-right: auto;
}
.p-datatable .p-datatable-header{
  background-color: white;
}
</style>
