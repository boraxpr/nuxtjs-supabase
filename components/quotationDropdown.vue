<template>
  <Dropdown> </Dropdown>
</template>

<script setup>
const client = useSupabaseClient();
const props = defineProps({
  id: number,
});

const quotation = reactive({
  db: {
    status: ref(),
  },
});

async function fectStatus() {
  const { data, error } = await client
    .from("quotation")
    .select("*")
    .eq("doc_num", props.id);
}
</script>
