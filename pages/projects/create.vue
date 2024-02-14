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
                        <input v-model="createProject.input.project_name" type="text" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]">
                    </div>
                </div>
                <div>
                    <div>
                      <label for="">Customer</label>
                    </div>
                    <div class="Container mt-2">
                        <Dropdown v-model="createProject.input.customer" :options="createProject.db.customerDropdown" optionLabel="name" placeholder="Customer Name" class="p-column-filter w-full rounded-lg flex items-center text-center" style="min-width: 12rem" :showClear="true">
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
                        <input v-model="createProject.input.price" type="number" class="p-2.5 h-10 w-full border-gray-300 rounded-lg hover:border-[#f17121]">
                    </div>
                </div>
                <div class="col-span-2">
                    <div>
                      <label for="">Description</label>
                    </div>
                    <div class="Container mt-2">
                      <textarea v-model="createProject.input.desc" type="text" class="p-2.5 h-20 w-full border-gray-300 rounded-lg hover:border-2"></textarea>
                    </div>
                </div>
                <div class="col-span-2">
                    <div>
                      <label>Active</label>
                    </div>
                    <div class="mt-2">
                      <InputSwitch v-model="createProject.input.status" />
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
            <button @click="validateForm" class="border bg-[#F17121] shadow-md border-solid rounded-[24px] text-white h-[54px] w-[215px] hover:bg-gray-200">Save</button>
          </div>
        </div>
        <confirm :IsActive = "createProject.param.visible" cancelBtn="" confirmBtn="" message="Confirm Save ?" @confirmFunc="confirmResult" />
    </main>
</template>
<script setup>

const client = useSupabaseClient();

const createProject = reactive({
  db: {
    customerDropdown: ref()
  },
  input: {
    project_name: ref(),
    customer: ref(),
    price: ref(),
    desc: ref(),
    status: ref(true)
  },
  param: {
    visible: ref(false),
    validate: ref(false)
  }
})

async function fetchCustomer() {
    const { data, error } = await client.from('customers').select('*');
    checkError("fetchCustomer",error)
    return data;
}
const { data: customerDropdown } = await useLazyAsyncData(
  "customer",
  fetchCustomer
);

const insertData = async () => {
    const input = {
        project_name: createProject.input.project_name,
        customer_id: createProject.input.customer.id,
        price: createProject.input.price,
        detail: createProject.input.desc,
        created_by: await getUserId(),
        status: createProject.input.status
    }
    console.log(input);
    const { data, error } = await client.from('project').insert([
    input,
  ])
  .select()
  if(error === null){
    alert("successfully");
    navigateTo('/projects');
  }else{
    alert("error to insert the product to supabase");
    checkError("insertData",error)
  }
}

async function getUserId(){
  const { data, error } = await client.auth.getUser()
  checkError("getUserId",error)
  return data.user.id;
}

const confirmResult = (value) => {
  console.log("from parent")
  console.log(value)
  if(value){
    console.log("insert");
    insertData();
  }
  createProject.param.visible = false
}
const validateForm = () => {

console.log("check validate"); //waiting for validation func
createProject.param.validate = true; //waiting for validation func

if(createProject.param.validate){
  createProject.param.visible = true
}else{
  alert("invalid");
}

}

createProject.db.customerDropdown = customerDropdown;

</script>