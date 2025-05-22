<template>
  <div class="flex justify-center items-start gap-3">
    <!-- Stream Content Section -->
    <div class="py-3 ml-2 px-0 content flex flex-col gap-4 relative">
      <div class="flex-1 rounded-xl shadow overflow-hidden relative">
        <!-- Video Placeholder -->
        <div
          class="w-full h-full aspect-video bg-white/50 flex items-center justify-center text-sky-500 text-2xl"
        >
          Live Stream Video
        </div>

        <!-- Spinner Overlay -->
        <div
          v-if="loading"
          class="absolute inset-0 bg-white/70 flex items-center justify-center rounded-xl z-50"
        >
          <svg
            class="animate-spin h-10 w-10 text-sky-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        </div>
      </div>

      <!-- Stream Info -->
      <div
        class="bg-white/50 rounded-xl shadow p-4 flex gap-2 justify-between relative"
      >
        <div>
          <h2 class="text-xl font-bold text-gray-800">
            {{ channelDetail?.channel?.title }}
          </h2>
          <p class="text-sm text-gray-600">
            {{ channelDetail?.channel?.description }}
          </p>
          <div class="flex items-center gap-2 mt-2">
            <div
              class="w-3 h-3 rounded-full"
              :class="
                channelDetail?.channel?.isOnline
                  ? 'bg-green-500'
                  : 'bg-gray-400'
              "
            ></div>
            <span class="text-sm text-sky-700 font-medium">{{
              channelDetail?.channel?.username
            }}</span>
          </div>
        </div>
        <div class="relative">
          <button
            v-if="user.token"
            class="mt-3 self-start bg-sky-500 text-white px-4 py-1 rounded hover:bg-sky-600 transition disabled:opacity-50"
            @click="toggleFollow"
            :disabled="loading"
          >
            {{ isFollowing ? "Unfollow" : "Follow" }}
          </button>
        </div>
        <div
          v-if="loading"
          class="absolute inset-0 bg-white/70 flex items-center justify-center rounded-xl z-50"
        >
          <svg
            class="animate-spin h-5 w-5 text-sky-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        </div>
      </div>
    </div>

    <!-- Chat Section -->
    <div class="py-3 px-0 mr-1 chat flex justify-center items-start relative">
      <div
        class="w-full relative h-full bg-white/50 shadow cursor-pointer overflow-hidden rounded-xl flex-col items-center p-4"
      >
        <!-- Chat would go here -->
        <div
          v-if="loading"
          class="absolute inset-0 bg-white/70 flex items-center justify-center rounded-xl z-50"
        >
          <svg
            class="animate-spin h-10 w-10 text-sky-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "~/stores/user";

const user = useUserStore();
const token = computed(() => user.token);
const route = useRoute();
const { channelId } = route.params;

const channelDetail = ref(null);
const loading = ref(false);
const error = ref(null);
const isFollowing = ref(false);

// Fetch channel details when token changes (or on mount)
watch(
  token,
  async (newToken) => {
    loading.value = true;
    error.value = null;

    try {
      const headers = newToken ? { Authorization: `Bearer ${newToken}` } : {};
      const response = await $fetch(`/channel/detail/${channelId}`, {
        headers,
      });
      channelDetail.value = response;

      // Set isFollowing from response if exists
      isFollowing.value = !!response?.channel?.isFollowed;
    } catch (err) {
      console.error("Error fetching channel detail:", err);
      error.value = err;
      channelDetail.value = null;
      isFollowing.value = false;
    } finally {
      loading.value = false;
    }
  },
  { immediate: true }
);

const followEndpoint = `/channel/${channelId}/follow`;
const unfollowEndpoint = `/channel/${channelId}/unfollow`;

const toggleFollow = async () => {
  if (!token.value) {
    alert("You must be logged in to follow a channel.");
    return;
  }

  try {
    const url = isFollowing.value ? unfollowEndpoint : followEndpoint;
    await $fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    isFollowing.value = !isFollowing.value;
  } catch (err) {
    console.error("Error toggling follow:", err);
    alert("An error occurred while updating follow status.");
  }
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
