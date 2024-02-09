<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { FilterMatchMode } from "primevue/api";
import { ref, onMounted } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import Dropdown from 'primevue/dropdown';

const client = useSupabaseClient();
const quotation = ref([]);
const customers = ref([]);
const loading = ref(true);
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    doc_num: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    project_named: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    customer_name:{ value: null, matchMode: FilterMatchMode.CONTAINS }
});
const total = ref(true);
const checked = ref(false);

async function getUserId(){
  const { data, error } = await client.auth.getUser()
  return data.user.id;
}

async function fetchquotation() {
  try {
    const { data: quotationData, error: quotationError } = await client.from("quotation").select("*");
    if (quotationError) {
      console.error('Error fetching quotation:', quotationError.message);
      return;
    }
    
    const customerIds = quotationData.map(quotation => quotation.customer_id);
    const customersData = await fetchCustomers();
    const projectData = await fetchProject();
    // Map customer names to quotation based on customer_id
    quotation.value = quotationData.map(quotation => {
      const customer = customersData.find(customer => customer.id === quotation.customer_id);
      const project = projectData.find(project => project.id === quotation.project_name);
      return {
        ...quotation,
        customer_name: customer ? customer.name : 'Unknown Customer',
        customer_phone: customer ? customer.phone_number : 'N/A',
        project_named: project ? project.project_name : 'N/A',
      };
    });
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    loading.value = false;
  }
}

async function fetchCustomers() {
  try {
    const { data: customersData, error: customersError } = await client.from("customers").select("*");
    if (customersError) {
      console.error('Error fetching customers:', customersError.message);
      return [];
    }
    return customersData;
  } catch (error) {
    console.error('Error:', error.message);
    return [];
  }
}

async function fetchProject() {
  try {
    const { data: projectData, error: projectError } = await client.from("project").select("*");
    if (projectError) {
      console.error('Error fetching project:', projectError.message);
      return [];
    }
    return projectData;
  } catch (error) {
    console.error('Error:', error.message);
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
        group: 'templating',
        message: 'Confirm Delete?',
        acceptIcon: 'pi pi-check',
        rejectIcon: 'pi pi-times',
        acceptLabel: 'Confirm',
        rejectLabel: 'Cancel',
        rejectClass: 'p-button-outlined p-button-sm',
        acceptClass: 'p-button-sm',
        accept: async () => {
            toast.add({severity:'info', summary:'Confirmed', detail:'You have accepted', life: 3000});
            await deleteQuotation(data);
        },
        reject: () => {
            // toast.add({severity:'error', summary:'Rejected', detail:'You have rejected', life: 3000});
        }
    });
}

const deleteQuotation = async (docNum) => {
  try {
    const { error } = await client
      .from('quotation')
      .delete()
      .eq('doc_num', docNum);

    if (error) {
      console.error('Error deleting quotation:', error.message);
    } else {
      console.log('Quotation deleted successfully');
      await fetchquotation(); // Refresh quotation data
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

function editRow(rowData) {
  // Handle editing logic here
  console.log('Editing row:', rowData);
}

function changeStatusBtn(value) {
  if (value === "") {
    total.value = true;
  }
}


const dropdownStatus = ref({}); // Object to store dropdown values for each quotation
const statusoption = ref([
    { name: 'Pending Approve', code: 'PEA' },
    { name: 'Approved', code: 'APP' },
    { name: 'Rejected', code: 'REJ' }
]);

// Method to update the status of a quotation
const updateStatus = async (docNum) => {
  const selectedStatus = dropdownStatus.value[docNum]; // Get the selected status from the dropdown using the docNum as the key
  
  try {
    const { error } = await client
      .from('quotation')
      .update({ 
        status: selectedStatus.name,
        updated_at: new Date().toISOString(), // Update with the current date and time
        updated_by: await getUserId()
      })
      .eq('doc_num', docNum); // Update the row where doc_num equals the provided docNum

    if (error) {
      console.error('Error updating quotation status:', error.message);
    } else {
      console.log('Quotation status updated successfully');
      await fetchquotation(); // Refresh quotation data
    }
  } catch (error) {
    console.error('Error:', error.message);
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

</script>

<template>
  <div>
    <header>
      <div class="Container grid grid-cols-2 gap-4 mb-4 h-40">
        <div class="Container flex items-center">
          <div class="text-6xl font-bold">Quotation</div>
        </div>
        <div class="Container flex justify-end items-end">
          
        </div>
      </div>
    </header>
    <main>
      <div>
        <DataTable
  v-model:filters="filters"
  :value="quotation"
  :paginator="true"
  :rows="5"
  :rowsPerPageOptions="[5, 10, 20, 50]"
  :stripedRows="true"
  tableStyle="min-width: 50rem"
  dataKey="id"
  :loading="loading"
  :globalFilterFields="['doc_num', 'status', 'project_named', 'customer_name']"
  paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
  currentPageReportTemplate="{first} - {last} of {totalRecords} quotation"
  :sortField="'doc_num'" 
  :sortOrder="1" 
>
        <template #header>
            <div class="flex justify-between">
              <div class="flex gap-5">
                <div class="flex justify-content-end">
                    <span class="p-input-icon-right">
                        <InputText v-model="filters['global'].value" class="rounded-[25px] w-[515px] h-[54px] p-6" placeholder="Search by Doc Number, Project Name, Customer Name, Status" />
                        <i class="pi pi-search mr-2" />
                    </span>
                </div>
              </div>
              <div>
                <Nuxt-link :to="`/quotation/create`">
                  <div class="flex justify-center items-center w-[203px] h-[54px] hover:bg-gray-200 rounded-[20px] bg-[#F17121] text-white text-xl">
                    + New Quotation
                  </div>
                </Nuxt-link>
              </div>
            </div>
            <div class="w-full h-[58px] rounded-[20px] bg-[#F17121] mt-5 flex items-center">
              <div class="flex ml-4">
                <button class="w-[151px] h-[42px] bg-white rounded-[15px] text-lg" 
                :class="total ? 'active': 'inActive'" 
                @click="changeStatusBtn('')">
                  Show all
                </button>
                <Divider layout="vertical" class="w-[1px] bg-white min-h-[20px]" />
                <Button class="p-button-secondary p-button-rounded p-button-text p-button-lg excel-icon" icon="pi pi-file-excel"></Button>
              </div>
            </div>
          </template>
          <template #empty> No quotation found. </template>
          <template #loading> Loading quotation data. Please wait. </template>
          <Column  header="Document No.">
              <template #body="quotation">
                  <div class="card flex items-center justify-center">
                      <Checkbox v-model="checked" :binary="true" />
                      <div class="ml-2 text-[#F17121]">
                          <span class="underline">{{quotation.data.doc_num}}</span>
                      </div>
                  </div>
              </template>
          </Column>
          <Column field="customer_name" header="Customer Name"></Column>
          <Column field="project_named" header="Project Name"></Column>
          <Column field="customer_phone" header="Contact"></Column>
          <Column field="grand_total" header="Total" class="max-w-5xl">
          <template #body="quotation">
            <div class="text-right">
              {{ formatCurrency(quotation.data.grand_total) }}
            </div>
          </template>
          </Column>
          <Column header="Status">
            <template #body="quotation">
              <div class="card flex justify-content-center ">
                <Dropdown v-model="dropdownStatus[quotation.data.doc_num]" :options="statusoption" optionLabel="name" :placeholder="quotation.data.status" @change="updateStatus(quotation.data.doc_num)" class="w-40 md:w-14rem bg-[#F17121]" />
              </div>
            </template>
          </Column>

          <Column header="Latest Modifier">
            <template #body="quotation">
              <div class="flex flex-col items-left justify-center w-full">
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
                <Button icon="pi pi-pencil" @click="editRow(rowData)" class="p-button-rounded p-button-text"></Button>
              </Nuxt-link>
              <!-- Delete icon -->
                <Button icon="pi pi-trash" @click="showTemplate($event,quotation.data.doc_num)" class="p-button-rounded p-button-text"></Button>
              <Toast />
                  <ConfirmPopup group="templating">
                      <template #message="slotProps">
                          <div class="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border p-3 mb-3 pb-0">
                              <i :class="slotProps.message.icon" class="text-6xl text-primary-500"></i>
                              <p>{{ slotProps.message.message }}</p>
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

<style>
.p-column-header-content {
    white-space: nowrap;
    height: 56px;
}
.p-row-even, .p-row-odd {
    height: 56px;
}

.p-dropdown .p-dropdown-label.p-placeholder{
  color:white;
}

.p-dropdown .p-dropdown-trigger {
    color: white;
  }

.excel-icon {
  color: #000; /* Change to the desired dark color */
}

.active {
  background-color: #F17121;
  color: white;
}

.inActive {
  background-color: #E5E5E5;
  color: black;
}
</style>
