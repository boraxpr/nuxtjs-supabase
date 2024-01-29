<script setup lang="ts">
const props = defineProps({
  error: Object,
});

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <div>
    Hi!
    <!-- <h2>{{ error.statusCode }}</h2> -->
    <!-- <button @click="handleError">Clear errors</button> -->
  </div>
</template>
