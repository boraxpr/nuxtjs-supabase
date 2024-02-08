<script setup>
const user = useSupabaseUser();
watchEffect(() => {
  if (user.value) {
    navigateTo("/");
  } else {
    navigateTo("/login");
  }
});
</script>
<template>
  <div>Waiting for login...</div>
</template>
