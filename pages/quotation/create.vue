<template>
  <div ref="componentRef">
    <Toast position="bottom-right" />
    <!-- SECTION 0 -->
    <div
      class="m-2 mx-auto flex w-full flex-row justify-between rounded-md py-4 print:hidden print:w-11/12"
    >
      <!-- Header -->
      <div class="text-left text-3xl font-semibold">Add Quotation</div>
      <!-- BUTTONS -->
      <div>
        <Button
          id="printButton"
          raised
          class="h-14 w-full"
          @click="handlePrint"
          rounded
        >
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class=""
            style="flex; width: 100%; height:100%; justify-content: center; align-items: center;"
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
          <p class="ml-2 whitespace-nowrap">Download PDF</p>
        </Button>
      </div>
    </div>
    <!-- SECTION 1  -->

    <div
      class="m-2 mx-auto flex flex-row justify-between rounded-md border p-6 shadow-md print:w-11/12"
    >
      <!-- SECTION 1 : LEFT -->
      <div class="flex w-[50%] flex-col justify-between">
        <label for="dd-customer">Customer Name</label>
        <Dropdown
          v-model="createQuotationFormData.userInputs.customer_id"
          inputId="dd-customer"
          :options="createQuotationFormData.db.customers"
          placeholder="Select a Customer"
          optionLabel="customer_name"
          optionValue="id"
          class="h-15 w-full md:w-[50%]"
          @change="handleCustomerChange"
          showClear
        >
        </Dropdown>

        <label> Customer Detail </label>
        <Textarea
          v-model="createQuotationFormData.db.customer.address"
          placeholder="Address"
          rows="3"
          col="20"
          class="w-full text-black"
          disabled
          autoResize
        />

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
      <div></div>
      <!-- SECTION 1 : RIGHT -->
      <div class="p-fluid flex w-[40%] flex-col justify-between">
        <!-- Grand Total -->

        <div class="text-right">Grand Total:</div>
        <div class="text-right text-xl font-bold text-orange-400">
          {{ createQuotationFormData.calculations.grand_total ?? "0.00" }}
        </div>

        <label>Date:</label>
        <Calendar
          v-model="createQuotationFormData.userInputs.quotation.date"
          showIcon
          iconDisplay="input"
          dateFormat="dd/mm/yy"
          class=""
        />
        <label>Credit (Day):</label>

        <InputNumber
          v-model="createQuotationFormData.userInputs.credit_day"
          mode="decimal"
          showButtons
          :min="0"
          :max="365"
          :pt="{
            input: {
              root: {
                class: 'rounded-lg',
              },
            },
          }"
        >
        </InputNumber>

        <label>Due Date:</label>
        <Calendar
          v-model="createQuotationFormData.userInputs.quotation.due_date"
          showIcon
          iconDisplay="input"
          dateFormat="dd/mm/yy"
          class=""
        />

        <label>Sales Name:</label>
        <InputText
          showIcon
          iconDisplay="input"
          class=""
          placeholder="Naipawat Poolsawat"
          disabled
        />

        <label>Currency:</label>
        <Dropdown
          v-model="createQuotationFormData.userInputs.currency_code"
          :options="createQuotationFormData.db.currencies"
          placeholder="Select a Currency"
          inputId="dd-customer"
          optionLabel="name"
          optionValue="code"
          class=""
        ></Dropdown>
      </div>
    </div>

    <!-- SECTION 2  -->
    <div
      class="bg-card m-2 mx-auto mt-6 grid grid-flow-row gap-5 rounded-md border p-6 shadow-md print:w-11/12"
    >
      <div class="grid grid-flow-col grid-cols-[7fr,3fr] gap-5">
        <div class="space-y-2">
          <label> Projects </label>
          <Dropdown
            v-model="createQuotationFormData.userInputs.project_id"
            :options="createQuotationFormData.db.projects"
            inputId="dd-customer"
            optionLabel="project_name"
            optionValue="id"
            placeholder="Select a Project"
            @change="handleProjectChange"
            class="w-full"
            showClear
          />
        </div>
        <div class="space-y-2">
          <label> Ref </label>
          <InputText
            v-model="createQuotationFormData.userInputs.reference"
            showIcon
            iconDisplay="input"
            placeholder=""
            class="w-full"
          />
        </div>
      </div>

      <Textarea
        v-model="createQuotationFormData.db.project.detail"
        placeholder="Detail"
        rows="4"
        autoResize
        class="w-full"
      >
      </Textarea>
    </div>
    <!-- SECTION 3 : QUOTATION PRODUCTS -->
    <div
      class="bg-card m-2 mx-auto mt-6 rounded-md border p-6 shadow-md print:w-11/12"
    >
      <div class="p-fluid card">
        <DataTable
          v-model:editingRows="editingRows"
          :value="createQuotationFormData.userInputs.products"
          dataKey="number"
          editMode="row"
          @row-edit-save="onRowEditSave"
          class="add-product-table"
          :pt="{
            table: { style: 'min-width: 50rem' },
            column: {
              bodycell: ({ state }) => ({
                style:
                  state['d_editing'] &&
                  'padding-top: 0.6rem; padding-bottom: 0.6rem',
              }),
            },
          }"
          ><Column field="number" header="No." style="width: 20%"> </Column>
          <Column field="product" header="Product" style="width: 20%">
            <template #body="{ data, field }">
              {{ data[field].product_name }}
            </template>
            <template #editor="{ data, field }">
              <Dropdown
                v-model="data[field]"
                :options="createQuotationFormData.db.products"
                optionLabel="product_name"
                placeholder="Select a Product"
              />
            </template>
          </Column>
          <Column field="product" header="Description" style="width: 20%">
            <template #body="{ data, field }">
              {{ data[field].product_description }}
            </template>
          </Column>
          <Column field="quantity" header="Quantity" style="width: 20%">
            <template #editor="{ data, field }">
              <InputText v-model="data[field]" />
            </template>
          </Column>
          <Column field="product" header="Price" style="width: 20%">
            <template #body="{ data, field }">
              <span
                v-if="
                  typeof createQuotationFormData.userInputs.currency_code ===
                    'string' &&
                  createQuotationFormData.userInputs.currency_code.length === 0
                "
              >
                {{ data[field].selling_price }}</span
              >
              <div
                v-else-if="
                  typeof createQuotationFormData.userInputs.currency_code ===
                    'string' &&
                  createQuotationFormData.userInputs.currency_code.length > 0 &&
                  data[field].selling_price > 0
                "
              >
                {{
                  currencyFormat(
                    data[field].selling_price,
                    createQuotationFormData.userInputs.currency_code,
                  )
                }}
              </div>
            </template>
          </Column>
          <Column
            :rowEditor="true"
            style="width: 10%; min-width: 8rem"
            bodyStyle="text-align:center"
          ></Column>
          <Column :exportable="false" style="width: 5%">
            <template #body="slotProps">
              <Button
                icon="pi pi-trash"
                outlined
                rounded
                severity="danger"
                @click="deleteProduct(slotProps.data)"
              />
            </template>
          </Column>
          <!-- <Column
              v-for="col of columns"
              :key="col.field"
              :field="col.field"
              :header="col.header"
              style="width: 25%"
              ><template #body="{ data, field }">
                {{ data[field] }}
              </template>
              <template #editor="{ data, field }">
                <InputText v-model="data[field]" autofocus />
              </template>
            </Column> -->
        </DataTable>
      </div>
      <Button @click="handleAddProduct" class="mt-6 rounded-3xl" outlined=""
        >+ Add Product</Button
      >
    </div>

    <!-- SECTION 4 : SUMMARY -->
    <div
      class="bg-card mx-auto mt-6 grid grid-flow-col grid-cols-[7fr,3fr] rounded-lg border p-6 shadow-lg print:w-11/12"
    >
      <!-- SECTION 4 : LEFT -->
      <div class="flex flex-col space-y-5">
        <div class="flex flex-row justify-between space-x-5">
          <div class="w-full">
            <div>
              <label>Remark:</label>
            </div>
            <div>
              <Textarea
                v-model="createQuotationFormData.userInputs.remark"
                rows="3"
                class="w-full"
                autoResize
              ></Textarea>
            </div>
          </div>
          <div class="w-full">
            <div>
              <label>Internal Note:</label>
            </div>
            <div>
              <Textarea
                v-model="createQuotationFormData.userInputs.internal_note"
                rows="3"
                class="w-full"
                autoResize
              ></Textarea>
            </div>
          </div>
        </div>
        <div class="flex flex-row justify-between space-x-5">
          <div class="w-full">
            <div>
              <label>Attachment:</label>
            </div>
            <Textarea
              v-model="createQuotationFormData.userInputs.attachment"
              rows="3"
              class="w-full"
              autoResize
            >
            </Textarea>
          </div>
        </div>
      </div>
      <!-- SECTION : RIGHT -->
      <!-- <div class="grid grid-cols-[5fr,5fr] p-6">
        <div class="">
          <div>Amount:</div>
          <div class="p-fluid flex flex-row items-center">
            <div>Discount:</div>
            <InputText></InputText>%
          </div>
          <div>Total After Discount</div>

          <div>Grand Total</div>
        </div>
        <div class="text-right">
          <div>0.00</div>
          <div>0.00</div>
          <div>0.00</div>
          <div>0.00</div>
          <div>0.00</div>
        </div>
      </div> -->
      <div class="mt-6 flex flex-col items-end space-y-2">
        <div class="w-4/5">
          <div class="flex justify-between">
            <p>Amount:</p>
            <P>100</P>
          </div>
          <div class="flex flex-col items-center justify-between md:flex-row">
            <div class="flex items-center">
              <p>Discount:</p>
              <div class="p-fluid flex w-full flex-row items-center md:w-2/4">
                <InputNumber
                  class="ml-2 h-9 max-w-16"
                  v-model="createQuotationFormData.userInputs.discount"
                  mode="decimal"
                  showButtons
                  :max="100"
                  :min="0"
                ></InputNumber
                ><span class="pl-1 text-left md:w-1/6">%</span>
              </div>
            </div>
            <div class="w-full text-right md:w-1/4">0.00</div>
          </div>
          <div class="flex justify-between">
            <p>Amount after discount:</p>
            <P>100</P>
          </div>
          <div class="flex justify-between">
            <div class="flex items-center space-x-2">
              <Checkbox></Checkbox>
              <p>Vat Include</p>
            </div>
            <p>00</p>
          </div>
          <div class="flex justify-between">
            <p>Total Amount:</p>
            <P>100</P>
          </div>
          <Divider />

          <div class="flex items-center space-x-2">
            <Checkbox></Checkbox>
            <p>With holding tax</p>
          </div>
          <div class="mt-2 flex items-center space-x-2">
            <Checkbox></Checkbox>
            <p>Electronic Signature</p>
          </div>
        </div>
      </div>
    </div>

    <div
      class="mb-12 mt-10 flex flex-wrap items-center justify-center space-x-5 md:flex-nowrap print:hidden"
    >
      <NuxtLink to="/quotation" class="">
        <Button
          label="Close"
          raised
          rounded
          severity="secondary"
          class="h-14 w-80"
        />
      </NuxtLink>

      <Button
        label="Save"
        raised
        rounded
        class="h-14 w-80"
        @click="handleSave"
      />
    </div>
  </div>
</template>

<script setup>
import { useVueToPrint } from "vue-to-print";
import { FilterMatchMode } from "primevue/api";
const editingRows = ref([]);
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const toast = useToast();
const dt = ref();
const componentRef = ref();
useHead({
  title: "Quotation - Create",
});
const createQuotationFormData = reactive({
  // Fetch from Database
  db: {
    customers: ref([]),
    products: ref([]),
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
    currency_code: ref(""),
    project_id: ref(),
    quotation: {
      // DATE
      date: ref(),
      due_date: ref(),
    },

    credit_day: ref(),

    //QUOTATION PRODUCTS
    products: ref([]),

    remark: ref(),
    internal_note: ref(),
    attachment: ref(),
    discount: ref(),
  },
  calculations: {
    grand_total: ref(),
  },
});
const deleteProduct = (product) => {
  const index = createQuotationFormData.userInputs.products.indexOf(product);
  createQuotationFormData.userInputs.products.splice(index, 1);
};
const onRowEditSave = (event) => {
  let { newData, index } = event;
  createQuotationFormData.userInputs.products[index] = newData;
};

const isPositiveInteger = (val) => {
  let str = String(val);

  str = str.trim();

  if (!str) {
    return false;
  }

  str = str.replace(/^0+/, "") || "0";
  var n = Math.floor(Number(str));

  return n !== Infinity && String(n) === str && n >= 0;
};
// Add a Product
const handleAddProduct = async () => {
  if (createQuotationFormData.userInputs.products.length === 0) {
    createQuotationFormData.userInputs.products.push({
      number: 1,
      product: "",
      quantity: "",
    });
  } else {
    createQuotationFormData.userInputs.products.push({
      number:
        createQuotationFormData.userInputs.products[
          createQuotationFormData.userInputs.products.length - 1
        ].number + 1,
      product: "",
      quantity: "",
    });
  }
  createQuotationFormData.userInputs.products.sort((a, b) => {
    return a.number - b.number;
  });
  console.log(createQuotationFormData.userInputs.products);
};
// Save
const handleSave = async () => {
  const { userInputs, calculations } = createQuotationFormData;

  // console.log(data);
  // MAP userInputs.products to supabase QuotationProduct for insertion
  const { data: insertQuotation, error: errorQuotation } =
    await useSupabaseClient()
      .from("quotation")
      .insert({
        created_date: userInputs.quotation.date,
        due_date: userInputs.quotation.due_date,
        status: "Draft",
        is_active: true,
        currency: userInputs.currency_code,
        project_name: userInputs.project_id,
        grand_total: calculations.grand_total,
        customer_id: userInputs.customer_id,
        credit_day: userInputs.credit_day,
        remark: userInputs.remark,
        note: userInputs.internal_note,
        attachment: userInputs.attachment,
      })
      .select()
      .single();
  const OutgoingProducts = [];
  for (const product of userInputs.products) {
    OutgoingProducts.push({
      doc_num: insertQuotation.doc_num,
      product_number: product.product.product_number,
      quantity: parseInt(product.quantity),
    });
  }
  const { data: insertProduct, error: errorProduct } = await useSupabaseClient()
    .from("QuotationProduct")
    .insert(OutgoingProducts);

  if (!errorQuotation) {
    toast.add({
      severity: "success",
      summary: "Success",
      detail: `Quotation ${insertQuotation.doc_num} Created Successfully`,
      life: 5000,
    });
  } else {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: `Failed to Create Quotation`,
      life: 5000,
    });
  }
};

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
  fetchCustomers,
);
createQuotationFormData.db.customers = customersData;
const fetchProjects = async () => {
  const { data } = await useSupabaseClient().from("project").select("*");
  return data;
};
const { data: projectsData, error: projectsError } = await useAsyncData(
  "projects",
  fetchProjects,
);
createQuotationFormData.db.projects = projectsData;

const fetchSaleName = async () => {
  const currentSales = await useSupabaseClient().auth.getUser().email;
  createQuotationFormData.db.salesName = currentSales;
};
fetchCurrencies();

const fetchProducts = async () => {
  const { data } = await useSupabaseClient().from("product").select("*");
  return data;
};
const { data: productsData, error: productsError } = await useAsyncData(
  "products",
  fetchProducts,
);
createQuotationFormData.db.products = productsData;

Promise.all([fetchSaleName()])
  .then((results) => {
    console.log("All fetches completed successfully"), results;
  })
  .catch((error) => {
    console.error("An error occured: ", error);
  });

const handleCustomerChange = async () => {
  const { userInputs, calculations, db } = createQuotationFormData;
  console.log(userInputs.customer_id);
  if (userInputs.customer_id == null) {
    db.customer.zipcode = "";
    db.customer.address = "";
    db.customer.branch_name = "";
    db.customer.branch_code = "";
    db.customer.tax_id = "";
    return;
  }
  const { data } = await useSupabaseClient()
    .from("customers")
    .select("*")
    .eq("id", createQuotationFormData.userInputs.customer_id)
    .single();
  console.log(data);
  createQuotationFormData.db.customer = data;
};
const handleProjectChange = async () => {
  const { userInputs, calculations, db } = createQuotationFormData;
  if (createQuotationFormData.userInputs.project_id == null) {
    db.project.detail = "";
    return;
  }
  const { data } = await useSupabaseClient()
    .from("project")
    .select("*")
    .eq("id", createQuotationFormData.userInputs.project_id)
    .single();
  createQuotationFormData.db.project = data;
  console.log("Success Project On Change", data);
};

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
