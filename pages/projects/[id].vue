<template>
    <header>
        <div class="Container grid grid-cols-2 gap-4 mb-4 h-40">
              <div class="Container flex items-center">
                <div class="text-5xl">Add Project</div>
              </div>
              <div class="Container flex justify-end items-end">

              </div>
            </div>
    </header>
    <main>
        <div class="p-6 border-2 shadow-md rounded-lg">
            <div class="grid grid-cols-2 gap-4">
                <div class="col-span-2">
                    <div>
                      <label for="">Project Name</label>
                    </div>
                    <div class="Container mt-2">
                        <input v-model="project_name" type="text" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]">
                    </div>
                </div>
                <div>
                    <div>
                      <label for="">Customer</label>
                    </div>
                    <div class="Container mt-2">
                        <Dropdown v-model="customer" :options="customerDropdown" optionLabel="name" placeholder="Customer Name" class="p-column-filter w-full rounded-lg flex items-center text-center" style="min-width: 12rem" :showClear="true">
                            <template #option="slotProps">
                                <Tag :value="slotProps.option.name" />
                            </template>
                        </Dropdown>
                    </div>
                </div>
                <div>
                    <div>
                      <label for="">Price</label>
                    </div>
                    <div class="Container mt-2">
                        <input v-model="price" type="number" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]">
                    </div>
                </div>
                <div class="col-span-2">
                    <div>
                      <label for="">Description</label>
                    </div>
                    <div class="Container mt-2">
                      <textarea v-model="desc" type="text" class="p-2.5 h-20 w-full border-gray-300 rounded-lg hover:border-2"></textarea>
                    </div>
                </div>
                <div class="col-span-2">
                    <div>
                      <label>Active</label>
                    </div>
                    <div class="mt-2">
                      <InputSwitch v-model="status" />
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-center mt-7 gap-4 min-h-16">
          <div>
            <Nuxt-link :to="`/projects`">
                <button class="border  shadow-md border-solid rounded-[24px] h-[54px] w-[215px] hover:bg-gray-200">Cancel</button>
            </Nuxt-link>
          </div>
          <div>
            <button @click="updateData" class="border bg-[#F17121] shadow-md border-solid rounded-[24px] text-white h-[54px] w-[215px] hover:bg-gray-200">Save</button>
          </div>
        </div>
    </main>
</template>
<script setup>
const client = useSupabaseClient();
const route = useRoute().params

const id = ref();
const customerDropdown = ref([]);
const project_name = ref("");
const customer = ref();
const price = ref("");
const desc= ref("");
const status = ref(true);

const project = ref();

async function fetchData() {
  const { data } = await client.from("project").select("*,customers(id,name)").eq('id', route.id);
  project.value = data[0] || {};

  console.log(" project.value ", project.value);
  id.value = project.value.id;
  project_name.value = project.value.project_name;
  customer.value = project.value.customers;
  price.value = project.value.price;
  desc.value = project.value.detail;
  status.value = project.value.status;
}

async function fetchCustomer() {
    const { data } = await client.from('customers').select('*');
    customerDropdown.value = data || [];
}

const updateData = async () => {
    const input = {
        project_name: project_name.value,
        customer_id: customer.value.id,
        price: price.value,
        detail: desc.value,
        updated_by: await getUserId(),
        updated_at: new Date().toISOString(),
        status: status.value
    }
    console.log(input);
    const { data, error } = await client.from('project').update(input)
      .eq('id', id.value)
      .select()
  .select()
  if(error === null){
    alert("successfully");
    navigateTo('/projects');
  }else{
    alert("error to insert the product to supabase");
    console.log("error ",error)
  }
      
}

async function getUserId(){
  const { data, error } = await client.auth.getUser()
  return data.user.id;
}

onMounted(() => {
    fetchData();
    fetchCustomer();
});

</script>