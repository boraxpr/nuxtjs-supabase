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
              <label for="">Product No</label>
            </div>
            <div class="Container mt-2">
              <input v-model="id" type="text" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]">
            </div>
          </div>
          <div>
            <div>
              <label for="">Product Name</label>
            </div>
            <div class="Container mt-2">
              <input v-model="product_name" type="text" class="p-2.5 h-10 w-full border-gray-300 rounded-lg">
            </div>
          </div>
          <div>
            <div>
              <label for="">Product Type</label>
            </div>
            <div class="Container mt-2">
              <Dropdown v-model="product_type" :options="productTypeDropdown" optionLabel="product_type_name" placeholder="Select Type" class="w-full md:w-14rem rounded-lg"/>
            </div>
          </div>
          <div>
            <div>
              <label for="">Product Code</label>
            </div>
            <div class="Container mt-2">
              <input v-model="product_code" type="number" class="p-2.5 h-10 w-full border-gray-300 rounded-lg">
            </div>
          </div>
          <div>
            <div>
              <label for="">Category</label>
            </div>
            <div class="Container mt-2">
              <Dropdown v-model="category" :options="categoryDropdown" optionLabel="category_name" placeholder="Select Category" class="w-full md:w-14rem rounded-lg"/>
            </div>
          </div>
          <div>
            <div>
              <label for="">Barcode</label>
            </div>
            <div class="Container mt-2">
              <input v-model="barcode" type="text" class="p-2.5 h-10 w-full border-gray-300 rounded-lg">
            </div>
          </div>
          <div>
            <div>
              <label for="">Selling Price</label>
            </div>
            <div class="Container mt-2">
              <input v-model="selling_price" type="number" class="p-2.5 h-10 w-full border-gray-300 rounded-lg">
            </div>
          </div>
          <div>
            <div>
              <label for="">Vat</label>
            </div>
            <div class="Container mt-2">
              <input v-model="vat" type="number" class="p-2.5 h-10 w-full border-gray-300 rounded-lg">
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div>
                <label for="">Main Unit</label>
              </div>
              <div class="Container mt-2">
                <input v-model="main_unit" type="number" class="p-2.5 h-10 w-full border-gray-300 rounded-lg">
              </div>
            </div>
            <div>
              <div>
                <label for="">Unit</label>
              </div>
              <div class="Container mt-2">
                <input v-model="unit" type="text" class="p-2.5 h-10 w-full border-gray-300 rounded-lg">
              </div>
            </div>
          </div>
          <div>
            <div>
              <label for="">Income Account</label>
            </div>
            <div class="Container mt-2">
              <input v-model="income_account" type="text" class="p-2.5 h-10 w-full border-gray-300 rounded-lg">
            </div>
          </div>
        </div>
        <div>
          <div>
            <label for="">Description</label>
          </div>
          <div class="Container mt-2">
            <textarea v-model="product_desc" type="text" class="p-2.5 h-20 w-full border-gray-300 rounded-lg hover:border-2"></textarea>
          </div>
        </div>
        <!-- <div class="grid grid-cols-2 gap-4 mb-4" v-if="product_img !== '' && isEditFile === false">
          <div>
            <div>
              <label>Product Picture</label>
              <button @click="getLinkImg" class="ml-2" v-if="product_img !== '' && isEditFile === false">
                <span v-if="showImg" class="underline">hide</span> 
                <span v-else class="underline">show</span>
              </button>
            </div>
            <div class="Container mt-2">
              <div>
                <input v-model="product_img" type="text" :disabled="true" class="p-2.5 h-10 w-full bg-gray-100 rounded-lg">
              </div>
            </div>
          </div>
        </div>
        <div v-else> -->
        <!-- <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div>
              <label for="">Income Account</label>
            </div>
            <div class="Container mt-2">
              <input v-model="income_account" type="text" class="p-2.5 h-10 w-full bg-gray-100 rounded-lg hover:border-2">
            </div>
          </div>
          <div>
            <div>
              <label for="">Unit</label>
            </div>
            <div class="Container mt-2">
              <input v-model="unit" type="text" class="p-2.5 h-10 w-full bg-gray-100 rounded-lg hover:border-2">
            </div>
          </div>
        </div> -->
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div class="mt-2">
              <label>Product Picture</label>
              <!-- <button @click="getLinkImg" class="ml-2" v-if="product_img !== '' && isEditFile === false">
                <span v-if="showImg" class="underline">hide</span> 
                <span v-else class="underline">show</span>
              </button> -->
            </div>
            <div v-if="product_img !== '' && isEditFile === false">
              <div class="flex items-start gap-2 mt-2">
                <img :src="linkImg" alt="" class="h-auto max-h-48">
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
        <!-- </div> -->
        


        <div class="mt-2">
          <div>
            <label>Active</label>
          </div>
          <div class="mt-2">
            <InputSwitch v-model="status" />
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
          <button @click="save" class="border bg-[#F17121] shadow-md border-solid rounded-[24px] text-white h-[54px] w-[215px] hover:bg-gray-200">Save</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const client = useSupabaseClient();
const route = useRoute().params

// const product_no = ref("");
const id = ref("");
const product_name = ref("");
const product_type = ref("");
const product_code = ref("");
const category = ref("");
const main_unit = ref("");
const barcode = ref("");
const selling_price = ref("");
const vat = ref("");
const product_desc = ref("");
const income_account = ref("");
const unit = ref("");
const product_img = ref("");
const product_img_old = ref('');
const product = ref();
const titleName = ref("");
const status = ref();
// const file = ref(File | null);

const primevue = usePrimeVue();

const totalSize = ref(0);
const totalSizePercent = ref(0);
const files = ref([]);

const linkImg = ref("");
const showImg = ref(false);
const isEditFile = ref(false);

const productTypeDropdown = ref([]);
const categoryDropdown = ref([]);

async function fetchData() {
  const { data } = await client.from("product").select("*,productType(*), category(*)").eq('product_number', route.id);
  product.value = data[0] || {};

  console.log(" product.value ", product.value);
  titleName.value = product.value.product_name;

  id.value = product.value.product_number;
  product_name.value = product.value.product_name;
  product_type.value = product.value.productType;
  product_code.value = product.value.product_code;
  category.value = product.value.category;
  main_unit.value = product.value.main_unit;
  barcode.value = product.value.barcode;
  selling_price.value = product.value.selling_price;
  vat.value = product.value.vat;
  product_desc.value = product.value.product_description;
  income_account.value = product.value.income_account;
  unit.value = product.value.unit;
  product_img.value = product.value.product_img;
  status.value = product.value.status

  if(product_img.value !== ''){
    getLinkImg();
  }
}

async function fetchCategory() {
  const { data } = await client.from('category').select('*');
  categoryDropdown.value = data || [];
}

async function fetchProductType() {
  const { data } = await client.from('productType').select('*');
  productTypeDropdown.value = data || [];
}

const save = async () => {
  if(product_img_old.value !== ""){
    deleteFile();
  }
  if(files.value.length !== 0){
    product_img.value = id.value+"/"+files.value[0].name;
    uploadFile();
  }
  update();
}

const update = async () => {
  const dataInput = {
        product_name: product_name.value,
        product_type_id: product_type.value.id,
        product_code: product_code.value,
        category_id: category.value.id,
        main_unit: main_unit.value,
        barcode: barcode.value,
        selling_price: selling_price.value,
        vat: vat.value,
        product_description: product_desc.value,
        income_account: income_account.value,
        unit: unit.value,
        product_img: product_img.value
    }

    const { data, error } = await client.from('product')
      .update(dataInput)
      .eq('product_number', id.value)
      .select()
    if(error === null){
      alert("successfully");
      navigateTo('/products');
    }else{
      alert("error to update the product to supabase");
      console.log("error ",error)
    }
}

const uploadFile = async () => {
  const { data, error } = await client.storage
    .from('product')
    .upload(id.value+"/"+files.value[0].name, files.value[0])
}

const deleteFile = async () => {
  const { data, error } = await client
    .storage
    .from('product')
    .remove([product_img_old.value])

    if(error != null){
      console.log("error ",error)
    }
}

const deleteFileBtn = () => {
  product_img_old.value = product_img.value;
  product_img.value = "";
  isEditFile.value = true;
}

const getLinkImg = async () => {
  if(linkImg.value===""){
    const { data, error } = await client
    .storage
    .from('product')
    .createSignedUrl(product_img.value, 600)
    linkImg.value = data.signedUrl
    showImg.value = true
  }else{
    if(showImg.value === true){
      showImg.value = false
    }else{
      showImg.value = true
    }
  }
}

const onRemoveTemplatingFile = (file, removeFileCallback, index) => {
    removeFileCallback(index);
    totalSize.value -= parseInt(formatSize(file.size));
    totalSizePercent.value = totalSize.value / 10;
    // files.value === null
    files.value === 0
};

const onSelectedFiles = (event) => {
    files.value = event.files;
    files.value.forEach((file) => {
    totalSize.value += parseInt(formatSize(file.size));
    isEditFile.value = true;
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

onMounted(() => {
  fetchData();
  fetchProductType();
  fetchCategory();
});

</script>

<style lang="scss" scoped>

</style>