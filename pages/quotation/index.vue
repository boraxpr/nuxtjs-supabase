<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { FilterMatchMode } from "primevue/api";
import { ref, onMounted } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Divider from "primevue/divider";
import Dropdown from "primevue/dropdown";

const client = useSupabaseClient();
const quotation = ref([]);
const customers = ref([]);
const loading = ref(true);
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  doc_num: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  project_named: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  customer_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const total = ref(true);
const checked = ref(false);

async function getUserId() {
  const { data, error } = await client.auth.getUser();
  return data.user.id;
}

async function fetchquotation() {
  try {
    const { data: quotationData, error: quotationError } = await client
      .from("quotation")
      .select("*");
    if (quotationError) {
      console.error("Error fetching quotation:", quotationError.message);
      return;
    }

    const customerIds = quotationData.map((quotation) => quotation.customer_id);
    const customersData = await fetchCustomers();
    const projectData = await fetchProject();
    // Map customer names to quotation based on customer_id
    quotation.value = quotationData.map((quotation) => {
      const customer = customersData.find(
        (customer) => customer.id === quotation.customer_id,
      );
      const project = projectData.find(
        (project) => project.id === quotation.project_name,
      );
      return {
        ...quotation,
        customer_name: customer ? customer.name : "Unknown Customer",
        customer_phone: customer ? customer.phone_number : "N/A",
        customer_email: customer ? customer.email : "N/A",
        project_named: project ? project.project_name : "N/A",
      };
    });
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    loading.value = false;
  }
}

async function fetchCustomers() {
  try {
    const { data: customersData, error: customersError } = await client
      .from("customers")
      .select("*");
    if (customersError) {
      console.error("Error fetching customers:", customersError.message);
      return [];
    }
    return customersData;
  } catch (error) {
    console.error("Error:", error.message);
    return [];
  }
}

async function fetchProject() {
  try {
    const { data: projectData, error: projectError } = await client
      .from("project")
      .select("*");
    if (projectError) {
      console.error("Error fetching project:", projectError.message);
      return [];
    }
    return projectData;
  } catch (error) {
    console.error("Error:", error.message);
    return [];
  }
}

onMounted(async () => {
  await fetchquotation();
});

import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const confirm = useConfirm();
const toast = useToast();

const showTemplate = async (event, data) => {
  confirm.require({
    target: event.currentTarget,
    group: "templating",
    message: "Confirm Delete?",
    acceptIcon: "pi pi-check",
    rejectIcon: "pi pi-times",
    acceptLabel: "Confirm",
    rejectLabel: "Cancel",
    rejectClass: "p-button-outlined p-button-sm",
    acceptClass: "p-button-sm",
    accept: async () => {
      toast.add({
        severity: "info",
        summary: "Confirmed",
        detail: "You have accepted",
        life: 3000,
      });
      await deleteQuotation(data);
    },
    reject: () => {
      // toast.add({severity:'error', summary:'Rejected', detail:'You have rejected', life: 3000});
    },
  });
};

const deleteQuotation = async (docNum) => {
  try {
    const { error } = await client
      .from("quotation")
      .delete()
      .eq("doc_num", docNum);

    if (error) {
      console.error("Error deleting quotation:", error.message);
    } else {
      console.log("Quotation deleted successfully");
      await fetchquotation(); // Refresh quotation data
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

function editRow(rowData) {
  // Handle editing logic here
  console.log("Editing row:", rowData);
}

function changeStatusBtn(value) {
  if (value === "") {
    total.value = true;
  }
}

const dropdownStatus = ref({}); // Object to store dropdown values for each quotation
const statusoption = ref([
  { name: "Pending Approve", code: "PEA" },
  { name: "Approved", code: "APP" },
  { name: "Rejected", code: "REJ" },
]);

// Method to update the status of a quotation
const updateStatus = async (docNum) => {
  const selectedStatus = dropdownStatus.value[docNum];
  // Get the selected status from the dropdown using the docNum as the key

  try {
    const { error } = await client
      .from("quotation")
      .update({
        status: selectedStatus.name,
        updated_at: new Date().toISOString(), // Update with the current date and time
        updated_by: await getUserId(),
      })
      .eq("doc_num", docNum); // Update the row where doc_num equals the provided docNum

    if (error) {
      console.error("Error updating quotation status:", error.message);
    } else {
      console.log("Quotation status updated successfully");
      await fetchquotation(); // Refresh quotation data
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
  console.log(selectedStatus);
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
const test123 = () => {
  console.log("test send value from component");
};
</script>

<template>
  <div class="overflow-x-auto">
    <header class="mb-4">
      <div class="container grid h-40 grid-cols-1 gap-4 md:grid-cols-2">
        <div class="flex items-center justify-center md:justify-start">
          <div class="text-6xl font-bold">Quotation</div>
        </div>
        <div class="flex items-end justify-end"></div>
      </div>
    </header>
    <main>
      <div class="container">
        <DataTable
          v-model:filters="filters"
          :value="quotation"
          :paginator="true"
          :rows="5"
          selectionMode="multiple"
          :rowsPerPageOptions="[5, 10, 20, 50]"
          :stripedRows="true"
          tableStyle="min-width: 50rem"
          dataKey="id"
          :loading="loading"
          :globalFilterFields="[
            'doc_num',
            'status',
            'project_named',
            'customer_name',
          ]"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
          currentPageReportTemplate="{first} - {last} of {totalRecords} quotation"
          :sortField="'doc_num'"
          :sortOrder="1"
          class="table-font"
        >
          <div class="mb-4 flex items-center justify-between">
            <div class="flex gap-5">
              <div class="justify-content-end flex">
                <span class="p-input-icon-right">
                  <InputText
                    v-model="filters['global'].value"
                    class="h-[54px] w-[555px] rounded-[25px] p-6"
                    placeholder="Search by Doc Number, Project Name, Customer Name, Status"
                  />
                  <i class="pi pi-search mr-2" />
                </span>
              </div>
            </div>
            <div>
              <Nuxt-link :to="`/quotation/create`">
                <div
                  class="flex h-[54px] w-[203px] items-center justify-center rounded-[20px] bg-[#F17121] text-xl text-white hover:bg-gray-200"
                >
                  + New Quotation
                </div>
              </Nuxt-link>
            </div>
          </div>
          <div
            class="mb-4 mt-5 flex h-[58px] w-full items-center rounded-[20px] bg-[#F17121]"
          >
            <div class="ml-4 flex">
              <button
                class="h-[42px] w-[151px] rounded-[15px] bg-white text-lg"
                :class="total ? 'active' : 'inActive'"
                @click="changeStatusBtn('')"
              >
                Show all
              </button>
              <Divider
                layout="vertical"
                class="min-h-[20px] w-[1px] bg-white"
              />
              <Button
                class="p-button-secondary p-button-rounded p-button-text p-button-lg excel-icon"
                icon="pi pi-file-excel"
              ></Button>
            </div>
          </div>

          <template #empty> No quotation found. </template>
          <template #loading> Loading quotation data. Please wait. </template>
          <Column header="Document No.">
            <template #body="quotation">
              <div class="card flex items-center justify-center">
                <Checkbox v-model="checked" :binary="true" />
                <div class="ml-2 text-[#F17121]">
                  <span class="underline">{{ quotation.data.doc_num }}</span>
                </div>
              </div>
            </template>
          </Column>
          <Column field="customer_name" header="Customer Name"></Column>
          <Column field="project_named" header="Project Name"></Column>
          <Column header="Contact">
            <template #body="quotation">
              <div class="items-left flex w-full flex-col justify-center">
                <div class="mt-1">
                  {{ quotation.data.customer_phone }}
                </div>
                <div>
                  {{ quotation.data.customer_email }}
                </div>
              </div>
            </template>
          </Column>
          <Column field="grand_total" header="Total" style="width: 175px">
            <template #body="quotation">
              <div class="text-right">
                {{ formatCurrency(quotation.data.grand_total) }}
              </div>
            </template>
          </Column>
          <Column header="Status">
            <template #body="quotation">
              <div class="card justify-content-center flex">
                <QuotationDropdown
                  :id="quotation.data.doc_num"
                  @onRefeshquotation="fetchquotation"
                />
              </div>
            </template>
          </Column>

          <Column header="Latest Modifier">
            <template #body="quotation">
              <div class="items-left flex w-full flex-col justify-center">
                <div class="text-[#F17121]">
                  {{ quotation.data.updated_by?.full_name }}
                </div>
                <div class="mt-1">
                  {{ formatDate(quotation.data.updated_at) }}
                </div>
                <div>
                  {{ formatTime(quotation.data.updated_at) }}
                </div>
              </div>
            </template>
          </Column>
          <Column header="Edit">
            <template #body="quotation">
              <!-- Edit button -->
              <Nuxt-link :to="`/quotation/${quotation.data.doc_num}`">
                <Button
                  icon="pi pi-pencil"
                  @click="editRow(rowData)"
                  class="p-button-rounded p-button-text text-blue-400"
                ></Button>
              </Nuxt-link>
              <!-- Delete icon -->
              <Button
                icon="pi pi-trash"
                @click="showTemplate($event, quotation.data.doc_num)"
                class="p-button-rounded p-button-text text-red-600"
              ></Button>
              <Toast />
              <ConfirmPopup group="templating">
                <template #message="slotProps">
                  <div
                    class="flex-column align-items-center border-bottom-1 surface-border mb-3 flex w-full place-content-center gap-3 p-3 pb-0 font-semibold"
                  >
                    <i
                      :class="slotProps.message.icon"
                      class="text-6xl text-primary-500"
                    ></i>
                    <p class="text-center">{{ slotProps.message.message }}</p>
                  </div>
                </template>
              </ConfirmPopup>
            </template>
          </Column>
        </DataTable>
      </div>
    </main>
  </div>
</template>

<style scoped>
.p-column-header-content {
  white-space: nowrap;
  height: 56px;
}
.p-row-even,
.p-row-odd {
  height: 56px;
}

.p-dropdown .p-dropdown-label.p-placeholder {
  color: white;
}

.p-dropdown .p-dropdown-trigger {
  color: white;
}

.excel-icon {
  color: #000; /* Change to the desired dark color */
}

.active {
  background-color: #f17121;
  color: white;
}

.inActive {
  background-color: #e5e5e5;
  color: black;
}

.p-confirm-popup .p-confirm-popup-footer button:last-child {
  background-color: #f17121;
}

/* Reduce font size for table */
.table-font {
  font-size: 14px; /* Adjust the font size as needed */
}

/* Reduce font size for header */
.header-font {
  font-size: 16px; /* Adjust the font size as needed */
}

/* Adjust the height of rows */
.row-height {
  height: 40px; /* Adjust the row height as needed */
}

/* Adjust the height of header */
.header-height {
  height: 40px; /* Adjust the header height as needed */
}

/* Adjust the height of dropdown */
.dropdown-height {
  height: 32px; /* Adjust the dropdown height as needed */
}

/* Adjust the width of columns */
.column-width {
  min-width: 100px; /* Adjust the column width as needed */
}

/* Adjust the padding of cells */
.cell-padding {
  padding: 8px; /* Adjust the cell padding as needed */
}
</style>
