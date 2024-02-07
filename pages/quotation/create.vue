<template>
  <div ref="componentRef">
    <div class="w-full shadow-lg bg-card">
      <div
        class="w-11/12 print:w-11/12 mx-auto p-2 m-10 mt-2 mb-0 pb-0 flex flex-row justify-between"
      >
        <!-- Header -->
        <div>
          <div className="text-left text-3xl font-semibold">Add Quotation</div>
        </div>
        <!-- BUTTONS -->
        <div class="grid grid-cols-3 gap-2 print:hidden">
          <Button
            id="printButton"
            raised
            class="justify-center"
            severity="info"
            @click="handlePrint"
            rounded
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="print-icon"
            >
              <path
                class="fill1"
                d="M14 6V94H86V30.5H61.5V6H14Z"
                fill="#fff"
                strokeWidth="2px"
              />
              <path
                class="fill1"
                d="M86 30.5L61.5 6V30.5H86Z"
                fill="#fff"
                strokeWidth="2px"
              />
              <path
                class="stroke1"
                d="M86 30.5V94H14V6H61.5M86 30.5L61.5 6M86 30.5H61.5V6"
                stroke="#000"
                strokeWidth="2px"
              />
              <line
                class="line-file1-a stroke2"
                x1="27.5"
                y1="33"
                x2="48.5"
                y2="33"
                stroke="#000"
                strokeWidth="2px"
              />
              <line
                class="line-file1-b stroke2"
                x1="27.5"
                y1="53"
                x2="71.5"
                y2="53"
                stroke="#000"
                strokeWidth="2px"
              />
              <line
                class="line-file1-c stroke2"
                x1="27.5"
                y1="73"
                x2="71.5"
                y2="73"
                stroke="#000"
                strokeWidth="2px"
              />
            </svg>
          </Button>
          <NuxtLink to="/quotation">
            <Button label="Close" severity="danger" raised outlined rounded />
          </NuxtLink>

          <Button label="Save" severity="success" raised outlined rounded />
        </div>
      </div>
      <!-- SECTION 1  -->
      <div
        class="w-11/12 print:w-11/12 mx-auto p-4 m-2 shadow-md rounded-md border"
      >
        <div class="m-5 mt-0 flex flex-row justify-between space-x-5">
          <!-- SECTION 1 : LEFT -->
          <div class="w-1/2 space-y-2">
            <div class="flex flex-col w-1/2">
              <div class="md:w-14rem space-y-2">
                <label for="dd-customer">Customer Name</label>
                <Dropdown
                  v-model="createQuotationFormData.userInputs.customer_id"
                  inputId="dd-customer"
                  :options="createQuotationFormData.db.customers"
                  placeholder="Select a Customer"
                  optionLabel="name"
                  optionValue="id"
                  class="w-full"
                  @change="handleCustomerChange"
                />
              </div>
            </div>

            <div class="space-y-2">
              <label> Customer Detail </label>
              <!-- <Textarea
                v-model="createQuotationFormData.db.customer.address"
                placeholder="Address"
                rows="3"
                col="20"
                class="w-full text-black"
                autoResize
              /> -->

              <div class="flex flex-row justify-between">
                <InputText
                  v-model="createQuotationFormData.db.customer.zipcode"
                  placeholder="Zip Code"
                  class="w-[45%] text-black"
                  disabled
                />
                <InputText
                  v-model="createQuotationFormData.db.customer.tax_id"
                  placeholder="Tax ID"
                  class="w-[45%] text-black"
                  disabled
                />
              </div>
              <div class="flex flex-row justify-between">
                <InputText
                  v-model="createQuotationFormData.db.customer.branch_name"
                  placeholder="Branch Name"
                  class="w-[45%] text-black"
                  disabled
                />
                <InputText
                  v-model="createQuotationFormData.db.customer.branch_code"
                  placeholder="Branch Code"
                  class="w-[45%] text-black"
                  disabled
                />
              </div>
            </div>
          </div>
          <!-- SECTION 1 : RIGHT -->
          <div class="w-[40%]">
            <div class="space-y-2">
              <div class="">
                <div class="text-right">Grand Total:</div>
                <div class="text-right text-orange-400 font-bold text-xl">
                  {{
                    createQuotationFormData.calculations.grand_total ?? "0.00"
                  }}
                </div>
              </div>
              <div class="flex flex-row justify-between">
                <label>Date:</label>
                <Calendar
                  v-model="createQuotationFormData.userInputs.quotation.date"
                  showIcon
                  iconDisplay="input"
                  dateFormat="dd/mm/yy"
                  class="w-[70%]"
                />
              </div>
              <div class="flex flex-row justify-between">
                <label>Credit (Day):</label>
                <InputNumber
                  v-model="createQuotationFormData.userInputs.credit_day"
                  class="w-[70%]"
                  mode="decimal"
                  showButtons
                  :min="0"
                >
                </InputNumber>
              </div>
              <div class="flex flex-row justify-between">
                <label>Due Date:</label>
                <Calendar
                  v-model="
                    createQuotationFormData.userInputs.quotation.due_date
                  "
                  showIcon
                  iconDisplay="input"
                  dateFormat="dd/mm/yy"
                  class="w-[70%]"
                />
              </div>
              <div class="flex flex-row justify-between">
                <label>Sales Name:</label>
                <InputText
                  showIcon
                  iconDisplay="input"
                  class="w-[70%]"
                  placeholder="Naipawat Poolsawat"
                  disabled
                />
              </div>
              <div class="flex flex-row justify-between">
                <label>Currency:</label>
                <Dropdown
                  v-model="createQuotationFormData.userInputs.currency"
                  :options="createQuotationFormData.db.currencies"
                  inputId="dd-customer"
                  optionLabel="name"
                  optionValue="code"
                  class="w-[70%]"
                />
              </div>
          <!-- SECTION 1 : RIGHT -->
          <div class="w-[40%]">
            <div class="space-y-2">
              <div class="">
                <div class="text-right">Grand Total:</div>
                <div class="text-right text-orange-400 font-bold text-xl">
                  {{
                    createQuotationFormData.calculations.grand_total ?? "0.00"
                  }}
                </div>
              </div>
              <div class="flex flex-row justify-between">
                <label>Date:</label>
                <Calendar
                  v-model="createQuotationFormData.userInputs.quotation.date"
                  showIcon
                  iconDisplay="input"
                  dateFormat="dd/mm/yy"
                  class="w-[70%]"
                />
              </div>
              <div class="flex flex-row justify-between">
                <label>Credit (Day):</label>
                <InputNumber
                  v-model="createQuotationFormData.userInputs.credit_day"
                  class="w-[70%]"
                  mode="decimal"
                  showButtons
                  :min="0"
                >
                </InputNumber>
              </div>
              <div class="flex flex-row justify-between">
                <label>Due Date:</label>
                <Calendar
                  v-model="
                    createQuotationFormData.userInputs.quotation.due_date
                  "
                  showIcon
                  iconDisplay="input"
                  dateFormat="dd/mm/yy"
                  class="w-[70%]"
                />
              </div>
              <div class="flex flex-row justify-between">
                <label>Sales Name:</label>
                <InputText
                  showIcon
                  iconDisplay="input"
                  class="w-[70%]"
                  placeholder="Naipawat Poolsawat"
                  disabled
                />
              </div>
              <div class="flex flex-row justify-between">
                <label>Currency:</label>
                <Dropdown
                  v-model="createQuotationFormData.userInputs.currency"
                  :options="createQuotationFormData.db.currencies"
                  inputId="dd-customer"
                  optionLabel="name"
                  optionValue="code"
                  class="w-[70%]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- SECTION 2  -->
      <div
        class="w-11/12 print:w-11/12 mx-auto p-4 m-2 bg-card shadow-md rounded-md border"
      >
        <!-- SECTION 2 : ROW 1 -->
        <div class="flex flex-row space-x-3">
          <div class="mb-4 w-9/12">
            <div class="flex flex-row space-x-1 items-center">
              <div class="grid grid-rows-2 w-full">
                <label> Projects </label>
                <Dropdown
                  v-model="createQuotationFormData.userInputs.project"
                  :options="createQuotationFormData.db.projects"
                  inputId="dd-customer"
                  optionLabel="project_name"
                  optionValue="id"
                  placeholder="Select a Project"
                  @change="handleProjectChange"
                  class="w-full"
                />
      </div>

      <!-- SECTION 2  -->
      <div
        class="w-11/12 print:w-11/12 mx-auto p-4 m-2 bg-card shadow-md rounded-md border"
      >
        <!-- SECTION 2 : ROW 1 -->
        <div class="flex flex-row space-x-3">
          <div class="mb-4 w-9/12">
            <div class="flex flex-row space-x-1 items-center">
              <div class="grid grid-rows-2 w-full">
                <label> Projects </label>
                <Dropdown
                  v-model="createQuotationFormData.userInputs.project"
                  :options="createQuotationFormData.db.projects"
                  inputId="dd-customer"
                  optionLabel="project_name"
                  optionValue="id"
                  placeholder="Select a Project"
                  @change="handleProjectChange"
                  class="w-full"
                />
              </div>
            </div>
          </div>
          <div class="mb-4 w-3/12">
            <div class="flex flex-row space-x-1 items-center">
              <div class="grid grid-rows-2 w-full">
                <label> Ref </label>
                <InputText
                  v-model="createQuotationFormData.userInputs.reference"
                  showIcon
                  iconDisplay="input"
                  placeholder=""
                />
          </div>
          <div class="mb-4 w-3/12">
            <div class="flex flex-row space-x-1 items-center">
              <div class="grid grid-rows-2 w-full">
                <label> Ref </label>
                <InputText
                  v-model="createQuotationFormData.userInputs.reference"
                  showIcon
                  iconDisplay="input"
                  placeholder=""
                />
              </div>
            </div>
          </div>
        </div>
        <!-- SECTION 2 : ROW 2 -->
        <div class="flex flex-row space-x-5 items-center">
          <Textarea
            v-model="createQuotationFormData.db.project.detail"
            placeholder="Detail"
            rows="4"
            autoResize
            class="w-full"
          >
          </Textarea>
        </div>
      </div>
      <!-- SECTION 3 : QUOTATION PRODUCTS -->
      <div
        class="w-11/12 print:w-11/12 mx-auto p-4 m-2 bg-card shadow-md rounded-md border"
      >
        <DataTable
          :value="createQuotationFormData.userInputs.products"
          editMode="cell"
          :pt="{
            table: { style: 'min-width: 50rem' },
            column: {
              bodycell: ({ state }) => ({
                class: [{ 'pt-0 pb-0': state['d_editing'] }],
              }),
            },
          }"
        >
          <Column
            v-for="col of columns"
            :key="col.field"
            :field="col.field"
            :header="col.header"
            style="width: 25%"
          >
            <template #body="{ data, field }">
              {{
                field === "price" ? formatCurrency(data[field]) : data[field]
              }}
            </template>
            <template #editor="{ data, field }">
              <template v-if="field !== 'price'">
                <InputText v-model="data[field]" autofocus />
              </template>
              <template v-else>
                <InputNumber
                  v-model="data[field]"
                  mode="currency"
                  currency="USD"
                  locale="en-US"
                  autofocus
                />
              </template>
            </template>
          </Column>
        </DataTable>
      </div>
      <!-- SECTION 4 : SUMMARY -->
      <div
        class="w-11/12 print:w-11/12 mx-auto p-4 m-2 bg-card shadow-md rounded-md border"
      >
        <div class="grid grid-cols-3 gap-28">
          <!-- SECTION 4 : LEFT -->
          <div class="col-span-2">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <div>
                  <label>Remark:</label>
                </div>
                <div>
                  <textarea
                    name=""
                    id=""
                    rows="3"
                    class="rounded-lg border w-full border-gray-300"
                  ></textarea>
                </div>
              </div>
              <div>
                <div>
                  <div>
                    <label>Internal Note:</label>
                  </div>
                  <div>
                    <textarea
                      name=""
                      id=""
                      rows="3"
                      class="rounded-lg border w-full border-gray-300"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div>
                <label>Attachment</label>
              </div>
              <div>
                <textarea
                  name=""
                  id=""
                  rows="3"
                  class="rounded-lg border w-full border-gray-300"
                ></textarea>
              </div>
            </div>
          </div>
          <!-- SECTION 4 : RIGHT -->
          <div>
            <div class="flex justify-between">
              <div>Amount:</div>
              <div>100.00</div>
            </div>
            <div class="flex justify-between">
              <div class="flex">
                <div>Discount:</div>
                <div>
                  <input
                    type="number"
                    class="rounded-md w-[80px] h-7 mx-1 border-gray-400"
                  />%
                </div>
              </div>
              <div>10.00</div>
            </div>
            <div class="flex justify-between">
              <div>Amount after discount:</div>
              <div>90.00</div>
            </div>
            <div class="flex justify-between">
              <div class="flex gap-2">
                <div>
                  <input type="checkbox" class="rounded border-gray-400" />
                </div>
                <div>Vat Include:</div>
              </div>
              <div>0.00</div>
            </div>
            <div class="flex justify-between">
              <div>Total Amount:</div>
              <div>90.00</div>
            </div>
            <div class="border my-2"></div>
            <div class="flex gap-2">
              <div>
                <input type="checkbox" class="rounded border-gray-400" />
              </div>
              <div>With holding tax</div>
        <!-- SECTION 2 : ROW 2 -->
        <div class="flex flex-row space-x-5 items-center">
          <Textarea
            v-model="createQuotationFormData.db.project.detail"
            placeholder="Detail"
            rows="4"
            autoResize
            class="w-full"
          >
          </Textarea>
        </div>
      </div>
      <!-- SECTION 3 : QUOTATION PRODUCTS -->
      <div
        class="w-11/12 print:w-11/12 mx-auto p-4 m-2 bg-card shadow-md rounded-md border"
      >
        <DataTable
          :value="createQuotationFormData.userInputs.products"
          editMode="cell"
          :pt="{
            table: { style: 'min-width: 50rem' },
            column: {
              bodycell: ({ state }) => ({
                class: [{ 'pt-0 pb-0': state['d_editing'] }],
              }),
            },
          }"
        >
          <Column
            v-for="col of columns"
            :key="col.field"
            :field="col.field"
            :header="col.header"
            style="width: 25%"
          >
            <template #body="{ data, field }">
              {{
                field === "price" ? formatCurrency(data[field]) : data[field]
              }}
            </template>
            <template #editor="{ data, field }">
              <template v-if="field !== 'price'">
                <InputText v-model="data[field]" autofocus />
              </template>
              <template v-else>
                <InputNumber
                  v-model="data[field]"
                  mode="currency"
                  currency="USD"
                  locale="en-US"
                  autofocus
                />
              </template>
            </template>
          </Column>
        </DataTable>
      </div>
      <!-- SECTION 4 : SUMMARY -->
      <div
        class="w-11/12 print:w-11/12 mx-auto p-4 m-2 bg-card shadow-md rounded-md border"
      >
        <div class="grid grid-cols-3 gap-28">
          <!-- SECTION 4 : LEFT -->
          <div class="col-span-2">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <div>
                  <label>Remark:</label>
                </div>
                <div>
                  <textarea
                    name=""
                    id=""
                    rows="3"
                    class="rounded-lg border w-full border-gray-300"
                  ></textarea>
                </div>
              </div>
              <div>
                <div>
                  <div>
                    <label>Internal Note:</label>
                  </div>
                  <div>
                    <textarea
                      name=""
                      id=""
                      rows="3"
                      class="rounded-lg border w-full border-gray-300"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div>
                <label>Attachment</label>
              </div>
              <div>
                <textarea
                  name=""
                  id=""
                  rows="3"
                  class="rounded-lg border w-full border-gray-300"
                ></textarea>
              </div>
            </div>
          </div>
          <!-- SECTION 4 : RIGHT -->
          <div>
            <div class="flex justify-between">
              <div>Amount:</div>
              <div>100.00</div>
            </div>
            <div class="flex justify-between">
              <div class="flex">
                <div>Discount:</div>
                <div>
                  <input
                    type="number"
                    class="rounded-md w-[80px] h-7 mx-1 border-gray-400"
                  />%
                </div>
              </div>
              <div>10.00</div>
            </div>
            <div class="flex justify-between">
              <div>Amount after discount:</div>
              <div>90.00</div>
            </div>
            <div class="flex justify-between">
              <div class="flex gap-2">
                <div>
                  <input type="checkbox" class="rounded border-gray-400" />
                </div>
                <div>Vat Include:</div>
              </div>
              <div>0.00</div>
            </div>
            <div class="flex justify-between">
              <div>Total Amount:</div>
              <div>90.00</div>
            </div>
            <div class="border my-2"></div>
            <div class="flex gap-2">
              <div>
                <input type="checkbox" class="rounded border-gray-400" />
              </div>
              <div>With holding tax</div>
            </div>
            <div class="flex gap-2">
              <div>
                <input type="checkbox" class="rounded border-gray-400" />
              </div>
              <div>Electronic Signature</div>
            <div class="flex gap-2">
              <div>
                <input type="checkbox" class="rounded border-gray-400" />
              </div>
              <div>Electronic Signature</div>
            </div>
          </div>
        </div>
      </div>
        </div>
      </div>

      <!-- <div class="w-11/12 print:w-11/12 mx-auto pb-10 bg-card grid grid-flow-col gap-4">
        <div class="flex flex-col col-span-1 space-y-5">
          <div></div>
          <div class="border rounded-lg">
            <div class="m-5 flex flex-row justify-between"></div>
          </div>
          <div class="border rounded-lg">
            <div class="m-5 flex flex-row justify-between"></div>
          </div>
          <div class="flex flex-row space-x-3 items-center"></div>
        </div>
        <div class="flex flex-col col-span-4 divide-y border shadow-lg rounded-lg">
          <div class="m-5 divide-y-2">
            <div class="space-y-5">
              <div>Total</div>
              <div class="flex items-center">
                <span class="ml-1">%</span>
              </div>
              <div>Total After Discount</div>
              <div class="flex flex-row space-x-3 items-center"></div>
              <div>Grand Total</div>
            </div>
            <div class="pt-5">
              <div class="flex flex-row space-x-3 items-center"></div>
            </div>
          </div>
        </div>
      </div> -->
      <!-- <div class="w-11/12 print:w-11/12 mx-auto pb-10 bg-card grid grid-flow-col gap-4">
        <div class="flex flex-col col-span-1 space-y-5">
          <div></div>
          <div class="border rounded-lg">
            <div class="m-5 flex flex-row justify-between"></div>
          </div>
          <div class="border rounded-lg">
            <div class="m-5 flex flex-row justify-between"></div>
          </div>
          <div class="flex flex-row space-x-3 items-center"></div>
        </div>
        <div class="flex flex-col col-span-4 divide-y border shadow-lg rounded-lg">
          <div class="m-5 divide-y-2">
            <div class="space-y-5">
              <div>Total</div>
              <div class="flex items-center">
                <span class="ml-1">%</span>
              </div>
              <div>Total After Discount</div>
              <div class="flex flex-row space-x-3 items-center"></div>
              <div>Grand Total</div>
            </div>
            <div class="pt-5">
              <div class="flex flex-row space-x-3 items-center"></div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { useVueToPrint } from "vue-to-print";
const componentRef = ref();
useHead({
  title: "Quotation - Create",
});
const createQuotationFormData = reactive({
  // Fetch from Database
  db: {
    customers: ref([]),
    customer: {
      zipcode: ref(""),
      address: ref(""),
      tax_id: ref(""),
      branch_code: ref(""),
      branch_name: ref(""),
    },
    salesName: ref(),
    currencies: ref([]),
    projects: ref([]),
    project: {
      detail: ref(""),
    },
  },
  // User Selected
  userInputs: {
    reference: ref(),
    // DROPDOWNS
    // Customer Name -> Customer Id -changes-> proc Customer Detail Fetching
    customer_id: ref(),
    currency: ref(),
    project: ref(),
    quotation: {
      // DATE
      date: ref(),
      due_date: ref(),
    },

    credit_day: ref(),

    //QUOTATION PRODUCTS
    products: ref([]),
  },
  calculations: {
    grand_total: ref(),
  },
});
// FETCHES INITIAL DATA
const fetchCurrencies = async () => {
  createQuotationFormData.db.currencies = [
    { name: "Thai Baht", code: "THB" },
    { name: "US Dollar", code: "USD" },
  ];
};
const fetchCustomers = async () => {
  const { data } = await useSupabaseClient().from("customers").select("*");
  if (process.client) {
    console.info("CACHE INVALIDATED GET NEW DATA: " + data);
  }
  if (process.server) {
    console.info("CACHE HIT: " + JSON.stringify(data, null, 2));
  }
  console.info(data);
  return data;
};
const { data: customersData, error: customersError } = await useAsyncData(
  "customers",
  fetchCustomers
);
createQuotationFormData.db.customers = customersData;
const fetchProjects = async () => {
  const { data } = await useSupabaseClient().from("project").select("*");
  createQuotationFormData.db.projects = data;
};

const fetchSaleName = async () => {
  const currentSales = await useSupabaseClient().auth.getUser().email;
  createQuotationFormData.db.salesName = currentSales;
};
fetchCurrencies();

Promise.all([fetchProjects(), fetchSaleName()])
  .then((results) => {
    console.log("All fetches completed successfully"), results;
  })
  .catch((error) => {
    console.error("An error occured: ", error);
  });

// FETCHES @CHANGE
const handleCustomerChange = async () => {
  const { data } = await useSupabaseClient()
    .from("customers")
    .select("*")
    .eq("id", createQuotationFormData.userInputs.customer_id)
    .single();
  createQuotationFormData.db.customer = data;
  console.log("Success Customer On Change", data);
};
const handleProjectChange = async () => {
  const { data } = await useSupabaseClient()
    .from("project")
    .select("*")
    .eq("id", createQuotationFormData.userInputs.project)
    .single();
  createQuotationFormData.db.project = data;
  console.log("Success Project On Change", data);
};

// QUOTATION PRODUCTS
const columns = ref([
  { field: "code", header: "Code" },
  { field: "name", header: "Name" },
  { field: "quantity", header: "Quantity" },
  { field: "price", header: "Price" },
]);
const handleAfterPrint = () => {
  console.log("`onAfterPrint` called"); // tslint:disable-line no-console
};

const handleBeforePrint = () => {
  console.log("`onBeforePrint` called"); // tslint:disable-line no-console
};
const { handlePrint } = useVueToPrint({
  content: () => componentRef.value,
  documentTitle: "quotation-N39",
  removeAfterPrint: false,
});
</script>
<style scoped>
.line-file1-a {
  stroke-dasharray: 110;
}
.line-file1-b {
  stroke-dasharray: 110;
  stroke-dashoffset: 120;
}
.line-file1-c {
  stroke-dasharray: 110;
  stroke-dashoffset: 120;
}

#printButton:hover .line-file1-a {
  animation: line-file1-draw-a 1.5s infinite;
}
#printButton:hover .line-file1-b {
  animation: line-file1-draw-b 1.5s 300ms infinite;
}
#printButton:hover .line-file1-c {
  animation: line-file1-draw-c 1.5s 600ms infinite;
}

@keyframes line-file1-draw-a {
  0% {
    stroke-dashoffset: 120;
  }
  20% {
    stroke-dashoffset: 120;
  }
  80% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: -110;
  }
}

@keyframes line-file1-draw-b {
  0% {
    stroke-dashoffset: 120;
  }
  20% {
    stroke-dashoffset: 120;
  }
  80% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: -110;
  }
}

@keyframes line-file1-draw-c {
  0% {
    stroke-dashoffset: 120;
  }
  20% {
    stroke-dashoffset: 120;
  }
  80% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: -110;
  }
}

@media (prefers-reduced-motion: reduce) {
  .line-file1-a,
  .line-file1-b,
  .line-file1-c {
    animation: none;
  }
}
</style>
<style scoped>
.line-file1-a {
  stroke-dasharray: 110;
}
.line-file1-b {
  stroke-dasharray: 110;
  stroke-dashoffset: 120;
}
.line-file1-c {
  stroke-dasharray: 110;
  stroke-dashoffset: 120;
}

#printButton:hover .line-file1-a {
  animation: line-file1-draw-a 1.5s infinite;
}
#printButton:hover .line-file1-b {
  animation: line-file1-draw-b 1.5s 300ms infinite;
}
#printButton:hover .line-file1-c {
  animation: line-file1-draw-c 1.5s 600ms infinite;
}

@keyframes line-file1-draw-a {
  0% {
    stroke-dashoffset: 120;
  }
  20% {
    stroke-dashoffset: 120;
  }
  80% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: -110;
  }
}

@keyframes line-file1-draw-b {
  0% {
    stroke-dashoffset: 120;
  }
  20% {
    stroke-dashoffset: 120;
  }
  80% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: -110;
  }
}

@keyframes line-file1-draw-c {
  0% {
    stroke-dashoffset: 120;
  }
  20% {
    stroke-dashoffset: 120;
  }
  80% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: -110;
  }
}

@media (prefers-reduced-motion: reduce) {
  .line-file1-a,
  .line-file1-b,
  .line-file1-c {
    animation: none;
  }
}
</style>
