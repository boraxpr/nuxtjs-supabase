<template>
  <div>
    <header>
      <div class="Container grid grid-cols-2 gap-4 mb-4 h-40">
        <div class="Container flex items-center">
          <div class="text-3xl">Quotations</div>
        </div>
        <div class="Container flex justify-end items-end">
          
        </div>
      </div>
    </header>
    <main>
      <div>
        <DataTable v-model:filters="filters" :value="quotations" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" stripedRows tableStyle="min-width: 50rem"
        dataKey="id" :loading="loading" :globalFilterFields="['doc_num', 'status', 'project_name', 'customer_name']"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NquotationsextPageLink LastPageLink" 
        currentPageReportTemplate="{first} - {last} of {totalRecords} quotations" >
        <DataTable></DataTable>
        <template #header>
            <div class="flex justify-between">
              <div class="flex gap-5">
                <div class="flex justify-content-end">
                    <span class="p-input-icon-right">
                        <InputText v-model="filters['global'].value" class="rounded-[25px] w-[404px] h-[54px] p-6" placeholder="Search by Document No., Status, Project Name, Customer Name, ..." />
                        <i class="pi pi-search mr-2" />
                    </span>
                </div>
              </div>
              <div>
                <Nuxt-link :to="`/quotationlist/create`">
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
          <template #empty> No quotations found. </template>
          <template #loading> Loading quotations data. Please wait. </template>
          <Column field="doc_num" header="Document No."></Column>
          <Column field="customer_name" header="Customer Name"></Column>
          <Column field="project_name" header="Project Name"></Column>
          <Column field="grand_total" header="Contact"></Column>
          <Column field="grand_total" header="Total"></Column>
          <Column field="status" header="Status"></Column>
          <Column field="updated_at" header="Last Modifier"></Column>
          <Column header="Edit">
            <template #body="{ rowData }">
              <!-- Edit button -->
              <Button icon="pi pi-pencil" @click="editRow(rowData)" class="p-button-rounded p-button-text"></Button>

              <!-- Delete icon -->
              <Button icon="pi pi-trash" @click="showTemplate($event)" class="p-button-rounded p-button-text"></Button>
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

<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { FilterMatchMode } from "primevue/api";
import { ref, onMounted } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Divider from 'primevue/divider';

const client = useSupabaseClient();
const quotations = ref([]);
const customers = ref([]);
const loading = ref(true);
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    doc_num: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    project_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    customer_name:{ value: null, matchMode: FilterMatchMode.CONTAINS }
});
const total = ref(true);

async function fetchQuotations() {
  try {
    const { data: quotationsData, error: quotationsError } = await client.from("quotations").select("*");
    if (quotationsError) {
      console.error('Error fetching quotations:', quotationsError.message);
      return;
    }
    
    const customerIds = quotationsData.map(quotation => quotation.customer_id);
    const customersData = await fetchCustomers();
    
    // Map customer names to quotations based on customer_id
    quotations.value = quotationsData.map(quotation => {
      const customer = customersData.find(customer => customer.id === quotation.customer_id);
      return {
        ...quotation,
        customer_name: customer ? customer.name : 'Unknown Customer'
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

onMounted(async () => {
  await fetchQuotations();
});


import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const confirm = useConfirm();
const toast = useToast();

const showTemplate = async (event) => {
    const rowData = event.rowData;

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
            
            deleteQuotation
        },
        reject: () => {
            // toast.add({severity:'error', summary:'Rejected', detail:'You have rejected', life: 3000});
        }
    });
}

const deleteQuotation = async() =>{
  try{
    const { error } = await supabase
  .from('quotations')
  .delete()
  .eq('doc_num', '11')

  if (data) {
    console.log(error)
  }
  } catch (error){
    console.log(error)
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
</script>

<style>
.p-column-header-content {
    white-space: nowrap;
    height: 56px;
}
.p-row-even, .p-row-odd {
    height: 56px;
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
