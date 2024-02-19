<template>
    <header>
        <div class="grid grid-cols-2 gap-4 mb-4 h-40">
              <div class="flex items-center">
                <div class="text-5xl">Add Customer</div>
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
              <InputText v-model="createCustomer.input.customer_name" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]"/>
            </div>
          </div>
          <div>
            <div>
              <label>Zip Code</label>
            </div>
            <div class="mt-2">
              <InputText v-model="createCustomer.input.zipcode" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]"/>
            </div>
          </div>
          <div>
            <div>
              <label>Tax ID</label>
            </div>
            <div class="mt-2">
              <InputText v-model="createCustomer.input.TaxId" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]"/>
            </div>
          </div>
          <div class="col-span-3">
            <div>
              <label>Address</label>
            </div>
            <div class="mt-2">
              <textarea v-model="createCustomer.input.address" class="p-2.5 h-20 w-full border-gray-300 rounded-lg hover:border-2"></textarea>
            </div>
          </div>
          <div>
            <div>
              <label>Contact Name</label>
            </div>
            <div class="mt-2">
              <InputText v-model="createCustomer.input.contact_name" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]"/>
            </div>
          </div>
          <div>
            <div>
              <label>Email</label>
            </div>
            <div class="mt-2">
              <InputText v-model="createCustomer.input.email" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]"/>
            </div>
          </div>
          <div>
            <div>
              <label>Mobile Number</label>
            </div>
            <div class="mt-2">
              <InputText v-model="createCustomer.input.mobile_number" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]"/>
            </div>
          </div>
          <div>
            <div>
              <label>Branch</label>
            </div>
            <div class="mt-2">
              <InputText disabled placeholder="Disabled" v-model="createCustomer.input.branch" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]"/>
            </div>
          </div>
          <div>
            <div>
              <label>Branch Code</label>
            </div>
            <div class="mt-2">
              <InputText v-model="createCustomer.input.branch_code" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]"/>
            </div>
          </div>
          <div>
            <div>
              <label>Branch Name</label>
            </div>
            <div class="mt-2">
              <InputText v-model="createCustomer.input.branch_name" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]"/>
            </div>
          </div>
          <div>
            <div>
              <label>Account Number</label>
            </div>
            <div class="mt-2">
              <InputText v-model="createCustomer.input.account_number" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]"/>
            </div>
          </div>
          <div>
            <div>
              <label>Account Type</label>
            </div>
            <div class="mt-2">
              <InputText v-model="createCustomer.input.account_type" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]"/>
            </div>
          </div>
          <div>
            <div>
              <label>Credit Date</label>
            </div>
            <div class="mt-2">
              <Calendar v-model="createCustomer.input.credit_date" dateFormat="dd/mm/yy" showIcon iconDisplay="input" class=" h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]"/>
            </div>
          </div>
          <div class="col-span-2">
            <div>
              <label>Shipping Address</label>
            </div>
            <div class="mt-2">
              <textarea v-model="createCustomer.input.shipping_address" class="p-2.5 h-28 w-full border-gray-300 rounded-lg hover:border-2"></textarea>
            </div>
          </div>
          <div>
            <div>
              <div>
                <label>Business Type</label>
              </div>
              <div class="mt-2">
                <InputText v-model="createCustomer.input.business_type" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]"/>
              </div>
            </div>
            <div>
              <div>
                <label>Business Name</label>
              </div>
              <div class="mt-2">
                <InputText v-model="createCustomer.input.business_name" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]"/>
              </div>
            </div>
          </div>
          <div>
            <div>
              <label>Bank</label>
            </div>
            <div class="mt-2">
              <InputText v-model="createCustomer.input.bank" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]"/>
            </div>
          </div>
          <div>
            <div>
              <label>Bank Branch</label>
            </div>
            <div class="mt-2">
              <InputText v-model="createCustomer.input.bank_branch" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]"/>
            </div>
          </div>
          <div>
            <div>
              <label>Phone Number</label>
            </div>
            <div class="mt-2">
              <InputText v-model="createCustomer.input.phone_number" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]"/>
            </div>
          </div>
          <div class="col-span-2">
            <div>
              <label>Note</label>
            </div>
            <div class="mt-2">
              <textarea v-model="createCustomer.input.notes" class="p-2.5 h-28 w-full border-gray-300 rounded-lg hover:border-2"></textarea>
            </div>
          </div>
          <div>
            <div>
              <div>
                <label>Fax Number</label>
              </div>
              <div class="mt-2">
                <InputText v-model="createCustomer.input.fax_number" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]"/>
              </div>
            </div>
            <div>
              <div>
                <label>Website</label>
              </div>
              <div class="mt-2">
                <InputText v-model="createCustomer.input.website" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]"/>
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-4 mt-2">
          <div class="mb-4 col-span-2">
            <div>
              <label>Attachment</label>
            </div>
            <div class="mt-2">
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
            <InputSwitch v-model="createCustomer.input.status"/>
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
      <confirm :IsActive = "createCustomer.param.visible" cancelBtn="" confirmBtn="" message="Confirm Save ?" @confirmFunc="confirmResult" />
    </main>
</template>
<script setup>
const client = useSupabaseClient();
const primevue = usePrimeVue();

const createCustomer = reactive({
  input: {
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
    status: ref(true)
  },
  file: {
    totalSize: ref(0),
    totalSizePercent: ref(0),
    files: ref([])
  },
  param: {
    visible: ref(false),
    validate: ref(false)
  }
})

const insertData = async () => {
  const Input = {
    customer_name: createCustomer.input.customer_name,
    address: createCustomer.input.address,
    zipcode: createCustomer.input.zipcode,
    tax_id: createCustomer.input.TaxId,
    branch_code: createCustomer.input.branch_code,
    branch_name: createCustomer.input.branch_name,
    mobile: createCustomer.input.mobile_number,
    email: createCustomer.input.email,
    status: createCustomer.input.status,
    business_type: createCustomer.input.business_type,
    business_name: createCustomer.input.business_name,
    contact_name: createCustomer.input.contact_name,
    bank: createCustomer.input.bank,
    account_number: createCustomer.input.account_number,
    bank_branch: createCustomer.input.bank_branch,
    account_type: createCustomer.input.account_type,
    contact_type: createCustomer.input.contact_type,
    credit_date: createCustomer.input.credit_date,
    phone: createCustomer.input.phone_number,
    fax_number: createCustomer.input.fax_number,
    website: createCustomer.input.website,
    shipping_address: createCustomer.input.shipping_address,
    notes: createCustomer.input.notes,
    attachment: "",
    created_by: await getUserId(),
  }
  const { data, error } = await client.from('customers').insert([
      Input,
  ])
  .select()
  if(error === null){
    if(createCustomer.file.files.length > 0){
      await uploadImg(data[0].id)
    }
    alert("successfully");
    navigateTo('/customers');
  }else{
      alert("error to insert the customers to supabase");
      checkError("insertData",error);
      // console.log("error insertData: ",error)
  }
}

const uploadImg = async (id) => {
  const { data, error } = await client.storage
    .from('customers')
    .upload(id+"/"+createCustomer.file.files[0].name, createCustomer.file.files[0])

    if(error){
      checkError("uploadImg", error);
      // console.log(error)
    }else{
      const { data, error } = await client
        .from('customers')
        .update({ attachment: id+"/"+ createCustomer.file.files[0].name })
        .eq('id', id)
        .select()

      checkError("uploadImg update path", error);
    }
}

async function getUserId(){
  const { data, error } = await client.auth.getUser()
  checkError("getUserId",error);
  return data.user.id;
}

const confirmResult = (value) => {
  if(value){
    insertData();
  }
  createCustomer.param.visible = false
}

const validateForm = () => {

  console.log("check validate"); //waiting for validation func
  createCustomer.param.validate = true; //waiting for validation func

  if(createCustomer.param.validate){
    createCustomer.param.visible = true
  }else{
    alert("invalid");
  }
}

const onRemoveTemplatingFile = (file, removeFileCallback, index) => {
  console.log("onRemoveTemplatingFile");
  removeFileCallback(index);
  createCustomer.file.totalSize -= parseInt(formatSize(file.size));
  createCustomer.file.totalSizePercent = createCustomer.file.totalSize / 10;
  createCustomer.file.files === 0
};

const onSelectedFiles = (event) => {
  createCustomer.file.files = event.files;
  createCustomer.file.files.forEach((file) => {
    createCustomer.file.totalSize += parseInt(formatSize(file.size));
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

useHead({
  title: "Add Customer",
});
</script>