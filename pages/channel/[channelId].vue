<!-- app.vue -->
<template>
  <div class="flex justify-center items-center gap-1">
    <div class="py-2 px-0 content flex justify-center items-center">
      <div
        class="flex justify-center h-full flex-1 bg-gray-50 shadow-2xl cursor-pointer rounded-xl flex-col items-center p-4"
      ></div>
    </div>
    <div class="py-2 px-0 chat flex justify-center items-center">
      <div
        class="flex justify-center h-full w-full bg-gray-50 shadow-2xl cursor-pointer rounded-xl flex-col items-center p-4"
      ></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  width: 75vw;
  height: calc(100vh - 60px);
}
.chat {
  width: 25vw;
  height: calc(100vh - 60px);
}
</style>
