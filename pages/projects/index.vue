<template>
    <div>
        <header>
            <div class="Container grid grid-cols-2 gap-4 mb-4 h-40">
              <div class="Container flex items-center">
                <div class="text-3xl">Projects</div>
              </div>
              <div class="Container flex justify-end items-end">

              </div>
            </div>
        </header>
        <main>
            <div>
                <DataTable v-model:filters="filters" :value="projects" :globalFilterFields="['project_name']">
                    <div class="flex justify-between">
                        <div class="flex gap-5">
                            <div class="flex justify-content-end">
                                <span class="p-input-icon-right">
                                    <InputText v-model="filters['global'].value" class="rounded-[25px] w-[404px] h-[54px] p-6" placeholder="Search by Project Name" />
                                    <i class="pi pi-search mr-2" />
                                </span>
                            </div>
                            <div>
                                <Dropdown :options="customerDropdown" optionLabel="name" placeholder="Customer Name" class="p-column-filter w-[184px] h-[54px] rounded-[25px] flex items-center text-center" style="min-width: 12rem" :showClear="true">
                                    <template #option="slotProps">
                                        <Tag :value="slotProps.option.name" />
                                    </template>
                                </Dropdown>
                            </div>
                        </div>
                        <div>
                          <Nuxt-link :to="`/projects/create`">
                            <div class="flex justify-center items-center w-[203px] h-[54px] hover:bg-gray-200 rounded-[20px] bg-[#F17121] text-white text-xl">
                              + New Project
                            </div>
                          </Nuxt-link>
                        </div>
                    </div>
                    <Column>
                        <template #header>
                            No
                        </template>
                    </Column>
                    <Column>
                        <template #header>
                            Project Name
                        </template>
                        <template #body="projects">
                            {{ projects.data.project_name }}
                        </template>
                    </Column>
                    <Column>
                        <template #header>
                            Customer Name
                        </template>
                        <template #body="projects">
                            {{ projects.data.customers?.name }}
                        </template>
                    </Column>
                    <Column>
                        <template #header>
                            Project Detail
                        </template>
                        <template #body="projects">
                            {{ projects.data.detail }}
                        </template>
                    </Column>
                    <Column>
                        <template #header>
                            Status
                        </template>
                        <template  #body="projects">
                          <div class="flex justify-center w-full">
                            <div :class="projects.data.status ? 'inActive': 'active'" class="w-[111px] h-[35px] rounded-[10px] border flex justify-center items-center text-[12px]">
                              <span v-if="projects.data.status" >Active</span>
                              <span v-else >In Active</span>
                            </div>
                          </div>
                        </template>
                    </Column>
                    <Column>
                        <template #header>
                            Latest Modifier
                        </template>
                        <template #body="projects">
                          <div class="flex justify-center w-full">
                            <span v-if="projects.data.updated_by?.full_name">
                              <div class="flex justify-center w-full text-[#F17121]">
                                {{ projects.data.updated_by?.full_name }}
                              </div>
                              <div class="mt-2">
                                {{ formatDate(projects.data.updated_at) }}
                              </div>
                              <div>
                                {{ formatTime(projects.data.updated_at) }}
                              </div>
                            </span>
                            <span v-else>
                              <div class="flex justify-center w-full text-[#F17121]">
                                {{ projects.data.created_by?.full_name }}
                              </div>
                              <div class="mt-2">
                                {{ formatDate(projects.data.created_at) }}
                              </div>
                              <div>
                                {{ formatTime(projects.data.created_at) }}
                              </div>
                            </span>
                          </div>
                        </template>
                    </Column>
                    <Column>
                        <template #header>
                            Edit
                        </template>
                        <template #body="projects">
                          <Nuxt-link :to="`/projects/${projects.data.customer_id}`" class="underline">
                            <img src="/assets/img/edit.png" class="h-[27px]"/>
                          </Nuxt-link>
                        </template>
                    </Column>
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
const projects = ref([]);
const customerDropdown = ref([]);

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    project_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
});

async function fetchData() {
    const { data } = await client.from('project').select('*,customers(name),created_by:created_by(*), updated_by:updated_by(*)');
    projects.value = data || [];
    console.log("projects.value ", projects.value);
}

async function fetchCustomer() {
    const { data } = await client.from('customers').select('*');
    customerDropdown.value = data || [];
    console.log("customerDropdown.value ", customerDropdown.value);
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

onMounted(() => {
    fetchData();
    fetchCustomer();
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
</style>