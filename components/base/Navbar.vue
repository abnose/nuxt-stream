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
        <div class="flex items-center gap-5 cursor-pointer">
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
<style lang="scss">
.day-night {
  cursor: pointer;
  // position: absolute;
  right: 20px;
  top: 20px;
  opacity: 0.5;

  input {
    display: none;

    & + div {
      border-radius: 50%;
      width: 20px;
      height: 20px;
      position: relative;
      box-shadow: inset 8px -8px 0 0 var(--text-color);
      transform: scale(1) rotate(-2deg);
      transition: box-shadow 0.5s ease 0s, transform 0.4s ease 0.1s;

      &:before {
        content: "";
        width: inherit;
        height: inherit;
        border-radius: inherit;
        position: absolute;
        left: 0;
        top: 0;
        transition: background-color 0.3s ease;
      }

      &:after {
        content: "";
        width: 6px;
        height: 6px;
        border-radius: 50%;
        margin: -3px 0 0 -3px;
        position: absolute;
        top: 50%;
        left: 50%;
        box-shadow: 0 -23px 0 var(--text-color), 0 23px 0 var(--text-color),
          23px 0 0 var(--text-color), -23px 0 0 var(--text-color),
          15px 15px 0 var(--text-color), -15px 15px 0 var(--text-color),
          15px -15px 0 var(--text-color), -15px -15px 0 var(--text-color);
        transform: scale(0);
        transition: all 0.3s ease;
      }
    }

    &:checked + div {
      box-shadow: inset 20px -20px 0 0 var(--text-color);
      transform: scale(0.5) rotate(0deg);
      transition: transform 0.3s ease 0.1s, box-shadow 0.2s ease 0s;

      &:before {
        background: var(--text-color);
        transition: background-color 0.3s ease 0.1s;
      }

      &:after {
        transform: scale(1);
        transition: transform 0.5s ease 0.15s;
      }
    }
  }
}
</style>
