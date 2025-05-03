<template>
  <div class="card">
    <Menubar :model="items">
      <template #start>
        <!-- Logo -->

        <Button
          icon="pi pi-bars"
          severity="primary"
          variant="text"
          rounded
          raised
          @click="visible = true"
        />
      </template>
      <template #item="{ item, props, hasSubmenu, root }">
        <a v-ripple class="flex items-center" v-bind="props.action">
          <span>{{ item.label }}</span>
          <Badge
            v-if="item.badge"
            :class="{ 'ml-auto': !root, 'ml-2': root }"
            :value="item.badge"
          />
          <span
            v-if="item.shortcut"
            class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1"
            >{{ item.shortcut }}</span
          >
          <i
            v-if="hasSubmenu"
            :class="[
              'pi pi-angle-down ml-auto',
              { 'pi-angle-down': root, 'pi-angle-right': !root },
            ]"
          ></i>
        </a>
      </template>
      <template #end>
        <div class="flex items-center gap-2 cursor-pointer">
          <InputText
            placeholder="Search"
            type="text"
            class="w-[25em] sm:w-auto"
          />
          <Avatar
            @click="toggle"
            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            shape="circle"
          />
        </div>
      </template>
    </Menubar>

    <Popover ref="op">
      <ul class="list-none p-0 m-0 flex flex-col gap-1">
        <li
          v-for="item in navItems"
          :key="item.name"
          class="flex items-center w-[15.5em] text-sm cursor-pointer"
        >
          <div
            class="flex w-full justify-between items-center p-2 hover:bg-gray-100 rounded-xl"
          >
            <span class="font-medium">{{ item.name }}</span>
            <i :class="`pi ${item.icon}`"></i>
          </div>
        </li>
      </ul>
    </Popover>

    <Drawer
      v-model:visible="visible"
      header="Drawer"
      class="!w-full md:!w-80 lg:!w-[30rem]"
    >
      <ChannelsList />
    </Drawer>
  </div>
</template>

<script setup>
import ChannelsList from "@/components/ChannelsList.vue";
import { ref } from "vue";
const visible = ref(false);

const op = ref();
const toggle = (event) => {
  op.value.toggle(event);
};
const items = ref([
  {
    label: "Home",
    icon: "pi pi-home",
  },
]);
const navItems = ref([
  {
    name: "Dashboard",
    icon: "pi-cog",
  },
  {
    name: "Logout",
    icon: "pi-sign-out",
  },
]);
</script>
