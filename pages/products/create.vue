<template>
    <div>
        <header>
            <div class="Container grid grid-cols-2 gap-4 mb-4 h-40">
              <div class="Container flex items-center">
                <div class="text-5xl">Create New Product</div>
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
                  </div>
                  <div class="Container mt-2">
                    <input type="file" @change="onChangeFile">
                  </div>
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
                <button @click="insertData" class="border shadow-md border-solid rounded-[30px] text-lime-600 border-lime-600 h-10 w-24 hover:bg-gray-100">SAVE</button>
              </div>
            </div>
        </main>
    </div>
</template>

<script setup>
const client = useSupabaseClient();

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
const product_img = ref(File | null);

const insertData = async () => {
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
        // product_img: 
    }
    const { data, error } = await client.from('product').insert([
        Input,
    ])
    .select()
    if(error === null){
        uploadImg(data[0].product_number);
        alert("successfully");
        navigateTo('/products');
    }else{
        alert("error to insert the product to supabase");
        console.log("error ",error)
    }
}

const onChangeFile = (event) => {
  product_img.value = event.target.files[0] 
}

const uploadImg = async (id) => {
  
  const { data, error } = await client.storage
    .from('product')
    .upload(id+"/"+product_img.value.name, product_img.value)

    if(error){
      console.log(error)
    }else{
      const { data, error } = await client
        .from('product')
        .update({ product_img: id+"/"+product_img.value.name })
        .eq('product_number', id)
        .select()
    }
}

const getLinkImg = async () => {
  const { data, error } = await client
  .storage
  .from('product')
  .createSignedUrl('test.jpg', 60)
  linkImg.value = data.signedUrl
  console.log(data)
  console.log(error)
}
          

</script>

<style lang="scss" scoped>

</style>