<script setup>
const supabase = useSupabaseClient();
const email = ref("");
const password = ref(""); // Add a separate variable for the password
const loading = ref(false);
useHead({
  title: "Login",
});
const signInWithPassword = async () => {
  loading.value = true;
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value, // Use the email variable
    password: password.value, // Use the password variable
  });

  if (error) {
    console.log(error);
    loading.value = false;
  }

  // // Redirect if authenticated
  if (useSupabaseUser().value) {
    return navigateTo({ path: "/confirm" });
  }
};
</script>

<template>
  <div class="flex flex-col space-y-5">
    <div class="flex gap-2 flex-col items-center">
      <div><label for="email">Email</label></div>
      <div>
        <InputText
          id="email"
          v-model="email"
          aria-describedby="email-help"
          class="border border-black"
        />
      </div>
    </div>
    <div class="flex flex-col gap-2 items-center">
      <label for="password">Password</label>
      <InputText
        id="password"
        v-model="password"
        aria-describedby="password-help"
        class="border border-black"
        type="password"
      />
    </div>

    <button @click="signInWithPassword" :disabled="loading.value">
      <div v-if="loading">
        <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
      </div>
      <div v-else>SIGN IN</div>
    </button>
  </div>
</template>
