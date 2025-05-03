<template>
  <div class="p-3">
    <div class="rounded-2xl p-3">
      <Carousel
        :value="channels"
        :numVisible="4"
        :numScroll="1"
        :responsiveOptions="responsiveOptions"
        circular
        :autoplayInterval="10000"
        :showIndicators="false"
      >
        <template #item="slotProps">
          <NuxtLink
            :to="`/channel/${slotProps.data.id}`"
            class="flex justify-center bg-gray-50 cursor-pointer shadow-2xl rounded-2xl flex-col items-center m-2 p-4"
          >
            <div class="mb-4">
              <div class="relative mx-auto">
                <img
                  src="@/public/test.jpg"
                  :alt="slotProps.data.name"
                  class="rounded w-50 h-50"
                />
              </div>
            </div>
            <div class="mb-4 font-medium">{{ slotProps.data.name }}</div>
            <div class="flex justify-between items-center">
              <span>
                <Button icon="pi pi-heart" severity="secondary" outlined />
                <Button icon="pi pi-shopping-cart" class="ml-2" />
              </span>
            </div>
          </NuxtLink>
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script setup>
const channels = ref([
  { image: "", name: "test", id: 1 },
  { image: "", name: "test", id: 2 },
  { image: "", name: "test", id: 3 },
  { image: "", name: "test", id: 4 },
  { image: "", name: "test", id: 5 },
]);
const responsiveOptions = ref([
  {
    breakpoint: "1400px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "1199px",
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "767px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
    numScroll: 1,
  },
]);

const getSeverity = (status) => {
  switch (status) {
    case "INSTOCK":
      return "success";

    case "LOWSTOCK":
      return "warn";

    case "OUTOFSTOCK":
      return "danger";

    default:
      return null;
  }
};
</script>
