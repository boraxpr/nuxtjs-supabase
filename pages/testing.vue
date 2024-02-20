<template>
  <div>
    <DataTable :value="data">
      <Column field="DocNum" header="Doc_num"></Column>
      <Column field="CreatedDate.Time" header="CreatedDate">
        <template #body="slotProps">
          <span v-if="slotProps.data.CreatedDate.Valid">{{
            new Date(slotProps.data.CreatedDate.Time).toLocaleString()
          }}</span>
        </template>
      </Column>
      <Column field="CustomerName" header="CustomerName"></Column>
    </DataTable>
  </div>
</template>

<script setup>
// const login = await fetch("http://localhost:8080/login",
//   {
//     method: "POST",
// credentials: "include", })
const fetchQuotation = async () => {
  const response = await fetch("http://localhost:8080/quotation", {
    credentials: "include",
    method: "GET",
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  } else {
    const data = await response.json(); // This will read the stream and parse the JSON
    // console.log(data);
    return data;
  }
};
const { data } = await useAsyncData("quotation", fetchQuotation, {
  server: false,
});

console.log(data);
const quo = ref([]);
quo.value = data;
// console.info(quo)
</script>
