<template>
    <div>
    <header>
      <div class="Container grid grid-cols-2 gap-4 mb-4 h-40">
        <div class="Container flex items-center">
          <div class="text-5xl">Product Detail</div>
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
              <input v-model="product.input.product_name" type="text" class="p-2.5 h-10 w-full border-gray-300 rounded-lg">
            </div>
          </div>
          <div>
            <div>
              <label for="">Product Code</label>
            </div>
            <div class="Container mt-2">
              <input v-model="product.input.product_code" type="number" class="p-2.5 h-10 w-full border-gray-300 rounded-lg">
            </div>
          </div>
          <div>
            <div>
              <label for="">Product Type</label>
            </div>
            <div class="Container mt-2">
              <Dropdown v-model="product.input.product_type" :options="product.db.productTypeDropdown" optionLabel="product_type_name" placeholder="Select Type" class="w-full md:w-14rem rounded-lg"/>
            </div>
          </div>
          <div>
            <div>
              <label for="">Category</label>
            </div>
            <div class="Container mt-2">
              <Dropdown v-model="product.input.category" :options="product.db.categoryDropdown" optionLabel="category_name" placeholder="Select Category" class="w-full md:w-14rem rounded-lg"/>
            </div>
          </div>
          <div>
            <div>
              <label for="">Income Account</label>
            </div>
            <div class="Container mt-2">
              <input v-model="product.input.income_account" type="text" class="p-2.5 h-10 w-full border-gray-300 rounded-lg">
            </div>
          </div>
          <div>
            <div>
              <label for="">Barcode</label>
            </div>
            <div class="Container mt-2">
              <input v-model="product.input.barcode" type="text" class="p-2.5 h-10 w-full border-gray-300 rounded-lg">
            </div>
          </div>
          <div>
            <div>
              <label for="">Selling Price</label>
            </div>
            <div class="Container mt-2">
              <input v-model="product.input.selling_price" type="number" class="p-2.5 h-10 w-full border-gray-300 rounded-lg">
            </div>
          </div>
          <div>
            <div>
              <label for="">Vat</label>
            </div>
            <div class="Container mt-2">
              <input v-model="product.input.vat" type="number" class="p-2.5 h-10 w-full border-gray-300 rounded-lg">
            </div>
          </div>
          <div>
            <div>
              <label for="">Main Unit</label>
            </div>
            <div class="Container mt-2">
              <input v-model="product.input.main_unit" type="number" class="p-2.5 h-10 w-full border-gray-300 rounded-lg">
            </div>
          </div>
          <div>
            <div>
              <label for="">Unit</label>
            </div>
            <div class="Container mt-2">
              <input v-model="product.input.unit" type="text" class="p-2.5 h-10 w-full border-gray-300 rounded-lg">
            </div>
          </div>
          <div class="col-span-2">
            <div>
              <label for="">Description</label>
            </div>
            <div class="Container mt-2">
              <textarea v-model="product.input.product_desc" type="text" class="p-2.5 h-20 w-full border-gray-300 rounded-lg hover:border-2"></textarea>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div class="mt-2">
              <label>Product Picture</label>
            </div>
            <div v-if="product.input.product_img !== '' && product.param.isEditFile === false">
              <div class="flex items-start gap-2 mt-2">
                <img :src="product.param.linkImg" alt="" class="h-auto max-h-48">
                <button @click="deleteFileBtn" class="text-red-400">x</button>
              </div>
            </div>
            <div class="Container mt-2" v-else>
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
        <div class="mt-2">
          <div>
            <label>Active</label>
          </div>
          <div class="mt-2">
            <InputSwitch v-model="product.input.status" />
          </div>
        </div>
      </div>
      <div class="flex justify-center mt-7 gap-4 min-h-16">
        <div>
          <Nuxt-link :to="`/products`">
              <button class="border  shadow-md border-solid rounded-[24px] h-[54px] w-[215px] hover:bg-gray-200">Cancel</button>
          </Nuxt-link>
        </div>
        <div>
          <button @click="validateForm" class="border bg-[#F17121] shadow-md border-solid rounded-[24px] text-white h-[54px] w-[215px] hover:bg-gray-200">Save</button>
        </div>
      </div>
      <confirm :IsActive = "product.param.visible" @confirmFunc="confirmResult" />
    </main>
  </div>
</template>

<script setup>
const client = useSupabaseClient();
const route = useRoute().params
const primevue = usePrimeVue();

const product = reactive({
  db: {
    productTypeDropdown: ref([]),
    categoryDropdown: ref([]),
    product: ref()
  },
  input: {
    id: ref(""),
    product_name: ref(""),
    product_type: ref(""),
    product_code: ref(""),
    category: ref(""),
    main_unit: ref(""),
    barcode: ref(""),
    selling_price: ref(""),
    vat: ref(""),
    income_account: ref(""),
    product_desc: ref(""),
    unit: ref(""),
    status: ref(),
    product_img: ref("")
  },
  file: {
    totalSize: ref(0),
    totalSizePercent: ref(0),
    files: ref([])
  },
  param: {
    product_img_old: ref(""),
    linkImg: ref(""),
    showImg: ref(false),
    isEditFile: ref(false),
    visible: ref(false),
    validate: ref(false)
  }
})

async function fetchData() {
  const { data, error } = await client.from("product").select("*,productType(*), category(*)").eq("product_number", route.id);
  checkError("fetchData", error);

  product.db.product = data[0] || {};

  product.input.id = product.db.product.product_number;
  product.input.product_name = product.db.product.product_name;
  product.input.product_type = product.db.product.productType;
  product.input.product_code = product.db.product.product_code;
  product.input.category = product.db.product.category;
  product.input.main_unit = product.db.product.main_unit;
  product.input.barcode = product.db.product.barcode;
  product.input.selling_price = product.db.product.selling_price;
  product.input.vat = product.db.product.vat;
  product.input.product_desc = product.db.product.product_description;
  product.input.income_account = product.db.product.income_account;
  product.input.unit = product.db.product.unit;
  product.input.product_img = product.db.product.product_img;
  product.input.status = product.db.product.status

  if(product.input.product_img !== "") {
    getLinkImg();
  }
}

async function fetchCategory() {
  const { data, error } = await client.from('category').select('*');
  checkError("fetchCategory", error);
  // if(error){
  //   console.log("error fetch category ",error);
  // }
  return data;
}

const { data: categoryDropdownData } = await useLazyAsyncData(
  "category",
  fetchCategory
);

async function fetchProductType() {
  const { data, error } = await client.from('productType').select('*');
  checkError("fetchProductType", error);
  // if(error){
  //   console.log("error fetch ProductType: ",error);
  // }
  return data;
}

const { data: productTypeDropdown } = await useLazyAsyncData(
  "productType",
  fetchProductType
);

const save = async () => {
  if(product.param.product_img_old !== "") {
    deleteFile();
  }
  if(product.file.files.length !== 0) {
    product.input.product_img = product.input.id+"/"+product.file.files[0].name;
    uploadFile();
  }
  update();
}

const update = async () => {
  const dataInput = {
        product_name: product.input.product_name,
        product_type_id: product.input.product_type?.id,
        product_code: product.input.product_code,
        category_id: product.input.category?.id,
        main_unit: product.input.main_unit,
        barcode: product.input.barcode,
        selling_price: product.input.selling_price,
        vat: product.input.vat,
        product_description: product.input.product_desc,
        income_account: product.input.income_account,
        unit: product.input.unit,
        product_img: product.input.product_img,
        status: product.input.status,
        updated_at: new Date().toISOString(),
        updated_by: await getUserId()
    }

    const { data, error } = await client.from("product")
      .update(dataInput)
      .eq("product_number", product.input.id)
      .select()
    if(error === null){
      alert("successfully");
      navigateTo("/products");
    }else{
      alert("error to update the product to supabase");
      // console.log("error ",error)
      checkError("update", error);
    }
}

const uploadFile = async () => {
  console.log("id ",product.input.id,"file name ",product.file.files[0].name,"file ",product.file.files[0])
  const { data, error } = await client.storage
    .from("product")
    .upload(product.input.id+"/"+product.file.files[0].name, product.file.files[0])

    checkError("uploadFile", error);
    // if(error){
    //   console.log("error uploadFile: ",error);
    // }
}

const deleteFile = async () => {
  const { data, error } = await client
    .storage
    .from("product")
    .remove([product.param.product_img_old])

    checkError("deleteFile", error);
    // if(error){
    //   console.log("error delete file: ",error)
    // }
}

const confirmResult = (value) => {
  console.log("from parent")
  console.log(value)
  if(value){
    console.log("insert");
    save();
  }
  product.param.visible = false
}

const validateForm = () => {

  console.log("check validate"); //waiting for validation func
  product.param.validate = true; //waiting for validation func

  if(product.param.validate){
    product.param.visible = true
  }else{
    alert("invalid");
  }
  
}

async function getUserId(){
  const { data, error } = await client.auth.getUser()

  checkError("getUserId", error);
  // if(error){
  //   console.log("error getUserId: ",error)
  // }
  return data.user.id;
}

const deleteFileBtn = () => {
  product.param.product_img_old = product.input.product_img;
  product.input.product_img = "";
  product.param.isEditFile = true;
}

const getLinkImg = async () => {
  if(product.param.linkImg===""){
    const { data, error } = client
    .storage
    .from('product').getPublicUrl(product.input.product_img)
    product.param.linkImg = data.publicUrl
    product.param.showImg = true

    checkError("getLinkImg", error);
    // if(error){
    //   console.log("error getLinkImg: ",error);
    // }
  }else{
    if(product.param.showImg === true){
      product.param.showImg = false
    }else{
      product.param.showImg = true
    }
  }
}

const onRemoveTemplatingFile = (file, removeFileCallback, index) => {
    removeFileCallback(index);
    product.file.totalSize -= parseInt(formatSize(file.size));
    product.file.totalSizePercent = product.file.totalSize / 10;
    product.file.files === 0
};

const onSelectedFiles = (event) => {
  product.file.files = event.files;
  product.file.files.forEach((file) => {
    product.file.totalSize += parseInt(formatSize(file.size));
    product.param.isEditFile = true;
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

const checkError = (funcName, error) => {
  if(error){
    console.log("error ",funcName,": ",error)
  }
}

fetchData();
product.db.categoryDropdown = categoryDropdownData;
product.db.productTypeDropdown = productTypeDropdown;

</script>

<style>

</style>