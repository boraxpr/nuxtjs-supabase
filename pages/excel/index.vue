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
const toast = useToast();
const file = ref();
const records = ref();
const onSelect = async (event) => {
  file.value = event.files;
  const { recordData } = await excelImport(file.value);
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
