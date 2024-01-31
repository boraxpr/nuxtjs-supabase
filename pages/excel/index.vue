<template>
  <div class="card flex justify-content-center">
    <Toast />
    <FileUpload
      mode="basic"
      @select="onSelect"
      accept=".xlsx"
      :maxFileSize="1000000"
    />
    <div>{{ records }}</div>
  </div>
</template>

<script setup>
import csv_to_json from "~/utils/csv_to_json";

const toast = useToast();
const file = ref();
const records = ref();
const onSelect = async (event) => {
  file.value = event.files[0];
  console.log("HEY " + file.value);
  const { recordData } = await csv_to_json(file.value);
  toast.add({
    severity: "info",
    summary: "Success",
    detail: `Excel Imported Successfully`,
    life: 3000,
  });
  records.value = JSON.stringify(recordData);
  console.log(records.value);
};
</script>
