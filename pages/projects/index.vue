<template>
  <div>
    <header>
      <div class="mb-4 grid h-20 grid-cols-2 gap-4">
        <div class="flex items-end">
          <div class="text-4xl font-semibold">Projects</div>
        </div>
        <div class="flex items-end justify-end"></div>
      </div>
    </header>
    <main>
      <div>
        <DataTable
          v-model:filters="projectList.filters"
          paginator
          :rows="10"
          :value="projectList.db.projects"
          :loading="projectList.param.loading"
          :globalFilterFields="['project_name', 'detail']"
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
                      v-model="projectList.filters.global.value"
                      class="h-[54px] w-[404px] rounded-[25px] p-6"
                      placeholder="Search by Project Name"
                    />
                    <i class="pi pi-search mr-2" />
                  </span>
                </div>
                <div>
                  <MultiSelect
                    v-model="projectList.filters.customer_id.value"
                    display="chip"
                    :maxSelectedLabels="2"
                    optionValue="id"
                    :options="projectList.db.customerDropdown"
                    optionLabel="name"
                    placeholder="Customer Name"
                    class="p-column-filter flex h-[54px] w-[184px] items-center rounded-[25px] text-center"
                    style="min-width: 14rem"
                  >
                    <template #option="slotProps">
                      <div class="align-items-center flex gap-2">
                        <span>{{ slotProps.option.name }}</span>
                      </div>
                    </template>
                  </MultiSelect>
                </div>
              </div>
              <div>
                <NuxtLink :to="`/projects/create`">
                  <div
                    class="flex h-[54px] w-[203px] items-center justify-center rounded-[20px] bg-[#F17121] text-xl text-white hover:bg-gray-200"
                  >
                    + New Project
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
                  :class="projectList.param.total ? 'active-btn' : 'inActive-btn'"
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
                  :class="projectList.param.active ? 'active-btn' : 'inActive-btn'"
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
                  :class="projectList.param.inActive ? 'active-btn' : 'inActive-btn'"
                  @click="changeStatusBtn(2)"
                >
                  In Active
                </button>
              </div>
            </div>
          </div>
          <Column>
            <template #header> No </template>
          </Column>
          <Column>
            <template #header>
              <div class="flex w-full justify-center">Project Name</div>
            </template>
            <template #body="projects">
              {{ projects.data.project_name }}
            </template>
          </Column>
          <Column>
            <template #header>
              <div class="flex w-full justify-center">Customer Name</div>
            </template>
            <template #body="projects">
              {{ projects.data.customers?.customer_name }}
            </template>
          </Column>
          <Column>
            <template #header>
              <div class="flex w-full justify-center">Project Detail</div>
            </template>
            <template #body="projects">
              {{ projects.data.detail }}
            </template>
          </Column>
          <Column>
            <template #header>
              <div class="flex w-full justify-center">Status</div>
            </template>
            <template #body="projects">
              <div class="flex w-full justify-center">
                <div
                  :class="projects.data.status ? 'inActive-btn' : 'active-btn'"
                  class="flex h-[35px] w-[111px] items-center justify-center rounded-[10px] border text-[12px]"
                >
                  <span v-if="projects.data.status">Active</span>
                  <span v-else>In Active</span>
                </div>
              </div>
            </template>
          </Column>
          <Column>
            <template #header>
              <div class="flex w-full justify-center">Latest Modifier</div>
            </template>
            <template #body="projects">
              <div class="flex w-full justify-center">
                <span v-if="projects.data.updated_by?.full_name">
                  <div class="flex w-full justify-center text-[#F17121]">
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
                  <div class="flex w-full justify-center text-[#F17121]">
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
            <template #header> Edit </template>
            <template #body="projects">
              <NuxtLink :to="`/projects/${projects.data.id}`">
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

const client = useSupabaseClient();

const projectList = reactive({
  db: {
    projects: ref(),
    customerDropdown: ref()
  },
  param: {
    loading: ref(true),
    total: ref(true),
    active: ref(false),
    inActive: ref(false)
  },
  filters: ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    project_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    customer_id: { value: null, matchMode: FilterMatchMode.IN },
    status: { value: null, matchMode: FilterMatchMode.EQUALS }
  })
});

async function fetchProject() {
    const { data, error } = await client.from('project').select('*,customers(id,customer_name),created_by:created_by(*), updated_by:updated_by(*)');
    checkError("fetchProject",error)
    return data;
}

const { data: projectData } = await useLazyAsyncData(
  "project",
  fetchProject
);

async function fetchCustomer() {
    const { data, error } = await client.from('customers').select('*');
    checkError("fetchCustomer",error)
    return data;
}
const { data: customerDropdown } = await useLazyAsyncData(
  "customer",
  fetchCustomer
);

const changeStatusBtn = (value) => {
  if(value === ""){
    projectList.param.total = true
    projectList.param.active = false
    projectList.param.inActive = false
    projectList.filters.status.value = null
  }else if(value === 1){
    projectList.param.total = false
    projectList.param.active = true
    projectList.param.inActive = false
    projectList.filters.status.value = true
  }else if(value === 2){
    projectList.param.total = false
    projectList.param.active = false
    projectList.param.inActive = true
    projectList.filters.status.value = false
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
  title: "Projects",
});

projectList.db.projects = projectData
projectList.db.customerDropdown = customerDropdown
projectList.param.loading = false
</script>
<style>
.active-btn {
  background-color: white;
  color: black;
}
.inActive-btn {
  background-color: #f17121;
  color: white;
}
</style>
