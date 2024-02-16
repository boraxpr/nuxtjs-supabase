<template>
  <Dropdown
    v-model="quotation.input.status"
    :options="quotation.statusoption"
    optionLabel="name"
    optionValue="name"
    @change="updateStatus(quotation.input.doc_num)"
    class="md:w-14rem w-40 text-white"
    :class="{
      'pendingapprove status text-ellipsis':
        quotation.input.status === 'Pending Approve',
      'approve  status text-ellipsis': quotation.input.status === 'Approved',
      'reject status text-ellipsis': quotation.input.status === 'Rejected',
    }"
  />
</template>

<script setup>
const client = useSupabaseClient();
const props = defineProps({
  id: Number,
  status: String,
});

const quotation = reactive({
  db: {
    quotation: ref(),
  },
  statusoption: ref([
    { name: "Pending Approve", code: "PEA" },
    { name: "Approved", code: "APP" },
    { name: "Rejected", code: "REJ" },
    { name: "Darf", code: "DAR" },
  ]),
  input: {
    doc_num: ref(),
    status: ref(),
  },
});
quotation.input.status = props.status;
quotation.input.doc_num = props.id;
// async function fectStatus() {
//   const { data, error } = await client
//     .from("quotation")
//     .select("*")
//     .eq("doc_num", props.id);
//   checkError("fetchData", error);
//   quotation.db.quotation = data[0] || {};
//   quotation.input.doc_num = quotation.db.quotation.doc_num;
//   quotation.input.status = quotation.db.quotation.status;

//   console.log(quotation.db.quotation.doc_num);
// }
// onUpdated(() => {
//   console.log(props.id);
// });
// fectStatus();
// const emit = defineEmits(["onRefeshquotation"]);

const updateStatus = async (docNum) => {
  // Get the selected status from the dropdown using the docNum as the key

  try {
    const { error } = await client
      .from("quotation")
      .update({
        status: quotation.input.status,
        updated_at: new Date().toISOString(), // Update with the current date and time
        updated_by: await getUserId(),
      })
      .eq("doc_num", docNum); // Update the row where doc_num equals the provided docNum

    if (error) {
      console.error("Error updating quotation status:", error.message);
    } else {
      console.log("Quotation status updated successfully");
      // emit("onRefeshquotation"); // Refresh quotation data
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

async function getUserId() {
  const { data, error } = await client.auth.getUser();
  return data.user.id;
}
</script>

<style scoped>
.pendingapprove {
  background-color: #2464ca;
}

.approve {
  background-color: #22c55e;
}

.reject {
  background-color: #ff3d32;
}
</style>
