<template>
  <div class="">
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
          >
            {{ item.shortcut }}
          </span>
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
        <div v-if="user.token" class="flex items-center gap-2 cursor-pointer">
          <p class="text-xs">{{ user.username }}</p>
          <Avatar @click="toggle" :image="user.imgUrl" shape="circle" />
        </div>
      </template>
    </Menubar>

    <Popover ref="op" v-if="user.token">
      <PanelMenu :model="navItems" class="w-full md:w-70">
        <template #item="{ item }">
          <a
            v-if="!item.link"
            v-ripple
            :class="[
              'flex items-center px-4 py-2 text-xs cursor-pointer group',
            ]"
          >
            <span
              :class="[item.icon, 'text-primary group-hover:text-inherit']"
            />
            <span :class="['ml-2']">{{ item.label }}</span>
            <span
              v-if="item.items?.length"
              class="ml-auto pi pi-angle-down"
              :value="item.badge"
            />
            <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
          </a>
          <NuxtLink
            v-else
            :to="item.link"
            v-ripple
            :class="[
              'flex items-center px-4 py-2 text-xs cursor-pointer group',
            ]"
          >
            <span
              :class="[item.icon, 'text-primary group-hover:text-inherit']"
            />
            <span :class="['ml-2']">{{ item.label }}</span>
            <span
              v-if="item.items?.length"
              class="ml-auto pi pi-angle-down"
              :value="item.badge"
            />
            <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
          </NuxtLink>
        </template>
      </PanelMenu>
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
import { useUserStore } from "~/stores/user";
const user = useUserStore();
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
const toast = useToast();

const router = useRouter();
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
    label: "Dashboard",
    icon: "pi pi-cog",
    items: [
      {
        label: "Edit Profile",
        icon: "pi pi-user",
        link: "/profile/edit",
      },
      {
        label: "Change Password",
        icon: "pi pi-eye",
        link: "/profile/password",
      },
    ],
  },
  {
    label: "Logout",
    icon: "pi pi-sign-out",
    command: async () => {
      try {
        const res = await $fetch("/profile/logout", {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (res.success) {
          user.logout();
          message(toast, "Success", res.message || "Logout successfully.");
          router.push("/authentication/login");
        }
      } catch (err) {
        console.log(err);
        if (err?.data?.message) {
          message(toast, "Error", err.data.message);
        } else {
          message(toast, "Error", "Something went wrong.");
        }
      }
    },
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
