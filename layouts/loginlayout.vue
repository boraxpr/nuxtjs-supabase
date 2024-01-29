<script></script>

<template>
  <section class="bg-background font-sans antialiased min-h-screen relative">
    <img src="assets/img/imageBG.png" class="w-full h-full min-h-screen" />
    <div
      class="absolute flex w-full h-full justify-center items-center top-0 bg-transparent"
    >
      <slot />
    </div>
  </section>
</template>
