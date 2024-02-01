<script></script>

<template>
  <section class="bg-background font-sans antialiased min-h-screen relative">
    <img src="assets/img/imageBG.png" class="w-full h-full min-h-screen" />
    <div
      class="absolute flex w-full h-full justify-center items-center top-0 bg-transparent"
    >
      <div
        class="flex flex-col bg-white rounded-3xl p-14 max-w-xl min-w-[589px]"
      >
        <div class="flex justify-center">
          <img src="assets/img/SphereLogo.png" class="w-96 h-14 object-cover" />
        </div>

        <slot class="flex flex-col"></slot>
      </div>
    </div>
  </section>
</template>
