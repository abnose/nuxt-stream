<template>
  <div class="w-full h-full overflow-y-scroll">
    <ul class="list-none p-0 m-0 flex flex-col gap-1">
      <li
        v-for="item in followedChannels"
        :key="item.id"
        class="flex items-center text-sm cursor-pointer mr-1"
      >
        <div
          class="flex w-full justify-between items-center p-2 h-[5em] hover:bg-gray-50 rounded-xl"
        >
          <div class="flex gap-3 items-center">
            <Avatar
              label="V"
              class="mr-2"
              size="large"
              style="background-color: #ece9fc; color: #2a1261"
              shape="circle"
            />
            <span class="font-medium">{{ item.username }}</span>
          </div>
          <i
            v-if="!item.isOnline"
            v-tooltip.bottom="'Offline'"
            placeholder="Bottom"
            class="pi pi-power-off pr-2"
            style="color: lightcoral"
          ></i>
          <i
            v-else
            v-tooltip.bottom="'Online'"
            placeholder="Bottom"
            class="pi pi-wifi pr-2"
            style="color: green"
          ></i>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
const { isVisible = false } = defineProps();
const isDrawerVisible = ref(isVisible);
const followedChannels = [
  { id: 1, username: "Abnose", isOnline: false },
  { id: 2, username: "Negin", isOnline: true },
  { id: 3, username: "Reza", isOnline: false },
];
watch(
  () => isDrawerVisible,
  () => {
    console.log(isDrawerVisible.value);
  }
);
</script>
