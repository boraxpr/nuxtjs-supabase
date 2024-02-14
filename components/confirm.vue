<template>
  <Dialog  v-model:visible="confirm.visible" modal :pt="{ root: 'border-none', mask: { style: 'backdrop-filter: blur(2px)'}}">
      <template #container>
        <div class="flex flex-col px-5 py-7 gap-4">
          <div class="inline-flex flex-col gap-2">
            <div class="text-4xl font-semibold text-center p-10">
              {{ message }}
            </div>
          </div>
          <div class="flex items-center gap-3">
              <Button :label="confirm.cancelBtn" @click.prevent="callOnFunc(false)" text class="text-black border border-gray-300 shadow-md border-solid rounded-[24px] h-[54px] w-[215px] hover:bg-gray-200"></Button>
              <Button :label="confirm.confirmBtn" @click.prevent="callOnFunc(true)" text class="border bg-[#F17121] shadow-md border-solid rounded-[24px] text-white h-[54px] w-[215px] hover:bg-gray-200"></Button>
          </div>
      </div>
      </template>
  </Dialog>
</template>

<script setup>

const props = defineProps({
  message: String,
  confirmBtn: String,
  cancelBtn: String,
  IsActive: Boolean
})
const confirm = reactive({
  visible: ref(false),
  confirmBtn: ref(),
  cancelBtn: ref()
})
// const visible = ref(false);
const SetDefault = () => {
  if(props.confirmBtn == undefined || props.confirmBtn == ""){
    console.log("confirmBtn");
    confirm.confirmBtn = "Confirm"
  }else{
    confirm.confirmBtn = props.confirmBtn
  }
  if(props.cancelBtn == undefined || props.cancelBtn == ""){
    console.log("cancelBtn");
    confirm.cancelBtn = "Cancel"
  }else{
    confirm.cancelBtn = props.cancelBtn
  }
}

const emit = defineEmits(['confirmFunc'])

const callOnFunc = (value) => {
  emit('confirmFunc',value)
}

SetDefault();

watch( 
  () => props.IsActive,
  () => {
    if(props.IsActive){
      confirm.visible = true
    }else{
      confirm.visible = false
    }
})
</script>