<template>
    <header>
        <div class="grid grid-cols-2 gap-4 mb-4 h-40">
              <div class="flex items-center">
                <div class="text-5xl">Customer Detail</div>
              </div>
              <div class="flex justify-end items-end">

              </div>
            </div>
    </header>
    <main>
      <div class="p-6 border-2 shadow-md rounded-lg">
        <div class="grid grid-cols-3 gap-4">
          <div>
            <div>
              <label>Customer Name</label>
            </div>
            <div class="mt-2">
              <InputText v-model="customer.input.customer_name" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]"/>
            </div>
          </div>
          <div>
            <div>
              <label>Zip Code</label>
            </div>
            <div class="mt-2">
              <InputText v-model="customer.input.zipcode" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]"/>
            </div>
          </div>
          <div>
            <div>
              <label>Tax ID</label>
            </div>
            <div class="mt-2">
              <InputText v-model="customer.input.TaxId" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]"/>
            </div>
          </div>
          <div class="col-span-3">
            <div>
              <label>Address</label>
            </div>
            <div class="mt-2">
              <textarea v-model="customer.input.address" class="p-2.5 h-20 w-full border-gray-300 rounded-lg hover:border-2"></textarea>
            </div>
          </div>
          <div>
            <div>
              <label>Contact Name</label>
            </div>
            <div class="mt-2">
              <InputText v-model="customer.input.contact_name" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]"/>
            </div>
          </div>
          <div>
            <div>
              <label>Email</label>
            </div>
            <div class="mt-2">
              <InputText v-model="customer.input.email" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]"/>
            </div>
          </div>
          <div>
            <div>
              <label>Mobile Number</label>
            </div>
            <div class="mt-2">
              <InputText v-model="customer.input.mobile_number" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]"/>
            </div>
          </div>
          <div>
            <div>
              <label>Branch</label>
            </div>
            <div class="mt-2">
              <InputText disabled placeholder="Disabled" v-model="customer.input.branch" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]"/>
            </div>
          </div>
          <div>
            <div>
              <label>Branch Code</label>
            </div>
            <div class="mt-2">
              <InputText v-model="customer.input.branch_code" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]"/>
            </div>
          </div>
          <div>
            <div>
              <label>Branch Name</label>
            </div>
            <div class="mt-2">
              <InputText v-model="customer.input.branch_name" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]"/>
            </div>
          </div>
          <div>
            <div>
              <label>Account Number</label>
            </div>
            <div class="mt-2">
              <InputText v-model="customer.input.account_number" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]"/>
            </div>
          </div>
          <div>
            <div>
              <label>Account Type</label>
            </div>
            <div class="mt-2">
              <InputText v-model="customer.input.account_type" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]"/>
            </div>
          </div>
          <div>
            <div>
              <label>Credit Date</label>
            </div>
            <div class="mt-2">
              <Calendar v-model="customer.input.credit_date" dateFormat="dd/mm/yy" showIcon iconDisplay="input" class=" h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]"/>
            </div>
          </div>
          <div class="col-span-2">
            <div>
              <label>Shipping Address</label>
            </div>
            <div class="mt-2">
              <textarea v-model="customer.input.shipping_address" class="p-2.5 h-28 w-full border-gray-300 rounded-lg hover:border-2"></textarea>
            </div>
          </div>
          <div>
            <div>
              <div>
                <label>Business Type</label>
              </div>
              <div class="mt-2">
                <InputText v-model="customer.input.business_type" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]"/>
              </div>
            </div>
            <div>
              <div>
                <label>Business Name</label>
              </div>
              <div class="mt-2">
                <InputText v-model="customer.input.business_name" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]"/>
              </div>
            </div>
          </div>
          <div>
            <div>
              <label>Bank</label>
            </div>
            <div class="mt-2">
              <InputText v-model="customer.input.bank" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]"/>
            </div>
          </div>
          <div>
            <div>
              <label>Bank Branch</label>
            </div>
            <div class="mt-2">
              <InputText v-model="customer.input.bank_branch" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]"/>
            </div>
          </div>
          <div>
            <div>
              <label>Phone Number</label>
            </div>
            <div class="mt-2">
              <InputText v-model="customer.input.phone_number" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]"/>
            </div>
          </div>
          <div class="col-span-2">
            <div>
              <label>Note</label>
            </div>
            <div class="mt-2">
              <textarea v-model="customer.input.notes" class="p-2.5 h-28 w-full border-gray-300 rounded-lg hover:border-2"></textarea>
            </div>
          </div>
          <div>
            <div>
              <div>
                <label>Fax Number</label>
              </div>
              <div class="mt-2">
                <InputText v-model="customer.input.fax_number" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]"/>
              </div>
            </div>
            <div>
              <div>
                <label>Website</label>
              </div>
              <div class="mt-2">
                <InputText v-model="customer.input.website" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]"/>
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-4 mt-2">
          <div class="mb-4 col-span-2">
            <div>
              <label>Attachment</label>
            </div>
            <div v-if="customer.input.attachment !== '' && customer.input.attachment !== null && customer.param.isEditFile === false">
              <div class="flex items-start gap-2 mt-2">
                <NuxtLink :to="customer.param.link">{{ customer.param.attachment_name }}</NuxtLink>
                <button @click="deleteFileBtn" class="text-red-400">x</button>
              </div>
            </div>
            <div class="mt-2" v-else>
              <div class="card">
                <Toast />
                <FileUpload :multiple="false" :maxFileSize="1000000" @select="onSelectedFiles">
                    <template #header="{ chooseCallback }">
                        <div class="flex flex-wrap justify-content-between align-items-center flex-1 gap-2">
                            <div class="flex gap-2">
                                <Button @click="chooseCallback()" icon="pi pi-images" rounded outlined></Button>
                            </div>
                        </div>
                    </template>
                    <template #content="{ files, removeFileCallback }">
                        <div>
                            <div class="flex flex-wrap">
                                <div v-for="(file, index) of files" :key="file.name + file.type + file.size" class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                    <div>
                                        <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" />
                                    </div>
                                    <span class="font-semibold">{{ file.name }}</span>
                                    <div>{{ formatSize(file.size) }}</div>
                                    <Button icon="pi pi-times" @click="onRemoveTemplatingFile(file, removeFileCallback, index)" outlined rounded  severity="danger" />
                                </div>
                            </div>
                        </div>
                    </template>
                    <template #empty>
                        <div class="flex justify-center w-full">
                            <div class="text-center">
                              <i class="pi pi-cloud-upload border-2 rounded-full p-5 text-8xl text-400 border-400" />
                              <p class="mt-4 mb-0">Drag and drop files to here to upload.</p>
                            </div>
                        </div>
                    </template>
                </FileUpload>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <label>Active</label>
          </div>
          <div class="mt-2">
            <InputSwitch v-model="customer.input.status"/>
          </div>
        </div>
      </div>
      <div class="flex justify-center mt-7 gap-4 min-h-16">
        <div>
          <NuxtLink :to="`/customers`">
              <button class="border shadow-md border-solid rounded-[24px] h-[54px] w-[215px] hover:bg-gray-200">Cancel</button>
          </NuxtLink>
        </div>
        <div>
          <button @click="validateForm" class="border bg-[#F17121] shadow-md border-solid rounded-[24px] text-white h-[54px] w-[215px] hover:bg-gray-200">Save</button>
        </div>
      </div>
      <confirm :IsActive = "customer.param.visible" cancelBtn="" confirmBtn="" message="Confirm Save ?" @confirmFunc="confirmResult" />
    </main>
</template>
<script setup>
const client = useSupabaseClient();
const route = useRoute().params
const primevue = usePrimeVue();

const customer = reactive({
  db: {
    customer: ref()
  },
  input: {
    id: ref(),
    customer_name: ref(),
    zipcode: ref(),
    TaxId: ref(),
    address: ref(),
    contact_name: ref(),
    email: ref(),
    mobile_number: ref(),
    branch: ref(),
    branch_code: ref(),
    branch_name: ref(),
    account_number: ref(),
    account_type: ref(),
    credit_date: ref(),
    shipping_address: ref(),
    business_type: ref(),
    business_name: ref(),
    bank: ref(),
    bank_branch: ref(),
    phone_number: ref(),
    notes: ref(),
    fax_number: ref(),
    website: ref(),
    attachment: ref(""),
    status: ref(true)
  },
  file: {
    totalSize: ref(0),
    totalSizePercent: ref(0),
    files: ref([])
  },
  param: {
    attachment_old: ref(""),
    link: ref(""),
    visible: ref(false),
    validate: ref(false),
    isEditFile: ref(false),
    attachment_name: ref()
  }
})

async function fetchData() {
  const { data, error } = await client.from("customers").select("*,created_by:created_by(*), updated_by:updated_by(*)").eq("id", route.id).single();
  checkError("fetchData", error);
  customer.db.customer = data || {};
  
  customer.input.id = customer.db.customer.id;
  customer.input.customer_name = customer.db.customer.customer_name;
  customer.input.zipcode = customer.db.customer.zipcode;
  customer.input.TaxId = customer.db.customer.tax_id;
  customer.input.address = customer.db.customer.address;
  customer.input.contact_name = customer.db.customer.contact_name;
  customer.input.email = customer.db.customer.email;
  customer.input.mobile_number = customer.db.customer.mobile;
  customer.input.branch = customer.db.customer.branch;
  customer.input.branch_code = customer.db.customer.branch_code;
  customer.input.branch_name = customer.db.customer.branch_name;
  customer.input.account_number = customer.db.customer.account_number;
  customer.input.account_type = customer.db.customer.account_type;
  customer.input.credit_date = customer.db.customer.credit_date;
  customer.input.shipping_address = customer.db.customer.shipping_address;
  customer.input.business_type = customer.db.customer.business_type;
  customer.input.business_name = customer.db.customer.business_name;
  customer.input.bank = customer.db.customer.bank;
  customer.input.bank_branch = customer.db.customer.bank_branch;
  customer.input.phone_number = customer.db.customer.phone;
  customer.input.notes = customer.db.customer.notes;
  customer.input.fax_number = customer.db.customer.fax_number;
  customer.input.website = customer.db.customer.website;
  customer.input.attachment = customer.db.customer.attachment;
  customer.input.status = customer.db.customer.status;

  if(customer.input.attachment !== "" && customer.input.attachment !== null) {
    getLinkImg();
  }
}
const save = async () => {
  if(customer.param.attachment_old !== ""){
    deleteFile();
  }
  if(customer.file.files.length !== 0){
    customer.input.attachment = customer.input.id+"/"+customer.file.files[0].name;
    uploadFile();
  }
  update();
}
const update = async () => {
  console.log("customer.input.credit_date ",customer.input.credit_date);
  const input = {
    customer_name: customer.input.customer_name,
    zipcode: customer.input.zipcode,
    tax_id: customer.input.TaxId,
    address: customer.input.address,
    contact_name: customer.input.contact_name,
    email: customer.input.email,
    mobile: customer.input.mobile_number,
    // branch: customer.input.branch,
    branch_code: customer.input.branch_code,
    branch_name: customer.input.branch_name,
    account_number: customer.input.account_number,
    account_type: customer.input.account_type,
    credit_date: customer.input.credit_date,
    shipping_address: customer.input.shipping_address,
    business_type: customer.input.business_type,
    business_name: customer.input.business_name,
    bank: customer.input.bank,
    bank_branch: customer.input.bank_branch,
    phone: customer.input.phone_number,
    notes: customer.input.notes,
    fax_number: customer.input.fax_number,
    website: customer.input.website,
    attachment: customer.input.attachment,
    status: customer.input.status,
    updated_at: new Date().toISOString(),
    updated_by: await getUserId()
  }
  const { data, error } = await client.from("customers")
      .update(input)
      .eq("id", customer.input.id)
      .select()
  if(error === null){
    alert("successfully");
    navigateTo("/customers");
  }else{
    alert("error to update the customer to supabase");
    checkError("update", error);
  }
}
const uploadFile = async (id) => {
  const { data, error } = await client.storage
    .from('customers')
    .upload(id+"/"+customer.file.files[0].name, customer.file.files[0])
    checkError("uploadFile", error);
  
}
const deleteFile = async () => {
  const { data, error } = await client
    .storage
    .from("customers")
    .remove([customer.param.attachment_old])

    checkError("deleteFile", error);
}

const confirmResult = (value) => {
  if(value){
    save();
  }
  customer.param.visible = false
}

const validateForm = () => {
  console.log("check validate"); //waiting for validation func
  customer.param.validate = true; //waiting for validation func

  if(customer.param.validate){
    customer.param.visible = true
  }else{
    alert("invalid");
  }
}

async function getUserId(){
  const { data, error } = await client.auth.getUser()
  checkError("getUserId",error);
  return data.user.id;
}

const deleteFileBtn = () => {
  customer.param.attachment_old = customer.input.attachment;
  customer.input.attachment = "";
  customer.param.isEditFile = true;
}

const getLinkImg = async () => {
    const { data, error } = client
    .storage
    .from('customers').getPublicUrl(customer.input.attachment)
    checkError("getLinkImg", error);
    customer.param.link = data.publicUrl
    customer.param.attachment_name = customer.input.attachment
    let id = route.id+"/"
    customer.param.attachment_name = customer.param.attachment_name.substring(id.length)
}

const onRemoveTemplatingFile = (file, removeFileCallback, index) => {
  console.log("onRemoveTemplatingFile");
  removeFileCallback(index);
  customer.file.totalSize -= parseInt(formatSize(file.size));
  customer.file.totalSizePercent = customer.file.totalSize / 10;
  customer.file.files === 0
};

const onSelectedFiles = (event) => {
  customer.file.files = event.files;
  customer.file.files.forEach((file) => {
    customer.file.totalSize += parseInt(formatSize(file.size));
    customer.param.isEditFile = true;
  });
};

const formatSize = (bytes) => {
  const k = 1024;
  const dm = 3;
  const sizes = primevue.config.locale.fileSizeTypes;
  if (bytes === 0) {
    return `0 ${sizes[0]}`;
  }
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
  return `${formattedSize} ${sizes[i]}`;
};

fetchData();
</script>