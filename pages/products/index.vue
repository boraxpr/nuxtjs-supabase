<template>
  <div>
    <header>
      <div class="Container mb-4 grid h-20 grid-cols-2 gap-4">
        <div class="Container flex items-end">
          <div class="text-4xl font-semibold">Products</div>
        </div>
        <div class="Container flex items-end justify-end"></div>
      </div>
    </header>
    <main>
      <div>
        <DataTable
          v-model:filters="productList.filters"
          :value="productList.db.products"
          paginator
          :rows="10"
          stripedRows
          selectionMode="multiple"
          tableStyle="min-width: 50rem"
          dataKey="id"
          :loading="productList.param.loading"
          :globalFilterFields="[
            'product_name',
            'product_code',
            'productType.product_type_name',
            'category.category_name',
            'barcode',
            'selling_price',
            'vat',
            'product_description',
            'income_account',
            'unit',
          ]"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
          currentPageReportTemplate="{first} - {last} of {totalRecords} products"
        >
          <div class="mb-4">
            <div class="flex justify-between">
              <div class="flex gap-5">
                <div class="justify-content-end flex">
                  <span class="p-input-icon-right">
                    <InputText
                      v-model="productList.filters.global.value"
                      class="h-[54px] w-[404px] rounded-[25px] p-6"
                      placeholder="Search by Name , Code , Barcode , ..."
                    />
                    <i class="pi pi-search mr-2" />
                  </span>
                </div>
                <div>
                  <MultiSelect
                    v-model="productList.filters.product_type_id.value"
                    display="chip"
                    optionValue="id"
                    :options="productList.db.productTypeDropdown"
                    optionLabel="product_type_name"
                    placeholder="Type"
                    class="p-column-filter flex h-[54px] w-[184px] items-center rounded-[25px] text-center"
                    style="min-width: 14rem"
                    :maxSelectedLabels="2"
                  >
                    <template #option="slotProps">
                      <div class="align-items-center flex gap-2">
                        <span>{{ slotProps.option.product_type_name }}</span>
                      </div>
                    </template>
                  </MultiSelect>
                </div>
                <div>
                  <MultiSelect
                    v-model="productList.filters.category_id.value"
                    display="chip"
                    optionValue="id"
                    :options="productList.db.categoryDropdown"
                    optionLabel="category_name"
                    placeholder="Category"
                    class="p-column-filter flex h-[54px] w-[184px] items-center rounded-[25px] text-center"
                    style="min-width: 14rem"
                    :maxSelectedLabels="2"
                  >
                    <template #option="slotProps">
                      <div class="align-items-center flex gap-2">
                        <span>{{ slotProps.option.category_name }}</span>
                      </div>
                    </template>
                  </MultiSelect>
                </div>
              </div>
              <div>
                <NuxtLink :to="`/products/create`">
                  <div
                    class="flex h-[54px] w-[203px] items-center justify-center rounded-[20px] bg-[#F17121] text-xl text-white hover:bg-gray-200"
                  >
                    + New Product
                  </div>
                </NuxtLink>
              </div>
            </div>
            <div
              class="mt-5 flex h-[58px] w-full items-center rounded-[20px] bg-[#F17121]"
            >
              <div class="ml-4 flex">
                <button
                  class="h-[42px] w-[151px] rounded-[15px] bg-white text-lg"
                  :class="
                    productList.param.total ? 'active-btn' : 'inActive-btn'
                  "
                  @click="changeStatusBtn('')"
                >
                  Total
                </button>
                <Divider
                  layout="vertical"
                  class="min-h-[20px] w-[1px] bg-white"
                />
                <button
                  class="h-[42px] w-[151px] rounded-[15px] bg-white text-lg"
                  :class="
                    productList.param.active ? 'active-btn' : 'inActive-btn'
                  "
                  @click="changeStatusBtn(1)"
                >
                  Active
                </button>
                <Divider
                  layout="vertical"
                  class="min-h-[20px] w-[1px] bg-white"
                />
                <button
                  class="h-[42px] w-[151px] rounded-[15px] bg-white text-lg"
                  :class="
                    productList.param.inActive ? 'active-btn' : 'inActive-btn'
                  "
                  @click="changeStatusBtn(2)"
                >
                  In Active
                </button>
              </div>
            </div>
          </div>
          <template #empty> No customers found. </template>
          <template #loading> Loading customers data. Please wait. </template>
          <Column field="barcode">
            <template #header>
              <div class="flex w-full justify-center">Code/Barcode</div>
            </template>
            <template #body="product">
              <div class="grid grid-cols-2 justify-between">
                <div class="flex items-center">
                  <NuxtImg
                    :src="getLinkImg(product.data.product_img)"
                    alt=""
                    class="h-14 max-h-24 object-cover"
                    loading="lazy"
                  />
                </div>
                <div
                  class="flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  {{ product.data.barcode }}
                </div>
              </div>
            </template>
          </Column>
          <Column field="product_name" class="w-1/4">
            <template #header>
              <div class="flex w-full justify-center">Product</div>
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
              <div class="flex w-full justify-center">
                <div>Selling Price</div>
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
              <div class="flex w-full justify-center">
                <div>Unit</div>
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
              <div class="flex w-full justify-center">
                <div>Status</div>
              </div>
            </template>
            <template #body="product">
              <div class="flex w-full justify-center">
                <div
                  :class="product.data.status ? 'inActive-btn' : 'active-btn'"
                  class="flex h-[35px] w-[111px] items-center justify-center rounded-[10px] border text-[12px]"
                >
                  <span v-if="product.data.status">Active</span>
                  <span v-else>In Active</span>
                </div>
              </div>
            </template>
          </Column>
          <column>
            <template #header>
              <div class="flex w-full justify-center">Latest Modifier</div>
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
              <NuxtLink
                :to="`/products/${product.data.product_number}`"
                class="underline"
              >
                <img src="/assets/img/edit.png" class="h-[27px]" />
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
    categoryDropdown: ref([]),
  },
  param: {
    loading: ref(true),
    total: ref(true),
    active: ref(false),
    inActive: ref(false),
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
    product_description: {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    income_account: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    unit: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    test: { value: null, matchMode: FilterMatchMode.EQUALS },
  }),
});

const changeStatusBtn = (value) => {
  if (value === "") {
    productList.param.total = true;
    productList.param.active = false;
    productList.param.inActive = false;
    productList.filters.status.value = null;
  } else if (value === 1) {
    productList.param.total = false;
    productList.param.active = true;
    productList.param.inActive = false;
    productList.filters.status.value = true;
  } else if (value === 2) {
    productList.param.total = false;
    productList.param.active = false;
    productList.param.inActive = true;
    productList.filters.status.value = false;
  }
};

function formatDate(date) {
  let d = new Date(date);
  let month, day, year;

  month = "" + (d.getMonth() + 1);
  day = "" + d.getDate();
  year = d.getFullYear();

  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }
  return [day, month, year].join("/");
}
function formatTime(date) {
  let d = new Date(date);
  let hour, min, sec;

  hour = "" + d.getHours();
  min = "" + d.getMinutes();
  sec = "" + d.getSeconds();

  if (hour.length < 2) {
    hour = "0" + hour;
  }
  if (min.length < 2) {
    min = "0" + min;
  }
  if (sec.length < 2) {
    sec = "0" + sec;
  }
  return [hour, min, sec].join(" : ");
}
const formatCurrency = (value) => {
  if (value !== null) {
    return value.toLocaleString(undefined, { minimumFractionDigits: 2 });
  }
};

const fetchProduct = async () => {
  const { data, error } = await client
    .from("product")
    .select(
      "*, productType(id,product_type_name), category(*), created_by:created_by(*), updated_by:updated_by(*)",
    );

  let product = data;
  checkError("fetchProduct", error);
  // if(error){
  //   console.log("error:product ",error);
  // }
  return product;
};

const getLinkImg = (path) => {
  const { data, error } = client.storage.from("product").getPublicUrl(path);

  checkError("getLinkImg", error);
  // if(error){
  //   console.log("error:getLinkImg ",error);
  // }
  return data.publicUrl;
};

const { data: productData } = await useLazyAsyncData("product", fetchProduct);

async function fetchCategory() {
  const { data, error } = await client.from("category").select("*");

  checkError("fetchCategory", error);
  return data;
}

const { data: categoryDropdownData } = await useLazyAsyncData(
  "category",
  fetchCategory,
);

async function fetchProductType() {
  const { data, error } = await client.from("productType").select("*");

  checkError("fetchProductType", error);
  return data;
}

const { data: productTypeDropdown } = await useLazyAsyncData(
  "productType",
  fetchProductType,
);
useHead({
  title: "Products",
});

const checkError = (funcName, error) => {
  if (error) {
    console.log("error ", funcName, ": ", error);
  }
};

productList.db.products = productData;
productList.db.productTypeDropdown = productTypeDropdown;
productList.db.categoryDropdown = categoryDropdownData;
productList.param.loading = false;
</script>

<style scoped>
.active-btn {
  background-color: white;
  color: black;
}
.inActive-btn {
  background-color: #f17121;
  color: white;
}
.p-column-header-content {
  white-space: nowrap;
}
.p-paginator-current {
  margin-right: auto;
}
.p-datatable .p-datatable-header {
  background-color: white;
}
</style>
