<script setup>
import Button from "primevue/button";

import "primeicons/primeicons.css";

const signOut = async () => {
  try {
    await useSupabaseClient().auth.signOut();
    navigateTo("/login");
  } catch (error) {
    console.error("Error signing out:", error.message);
  }
};
</script>
<template>
  <div class="w-screen h-screen flex justify-evenly">
    <div class="w-1/6 border-r border-black flex flex-col items-center">
      <div class="h-1/6 flex flex-col justify-center mt-9">
        <img src="~assets/Whitecopy.svg" width="100vw" />
        <div>
          <p class="text-center font-bold">
            <span class="text-[#f37221]">SPHERE</span>
            <span class="">SOFT</span>
          </p>
        </div>
      </div>
      <div class="h-5/6 flex flex-col justify-start space-y-5 mt-8">
        <Button class="justify-center">
          <NuxtLink to="/"> Dashboard </NuxtLink>
        </Button>
        <Button class="justify-center">
          <NuxtLink to="/quotation"> Quotations </NuxtLink>
        </Button>
        <Button class="justify-center">
          <NuxtLink to="/products"> products </NuxtLink>
        </Button>
      </div>
      <div v-if="!useSupabaseUser().value" class="justify-end mb-10">
        <Button class="justify-center">
          <NuxtLink to="/login">Login</NuxtLink>
        </Button>
      </div>
      <div v-else class="justify-end mb-10">
        <Button class="justify-center" @click="signOut"> Signout </Button>
      </div>
    </div>

    <div class="w-5/6 mt-10 mx-16">
      <div v-if="useRoute().path === '/'">
        <div class="card">
          <div class="flex flex-row justify-between">
            <div class="text-5xl font-extrabold">
              Welcome {{ useSupabaseUser().value.email.split("@")[0] }} !
            </div>
            <div class="">
              <Menubar class="bg-transparent">
                <template #item="{ item, props, hasSubmenu, root }">
                  <a
                    v-ripple
                    class="flex align-items-center"
                    v-bind="props.action"
                  >
                  </a>
                </template>
                <template #end>
                  <div class="flex align-items-center gap-2">
                    <InputText
                      placeholder="Search"
                      type="text"
                      class="w-8rem sm:w-auto"
                    />
                    <Avatar
                      image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                      shape="circle"
                    />
                  </div>
                </template>
              </Menubar>
            </div>
          </div>
        </div>
      </div>
      <div>
        <NuxtPage />
      </div>
    </div>
  </div>
</template>
<style></style>
