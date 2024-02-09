<template>
    <div>
        <header>
            <div class="Container grid grid-cols-2 gap-4 mb-4 h-40">
              <div class="Container flex items-center">
                <div class="text-5xl">Add Product</div>
              </div>
              <div class="Container flex justify-end items-end">

              </div>
            </div>
        </header>
        <main>
            <div class="p-6 border-2 shadow-md rounded-lg">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <div>
                    <label for="">Product Name</label>
                  </div>
                  <div class="Container mt-2">
                    <input v-model="createProduct.input.product_name" type="text" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]">
                  </div>
                </div>
                <div>
                  <div>
                    <label for="">Product Code</label>
                  </div>
                  <div class="Container mt-2">
                    <input v-model="createProduct.input.product_code" type="number" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-2">
                  </div>
                </div>
                <div>
                  <div>
                    <label for="">Product Type</label>
                  </div>
                  <div class="Container mt-2">
                    <Dropdown v-model="createProduct.input.product_type" :options="createProduct.db.productTypeDropdown" optionLabel="product_type_name" placeholder="Select Type" class="w-full md:w-14rem rounded-lg"/>
                  </div>
                </div>
                <div>
                  <div>
                    <label for="">Category</label>
                  </div>
                  <div class="Container mt-2">
                    <Dropdown v-model="createProduct.input.category" :options="createProduct.db.categoryDropdown" optionLabel="category_name" placeholder="Select Category" class="w-full md:w-14rem rounded-lg"/>
                  </div>
                </div>
                <div>
                  <div>
                    <label for="">Income Account</label>
                  </div>
                  <div class="Container mt-2">
                    <input v-model="createProduct.input.income_account" type="text" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-2">
                  </div>
                </div>
                <div>
                  <div>
                    <label for="">Barcode</label>
                  </div>
                  <div class="Container mt-2">
                    <input v-model="createProduct.input.barcode" type="text" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-2">
                  </div>
                </div>
                <div>
                  <div>
                    <label for="">Selling Price</label>
                  </div>
                  <div class="Container mt-2">
                    <input v-model="createProduct.input.selling_price" type="number" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-2">
                  </div>
                </div>
                <div>
                  <div>
                    <label for="">Vat</label>
                  </div>
                  <div class="Container mt-2">
                    <input v-model="createProduct.input.vat" type="number" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-2">
                  </div>
                </div>
                <div>
                  <div>
                    <label for="">Main Unit</label>
                  </div>
                  <div class="Container mt-2">
                    <input v-model="createProduct.input.main_unit" type="number" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-2">
                  </div>
                </div>
                <div>
                  <div>
                    <label for="">Unit</label>
                  </div>
                  <div class="Container mt-2">
                    <input v-model="createProduct.input.unit" type="text" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-2">
                  </div>
                </div>
                <div class="col-span-2">
                  <div>
                    <label for="">Description</label>
                  </div>
                  <div class="Container mt-2">
                    <textarea v-model="createProduct.input.product_desc" type="text" class="p-2.5 h-20 w-full border-gray-300 rounded-lg hover:border-2"></textarea>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4 mt-2">
                <div class="mb-4">
                  <div>
                    <label>Product Picture</label>
                  </div>
                  <div class="Container mt-2">
                    <!-- <input type="file" @change="onChangeFile"> -->
                    <div class="card">
                      <Toast />
                      <FileUpload :multiple="false" accept="image/*" :maxFileSize="1000000" @select="onSelectedFiles">
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
                    <InputSwitch v-model="createProduct.input.status" />
                  </div>
                </div>
            </div>
            <div class="flex justify-center mt-7 gap-4 min-h-16">
              <div>
                <NuxtLink :to="`/products`">
                    <button class="border  shadow-md border-solid rounded-[24px] h-[54px] w-[215px] hover:bg-gray-200">Cancel</button>
                </NuxtLink>
              </div>
              <div>
                <button @click="insertData" class="border bg-[#F17121] shadow-md border-solid rounded-[24px] text-white h-[54px] w-[215px] hover:bg-gray-200">Save</button>
              </div>
            </div>
        </main>
    </div>
</template>

<script setup>
const client = useSupabaseClient();
const primevue = usePrimeVue();

const createProduct = reactive({
  db: {
    productTypeDropdown: ref([]),
    categoryDropdown: ref([])
  },
  input: {
    product_name: ref(),
    product_type: ref(),
    product_code: ref(),
    category: ref(),
    main_unit: ref(),
    barcode: ref(),
    selling_price: ref(),
    vat: ref(),
    income_account: ref(),
    product_desc: ref(),
    unit: ref(),
    status: ref(true)
  },
  file:{
    totalSize: ref(0),
    totalSizePercent: ref(0),
    files: ref([])
  }
})

const insertData = async () => {
  const Input = {
      product_name: createProduct.input.product_name,
      product_type_id: createProduct.input.product_type.id,
      product_code: createProduct.input.product_code,
      category_id: createProduct.input.category.id,
      main_unit: createProduct.input.main_unit,
      barcode: createProduct.input.barcode,
      selling_price: createProduct.input.selling_price,
      vat: createProduct.input.vat,
      product_description: createProduct.input.product_desc,
      income_account: createProduct.input.income_account,
      unit: createProduct.input.unit,
      product_img: "",
      created_by: await getUserId(),
      status: createProduct.input.status
  }
  const { data, error } = await client.from('product').insert([
      Input,
  ])
  .select()
  if(error === null){
    if(createProduct.file.files.length > 0){
      await uploadImg(data[0].product_number)
    }
    alert("successfully");
    navigateTo('/products');
  }else{
      alert("error to insert the product to supabase");
      console.log("error ",error)
  }
}

async function getUserId(){
  const { data, error } = await client.auth.getUser()
  return data.user.id;
}

async function fetchCategory() {
  const { data } = await client.from('category').select('*');
  return data;
}

const { data: categoryDropdownData } = await useLazyAsyncData(
  "category",
  fetchCategory
);

async function fetchProductType() {
  const { data } = await client.from('productType').select('*');
  return data;
}

const { data: productTypeDropdown } = await useLazyAsyncData(
  "productType",
  fetchProductType
);

const uploadImg = async (id) => {
  const { data, error } = await client.storage
    .from('product')
    .upload(id+"/"+createProduct.file.files[0].name, createProduct.file.files[0])

    if(error){
      console.log(error)
    }else{
      const { data, error } = await client
        .from('product')
        .update({ product_img: id+"/"+ createProduct.file.files[0].name })
        .eq('product_number', id)
        .select()
    }
    
}

const onRemoveTemplatingFile = (file, removeFileCallback, index) => {
    console.log("onRemoveTemplatingFile");
    removeFileCallback(index);
    createProduct.file.totalSize -= parseInt(formatSize(file.size));
    createProduct.file.totalSizePercent = createProduct.file.totalSize / 10;
    createProduct.file.files === 0
};

const onSelectedFiles = (event) => {
  createProduct.file.files = event.files;
  createProduct.file.files.forEach((file) => {
    createProduct.file.totalSize += parseInt(formatSize(file.size));
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
  title: "Add Product",
});

createProduct.db.categoryDropdown = categoryDropdownData;
createProduct.db.productTypeDropdown = productTypeDropdown;
</script>

<style>

.p-fileupload-buttonbar{
  border-radius: 10px 10px 0px 0px;
}
.p-fileupload-content{
  border-radius: 0px 0px 10px 10px;
}

</style>