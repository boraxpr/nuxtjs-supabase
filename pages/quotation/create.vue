<template>
  <div>
    <div class="w-full shadow-lg bg-card">
      <div
        class="w-11/12 print:w-11/12 mx-auto p-2 m-10 mt-2 mb-0 pb-0 flex flex-row justify-between"
      >
        <!-- Header -->
        <div>
          <div className="text-left text-3xl">Create Quotation</div>
        </div>
        <div class="grid grid-cols-3 gap-2 print:hidden">
          <Button
            id="printButton"
            raised
            class="justify-center"
            severity="info"
            rounded
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="print-icon"
            >
              <path
                class="fill1"
                d="M14 6V94H86V30.5H61.5V6H14Z"
                fill="#fff"
                strokeWidth="2px"
              />
              <path
                class="fill1"
                d="M86 30.5L61.5 6V30.5H86Z"
                fill="#fff"
                strokeWidth="2px"
              />
              <path
                class="stroke1"
                d="M86 30.5V94H14V6H61.5M86 30.5L61.5 6M86 30.5H61.5V6"
                stroke="#000"
                strokeWidth="2px"
              />
              <line
                class="line-file1-a stroke2"
                x1="27.5"
                y1="33"
                x2="48.5"
                y2="33"
                stroke="#000"
                strokeWidth="2px"
              />
              <line
                class="line-file1-b stroke2"
                x1="27.5"
                y1="53"
                x2="71.5"
                y2="53"
                stroke="#000"
                strokeWidth="2px"
              />
              <line
                class="line-file1-c stroke2"
                x1="27.5"
                y1="73"
                x2="71.5"
                y2="73"
                stroke="#000"
                strokeWidth="2px"
              />
            </svg>
          </Button>
          <Button
            label="Close"
            severity="danger"
            raised
            outlined
            rounded
            :onclick="() => navigateTo('/quotation')"
          />
          <Button label="Save" severity="success" raised outlined rounded />
        </div>
      </div>
      <div
        class="w-11/12 print:w-11/12 mx-auto p-4 m-2 shadow-md rounded-md border"
      >
        <div class="m-5 mt-0 flex flex-row justify-between space-x-5">
          <div class="w-1/2">
            <div class="mb-4 w-1/2 space-y-2">
              <Dropdown v-model="selectedCustomer"> </Dropdown>
            </div>
          </div>
          <div class="w-[40%]">
            <div class="mb-4 space-y-2">
              <div class="mb-4"></div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="w-11/12 print:w-11/12 mx-auto p-4 m-2 bg-card shadow-md rounded-md border"
      >
        <div class="flex flex-row space-x-3">
          <div class="mb-4 w-9/12">
            <div class="flex flex-row space-x-1 items-center"></div>
          </div>
          <div class="mb-4 w-3/12">
            <div class="flex flex-row space-x-1 items-center"></div>
          </div>
        </div>
        <div class="flex flex-row space-x-5 items-center"></div>
      </div>

      <div
        class="w-11/12 print:w-11/12 mx-auto pb-10 bg-card grid grid-flow-col gap-4"
      >
        <div class="flex flex-col col-span-1 space-y-5">
          <div></div>
          <div></div>
          <div class="border rounded-lg">
            <div class="m-5 flex flex-row justify-between"></div>
          </div>
          <div class="flex flex-row space-x-3 items-center"></div>
        </div>
        <div
          class="flex flex-col col-span-4 divide-y border shadow-lg rounded-lg"
        >
          <div class="m-5 divide-y-2">
            <div class="space-y-5">
              <div>Total</div>
              <div class="flex items-center">
                <span class="ml-1">%</span>
              </div>
              <div>Total After Discount</div>
              <div class="flex flex-row space-x-3 items-center"></div>
              <div>Grand Total</div>
            </div>
            <div class="pt-5">
              <div class="flex flex-row space-x-3 items-center"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "Quotation - Create",
});
const selectedCustomer = ref();
</script>
<style scoped>
.line-file1-a {
  stroke-dasharray: 110;
}
.line-file1-b {
  stroke-dasharray: 110;
  stroke-dashoffset: 120;
}
.line-file1-c {
  stroke-dasharray: 110;
  stroke-dashoffset: 120;
}

#printButton:hover .line-file1-a {
  animation: line-file1-draw-a 1.5s infinite;
}
#printButton:hover .line-file1-b {
  animation: line-file1-draw-b 1.5s 300ms infinite;
}
#printButton:hover .line-file1-c {
  animation: line-file1-draw-c 1.5s 600ms infinite;
}

@keyframes line-file1-draw-a {
  0% {
    stroke-dashoffset: 120;
  }
  20% {
    stroke-dashoffset: 120;
  }
  80% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: -110;
  }
}

@keyframes line-file1-draw-b {
  0% {
    stroke-dashoffset: 120;
  }
  20% {
    stroke-dashoffset: 120;
  }
  80% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: -110;
  }
}

@keyframes line-file1-draw-c {
  0% {
    stroke-dashoffset: 120;
  }
  20% {
    stroke-dashoffset: 120;
  }
  80% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: -110;
  }
}

@media (prefers-reduced-motion: reduce) {
  .line-file1-a,
  .line-file1-b,
  .line-file1-c {
    animation: none;
  }
}
</style>
