<!-- app.vue -->
<template>
  <div class="flex justify-center items-center gap-3">
    <div class="py-3 ml-2 px-0 content flex justify-center items-center">
      <div
        class="flex justify-center h-full flex-1 bg-gray-50/70 shadow-xl border border-sky-300 cursor-pointer rounded-xl flex-col items-center p-4"
      ></div>
    </div>
    <div class="py-3 px-0 mr-1 chat flex justify-center items-center">
      <div
        class="flex justify-center h-full w-full bg-gray-50/70 shadow-xl border border-sky-300 cursor-pointer rounded-xl flex-col items-center p-4"
      ></div>
    </div>
  </div>
</template>
<script setup>
const channelDetail = {
  id: 1,
};
</script>
<style lang="scss" scoped>
.content {
  width: 75vw;
  height: calc(100vh - 60px);
}
.chat {
  overflow-y: scroll;
  width: 25vw;
  height: calc(100vh - 60px);
}
</style>
