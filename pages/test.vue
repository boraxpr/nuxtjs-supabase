<template>
  <!-- {{ session }} -->

    <div>
      <DataTable :value="quotation.data">
        <Column field="DocNum" header="Doc_num"></Column>
        <!-- <Column field="CreatedDate.Time" header="CreatedDate">
          <template #body="slotProps">
            <span v-if="slotProps.data.CreatedDate.Valid">{{
              new Date(slotProps.data.CreatedDate.Time).toLocaleString()
            }}</span>
          </template>
        </Column> -->
        <Column field="CustomerName.String" header="CustomerName"></Column>
      </DataTable>
    </div>

</template>

<script setup>
// const isLogin = ref(false);
const quotation = reactive({
  data : ref(),
})
// // Mimic middleware : Check session
// const session = await useAPI().session();
// if (session) {
//   isLogin.value = true;
//   await fetchQuotation();
// } else {
//   // Mimic Login Page : Login
  const login = await useAPI().login({
    email: "a@b.com",
    password: "123456",
  });
//   isLogin.value = true;
//   await fetchQuotation();
// }
// const login = await useAPI().login({
//     email: "a@b.com",
//     password: "123456",
//   });



  const {data: quotationData} = await useAsyncData("quotation", () => useAPI().get("quotation"), {
    server: false,
  });
  quotation.data = quotationData
   




</script>
