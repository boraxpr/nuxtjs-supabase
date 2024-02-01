<script setup>
const resetPassword = ref(false);

const clickResetPassword = () => {
  resetPassword.value = true;
};

definePageMeta({
  layout: "loginlayout",
});
</script>

<template>
  <div v-if="!resetPassword">
    <h1 class="mt-10 font-semibold">Enter your new password</h1>
    <div class="space-y-5 mt-7">
      <h5 class="text-muted-foreground text-lg text-[#4B4B4B] font-semibold">
        New password
      </h5>
      <span class="p-input-icon-left w-full flex items-center">
        <img src="/assets/img/padlock.png" class="absolute left-2 ml-4 mb-2" />
        <InputText
          id="password"
          v-model="password"
          aria-describedby="password-help"
          class="border w-full border-b-2 border-t-0 border-l-0 border-r-0 focus:shadow-none pl-20"
          type="password"
          size="large"
          required
          placeholder="Password"
        />
      </span>
      <p class="text-gray-400">your password must be [condition]</p>
      <span class="p-input-icon-left w-full flex items-center">
        <img src="/assets/img/padlock.png" class="absolute left-2 ml-4 mb-2" />
        <InputText
          id="password"
          v-model="password"
          aria-describedby="password-help"
          class="border w-full border-b-2 border-t-0 border-l-0 border-r-0 focus:shadow-none pl-20"
          type="password"
          size="large"
          required
          placeholder="Confirm Password"
        />
      </span>
    </div>
    <Button
      class="mt-6 text-center rounded-2xl h-16 justify-center w-full"
      @click="clickResetPassword"
    >
      <div v-if="loading">
        <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
      </div>
      <div v-else class="text-lg font-bold">Reset Password</div>
    </Button>
  </div>

  <div v-else>
    <h1 class="mt-10 font-semibold">Reset password successfully</h1>
    <div class="flex justify-center w-full mt-10 mb-4">
      <img src="/assets/img/success.png" sizes="100vw sm:50vw md:400px" />
    </div>
  </div>

  <NuxtLink to="/login">
    <div
      class="mt-6 text-center rounded-2xl h-16 justify-center w-full border-gray-400 border flex items-center hover:bg-black hover:text-white font-semibold"
    >
      Back to Login
    </div>
  </NuxtLink>
</template>
