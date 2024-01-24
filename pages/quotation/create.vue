<template>
  <div>
    <div class="w-full shadow-lg bg-card m-5">
      <form>
        <div
          class="w-9/12 print:w-11/12 mx-auto p-2 m-10 mt-2 mb-0 pb-0 flex flex-row justify-between"
        >
          <!-- Header -->
          <div>
            <div className="text-left text-2xl print:">Create Quotation</div>
          </div>
          <div>
            <!-- ฺButtons -->
            <div class="grid grid-cols-3 gap-2 print:hidden">
              <Button>TEST</Button>
              <Button />
            </div>
          </div>
        </div>
        <div
          class="w-9/12 print:w-11/12 mx-auto p-4 m-2 bg-white shadow-md rounded-md border"
        >
          <div class="m-5 mt-0 flex flex-row justify-between space-x-5">
            <div class="w-1/2">
              <div class="mb-4 w-1/2 space-y-2"></div>
            </div>
            <div class="w-[40%]">
              <div class="mb-4 space-y-2">
                <div class="mb-4"></div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="w-9/12 print:w-11/12 mx-auto p-4 m-2 bg-card shadow-md rounded-md border"
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
          class="w-9/12 print:w-11/12 mx-auto pb-10 bg-card grid grid-flow-col gap-4"
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
      </form>
    </div>
  </div>
</template>

<script setup></script>
