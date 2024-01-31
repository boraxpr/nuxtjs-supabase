<template>
  <div class="card flex-col justify-content-center">
    <Toast />
    <div>
      <FileUpload
        mode="basic"
        @select="onSelect"
        accept=".xlsx"
        :maxFileSize="1000000"
      />
    </div>
    <div class="m-5">
      <div v-for="(record, index) in records" :key="index">
        {{ record }}
      </div>
    </div>
  </div>
</template>

<script setup>
import xlsx_to_json from "~/utils/xlsx_to_json";

const toast = useToast();
const file = ref(File);
const records = ref();
const onSelect = async (event) => {
  file.value = event.files[0];
  console.log("HEY " + file.value);
  try {
    const jsonArray = await xlsx_to_json(file.value);
    toast.add({
      severity: "info",
      summary: "Success",
      detail: `Excel Imported Successfully`,
      life: 3000,
    });

    console.log(typeof jsonArray);
    records.value = jsonArray;
    console.log(jsonArray);
  } catch (error) {
    console.error("Error processing Excel file:", error);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: `Failed to process Excel file: ${error.message}`,
      life: 5000,
    });
  }
};
</script>
