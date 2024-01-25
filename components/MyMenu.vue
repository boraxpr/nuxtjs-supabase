<template>
  <div class="card flex justify-content-center">
    <Menu :model="items" class="w-full md:w-15rem">
      <template #start>
        <div class="text-center">
          <span class="inline-flex items-center gap-1 px-2 py-2">
            <img src="~assets/Whitecopy.svg" width="100vw" />
          </span>
          <span class="text-xl font-semibold text-[#f47424]"
            >SPHERE<span class="text-primary text-black">SOFT</span></span
          >
        </div>
      </template>
      <template #submenuheader="{ item }">
        <span class="text-primary font-bold">{{ item.label }}</span>
      </template>
      <template #item="{ item, props }">
        <router-link
          v-if="item.route"
          v-slot="{ href, navigate }"
          :to="item.route"
          custom
        >
          <a
            v-ripple
            class="flex align-items-center"
            :href="href"
            @click="navigate"
            v-bind="props.action"
          >
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
            <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
            <span
              v-if="item.shortcut"
              class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1"
              >{{ item.shortcut }}</span
            >
          </a>
        </router-link>
      </template>
      <template #end>
        <button
          v-ripple
          class="relative overflow-hidden w-full p-link flex align-items-center p-2 pl-3 text-color hover:surface-200 border-noround"
        >
          <Avatar
            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            class="mr-2"
            shape="circle"
          />
          <span class="inline-flex flex-column">
            <span class="font-bold">Amy Elsner</span>
            <span class="text-sm">Admin</span>
          </span>
        </button>
      </template>
    </Menu>
  </div>
</template>

<script setup>
import { ref } from "vue";

const items = ref([
  {
    separator: true,
  },
  {
    label: "Quotation",
    items: [
      {
        label: "New",
        icon: "pi pi-plus",
        route: "/quotation/create",
      },
      {
        label: "List",
        icon: "pi pi-search",
        route: "/quotation/",
      },
    ],
  },
  {
    label: "Product",
    items: [
      {
        label: "New",
        icon: "pi pi-plus",
        route: "/products/create",
      },
      {
        label: "List",
        icon: "pi pi-search",
        route: "/products/",
      },
    ],
  },
  {
    separator: true,
  },
]);
</script>
