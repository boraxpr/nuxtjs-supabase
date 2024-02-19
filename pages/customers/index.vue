<template>
    <div>
        <header>
            <div class="mb-4 grid h-20 grid-cols-2 gap-4">
              <div class="flex items-end">
                <div class="text-4xl font-semibold">Customers</div>
              </div>
              <div class="flex items-end justify-end"></div>
            </div>
        </header>
        <main>
            <div>
                <DataTable 
                  v-model:filters="customerList.filters"
                  paginator
                  :rows="10"
                  :value="customerList.db.custormers"
                  :loading="customerList.param.loading"
                  selectionMode="multiple"
                  paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                  currentPageReportTemplate="{first} - {last} of {totalRecords} projects"
                  stripedRows
                >
                    <div class="mb-4">
                        <div class="mb-5 flex items-center justify-between">
                            <div class="flex gap-5">
                                <div class="justify-content-end flex">
                                  <span class="p-input-icon-right">
                                    <InputText
                                      
                                      class="h-[54px] w-[404px] rounded-[25px] p-6"
                                      placeholder="Search by Tax ID, Name"
                                    />
                                    <i class="pi pi-search mr-2" />
                                  </span>
                                </div>
                            </div>
                            <div>
                              <NuxtLink :to="`/customers/create`">
                                <div
                                  class="flex h-[54px] w-[203px] items-center justify-center rounded-[20px] bg-[#F17121] text-xl text-white hover:bg-gray-200"
                                >
                                  + New Customer
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
                              :class="customerList.param.total ? 'active-btn' : 'inActive-btn'"
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
                              :class="customerList.param.active ? 'active-btn' : 'inActive-btn'"
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
                              :class="customerList.param.inActive ? 'active-btn' : 'inActive-btn'"
                              @click="changeStatusBtn(2)"
                            >
                              In Active
                            </button>
                          </div>
                        </div>
                    </div>
                    <Column>
                      <template #header>
                        <div class="flex w-full justify-center">Tax ID</div>
                      </template>
                      <template #body="customers">
                        {{ customers.data.tax_id }}
                      </template>
                    </Column>
                    <Column>
                      <template #header>
                        <div class="flex w-full justify-center">Customer Name</div>
                      </template>
                      <template #body="customers">
                        {{ customers.data.customer_name }}
                      </template>
                    </Column>
                    <Column>
                      <template #header>
                        <div class="flex w-full justify-center">Address</div>
                      </template>
                      <template #body="customers">
                        {{ customers.data.address }}
                      </template>
                    </Column>
                    <Column>
                      <template #header>
                        <div class="flex w-full justify-center">Contact</div>
                      </template>
                      <template #body="customers">
                        <div>
                          {{ customers.data.phone_number }}
                        </div>
                        <div>
                          {{ customers.data.email }}
                        </div>
                      </template>
                    </Column>
                    <Column>
                      <template #header>
                        <div class="flex w-full justify-center">Status</div>
                      </template>
                      <template #body="customers">
                        <div class="flex w-full justify-center">
                          <div
                            :class="customers.data.status ? 'inActive-btn' : 'active-btn'"
                            class="flex h-[35px] w-[111px] items-center justify-center rounded-[10px] border text-[12px]"
                          >
                            <span v-if="customers.data.status">Active</span>
                            <span v-else>In Active</span>
                          </div>
                        </div>
                      </template>
                    </Column>
                    <Column>
                      <template #header>
                        <div class="flex w-full justify-center">Latest Modifier</div>
                      </template>
                      <template #body="customers">
                        <div class="flex w-full justify-center">
                          <span v-if="customers.data.updated_by?.full_name">
                            <div class="flex w-full justify-center text-[#F17121]">
                              {{ customers.data.updated_by?.full_name }}
                            </div>
                            <div class="mt-2">
                              {{ formatDate(customers.data.updated_at) }}
                            </div>
                            <div>
                              {{ formatTime(customers.data.updated_at) }}
                            </div>
                          </span>
                          <span v-else>
                            <div class="flex w-full justify-center text-[#F17121]">
                              {{ customers.data.created_by?.full_name }}
                            </div>
                            <div class="mt-2">
                              {{ formatDate(customers.data.created_at) }}
                            </div>
                            <div>
                              {{ formatTime(customers.data.created_at) }}
                            </div>
                          </span>
                        </div>
                      </template>
                    </Column>
                    <Column>
                      <template #header>
                        <div class="flex w-full justify-center">Edit</div>
                      </template>
                      <template #body="customers">
                        <NuxtLink :to="`/customers/${customers.data.id}`">
                          <Button
                            icon="pi pi-pencil"
                            class="p-button-rounded p-button-text text-blue-400"
                          ></Button>
                        </NuxtLink>
                      </template>
                    </Column>
                </DataTable>
            </div>
        </main>
    </div>
</template>
<script setup>
import { FilterMatchMode } from "primevue/api";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const client = useSupabaseClient();

const customerList = reactive({
    db: {
        custormers: ref()
    },
    param: {
        loading: ref(true),
        total: ref(true),
        active: ref(false),
        inActive: ref(false)
    },
    filters: ref({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        status: { value: null, matchMode: FilterMatchMode.EQUALS }
    })
})

async function fetchCustomer() {
    const { data, error } = await client.from("customers").select("*,created_by:created_by(*), updated_by:updated_by(*)");
    // console.log(data);
    checkError("fetchCustomer",error)
    console.log(data)
    return data;
}
const { data: custormers } = await useLazyAsyncData(
  "customer",
  fetchCustomer
);

const changeStatusBtn = (value) => {
  if(value === ""){
    customerList.param.total = true
    customerList.param.active = false
    customerList.param.inActive = false
    customerList.filters.status.value = null
  }else if(value === 1){
    customerList.param.total = false
    customerList.param.active = true
    customerList.param.inActive = false
    customerList.filters.status.value = true
  }else if(value === 2){
    customerList.param.total = false
    customerList.param.active = false
    customerList.param.inActive = true
    customerList.filters.status.value = false
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

useHead({
  title: "Customers",
});

customerList.db.custormers = custormers
customerList.param.loading = false
</script>