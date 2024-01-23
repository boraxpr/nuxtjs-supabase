<template>
    <div>
        <!-- {{ productName }} -->
    </div>
    <div>
    <header>
      <div class="Container grid grid-cols-2 gap-4 mb-4 h-40">
        <div class="Container flex items-center">
          <div class="text-5xl">Edit : {{ titleName }}</div>
        </div>
        <div class="Container flex justify-end items-end">
          
        </div>
      </div>
    </header>
    <main>
      <div class="p-6 border-2 shadow-md rounded-lg">
        <div class="grid grid-cols-3 gap-4 mb-4">
          <div>
            <div>
              <label for="">Product Name</label>
            </div>
            <div class="Container mt-2">
              <input v-model="product_name" type="text" class="p-2.5 h-10 w-full bg-gray-100 rounded-lg hover:border-2">
            </div>
          </div>
          <div>
            <div>
              <label for="">Product Type</label>
            </div>
            <div class="Container mt-2">
              <input v-model="product_type" type="text" class="p-2.5 h-10 w-full bg-gray-100 rounded-lg hover:border-2">
            </div>
          </div>
          <div>
            <div>
              <label for="">Product Code</label>
            </div>
            <div class="Container mt-2">
              <input v-model="product_code" type="number" class="p-2.5 h-10 w-full bg-gray-100 rounded-lg hover:border-2">
            </div>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-4 mb-4">
          <div>
            <div>
              <label for="">Category</label>
            </div>
            <div class="Container mt-2">
              <input v-model="category" type="text" class="p-2.5 h-10 w-full bg-gray-100 rounded-lg hover:border-2">
            </div>
          </div>
          <div>
            <div>
              <label for="">Main Unit</label>
            </div>
            <div class="Container mt-2">
              <input v-model="main_unit" type="number" class="p-2.5 h-10 w-full bg-gray-100 rounded-lg hover:border-2">
            </div>
          </div>
          <div>
            <div>
              <label for="">Barcode</label>
            </div>
            <div class="Container mt-2">
              <input v-model="barcode" type="text" class="p-2.5 h-10 w-full bg-gray-100 rounded-lg hover:border-2">
            </div>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-4 mb-4">
          <div>
            <div>
              <label for="">Selling Price</label>
            </div>
            <div class="Container mt-2">
              <input v-model="selling_price" type="number" class="p-2.5 h-10 w-full bg-gray-100 rounded-lg hover:border-2">
            </div>
          </div>
          <div>
            <div>
              <label for="">Vat</label>
            </div>
            <div class="Container mt-2">
              <input v-model="vat" type="number" class="p-2.5 h-10 w-full bg-gray-100 rounded-lg hover:border-2">
            </div>
          </div>
          <div>
            <div>
              <label for="">Product Description</label>
            </div>
            <div class="Container mt-2">
              <input v-model="product_desc" type="text" class="p-2.5 h-10 w-full bg-gray-100 rounded-lg hover:border-2">
            </div>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-4 mb-4">
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
          <div>
            <div>
              <label for="">Product Img</label>
              <button @click="getLinkImg" class="ml-2" v-if="product_img">
                <span v-if="showImg" class="underline">hide</span> 
                <span v-else class="underline">show</span>
              </button>
            </div>
            <div class="Container mt-2">
              <input v-model="product_img" type="text" :disabled="true" class="p-2.5 h-10 w-full bg-gray-100 rounded-lg">
            </div>
          </div>
        </div>
        <div v-if="showImg" class="flex justify-center">
          <div class="w-48 h-48 ">
            <img :src="linkImg" alt="">
          </div>
        </div>
      </div>
      <div class="flex justify-end mt-7 gap-3">
        <div>
          <Nuxt-link :to="`/products`">
            <button class="border shadow-md border-solid rounded-[30px] text-red-600 border-red-600 h-10 w-24 hover:bg-gray-100">CANCEL</button>
          </Nuxt-link>
        </div>
        <div>
            <button @click="updateData" class="border shadow-md border-solid rounded-[30px] text-lime-600 border-lime-600 h-10 w-24 hover:bg-gray-100">SAVE</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const client = useSupabaseClient();
const route = useRoute().params

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
const product = ref();
const titleName = ref("");

const linkImg = ref("");
const showImg = ref(false);

async function fetchData() {
  const { data } = await client.from("product").select("*").eq('product_number', route.id);
  product.value = data[0] || {};
  titleName.value = product.value.product_name;

  id.value = product.value.product_number;
  product_name.value = product.value.product_name;
  product_type.value = product.value.product_type;
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
}

const updateData = async () => {
  const Input = {
        product_name: product_name.value,
        product_type: product_type.value,
        product_code: product_code.value,
        category: category.value,
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
      .update(Input)
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

const getLinkImg = async () => {
  console.log("linkImg.value===null",linkImg.value===null);
  console.log("linkImg.value===''",linkImg.value==="");
  if(linkImg.value===""){
    const { data, error } = await client
    .storage
    .from('product')
    .createSignedUrl(product_img.value, 60)
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

onMounted(() => {
  fetchData();
});

</script>

<style lang="scss" scoped>

</style>