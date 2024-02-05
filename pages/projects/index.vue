<template>
    <div>
        <header>
            <div class="Container grid grid-cols-2 gap-4 mb-4 h-40">
              <div class="Container flex items-center">
                <div class="text-3xl">Projects</div>
              </div>
              <div class="Container flex justify-end items-end">

              </div>
            </div>
        </header>
        <main>
            <div>
                <DataTable>
                     
                </DataTable>
            </div>
        </main>
    </div>
</template>
<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";

const client = useSupabaseClient();
const projects = ref([]);

async function fetchData() {
    const { data } = await client.from('project').select('*,customers(*)');
    projects.value = data || [];
    console.log("projects.value ", projects.value);
    var date = new Date();
    console.log(date.toISOString())
}

onMounted(() => {
    fetchData();
});
</script>