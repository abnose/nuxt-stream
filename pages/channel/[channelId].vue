<template>
  <div class="flex justify-center items-start gap-3">
    <!-- Stream Content Section -->
    <div class="py-3 ml-2 px-0 content flex flex-col gap-4">
      <div class="flex-1 rounded-xl shadow overflow-hidden relative">
        <!-- Video Placeholder -->
        <div
          class="w-full h-full aspect-video bg-white/50 flex items-center justify-center text-sky-500 text-2xl"
        >
          Live Stream Video
        </div>
      </div>

      <!-- Stream Info -->
      <div class="bg-white/50 rounded-xl shadow p-4 flex flex-col gap-2">
        <h2 class="text-xl font-bold text-gray-800">
          {{ channelDetail.title }}
        </h2>
        <p class="text-sm text-gray-600">{{ channelDetail.description }}</p>
        <div class="flex items-center gap-2 mt-2">
          <div
            class="w-3 h-3 rounded-full"
            :class="channelDetail.isOnline ? 'bg-green-500' : 'bg-gray-400'"
          ></div>
          <span class="text-sm text-sky-700 font-medium">{{
            channelDetail.username
          }}</span>
        </div>
      </div>
    </div>

    <!-- Chat Section -->
    <div class="py-3 px-0 mr-1 chat flex justify-center items-start">
      <div
        class="w-full h-full bg-white/50 shadow cursor-pointer rounded-xl flex-col items-center p-4"
      >
        <!-- Chat would go here -->
      </div>
    </div>
  </div>
</template>

<script setup>
const channelDetail = {
  id: 1,
  title: "Gaming Channel",
  description: "This is a gaming channel",
  username: "Gamer",
  isOnline: false,
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
