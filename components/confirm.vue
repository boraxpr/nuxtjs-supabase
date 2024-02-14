<template>
  <Dialog  v-model:visible="visible" modal :pt="{ root: 'border-none', mask: { style: 'backdrop-filter: blur(2px)'}}">
      <template #container>
        <div class="flex flex-col px-5 py-7 gap-4">
          <div class="inline-flex flex-col gap-2">
            <div class="text-4xl font-semibold text-center p-10">
              Confirm Save ?
            </div>
          </div>
          <div class="flex items-center gap-3">
              <Button label="Cancel" @click.prevent="callOnFunc(false)" text class="text-black border border-gray-300 shadow-md border-solid rounded-[24px] h-[54px] w-[215px] hover:bg-gray-200"></Button>
              <Button label="Confirm" @click.prevent="callOnFunc(true)" text class="border bg-[#F17121] shadow-md border-solid rounded-[24px] text-white h-[54px] w-[215px] hover:bg-gray-200"></Button>
          </div>
      </div>
      </template>
  </Dialog>
</template>

<script setup>

const props = defineProps({
  IsActive: Boolean
})
const visible = ref(false);

watch( 
  () => props.IsActive,
  () => {
    if(props.IsActive){
      visible.value = true
    }else{
      visible.value = false
    }
})
const emit = defineEmits(['confirmFunc'])

const callOnFunc = (value) => {
  emit('confirmFunc',value)
}
</script>