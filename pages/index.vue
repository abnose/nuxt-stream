<template>
  <div class="p-3">
    <div v-if="loading" class="text-center p-6">
      <span class="loader" />
    </div>

    <div v-else-if="error" class="text-red-500 text-center p-6">
      Failed to load channels.
    </div>
    <div class="rounded-2xl p-3">
      <Carousel
        :value="data?.channels"
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
            class="flex justify-center bg-gray-50/70 cursor-pointer rounded-2xl flex-col items-center m-2 p-4"
          >
            <div
              class="card min-w-[400px] overflow-hidden"
              :style="{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.9)), url(${slotProps.data.avatarUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }"
            >
              <!-- <img
                class="absolute top-0 left-0 opacity-50"
                :src="slotProps.data.avatarUrl"
                alt="Avatar"
                width="400"
              /> -->
              <span class="icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.5 9.5V5.5C4.5 4.94772 4.94772 4.5 5.5 4.5H9.5C10.0523 4.5 10.5 4.94772 10.5 5.5V9.5C10.5 10.0523 10.0523 10.5 9.5 10.5H5.5C4.94772 10.5 4.5 10.0523 4.5 9.5Z"
                  />
                  <path
                    d="M13.5 18.5V14.5C13.5 13.9477 13.9477 13.5 14.5 13.5H18.5C19.0523 13.5 19.5 13.9477 19.5 14.5V18.5C19.5 19.0523 19.0523 19.5 18.5 19.5H14.5C13.9477 19.5 13.5 19.0523 13.5 18.5Z"
                  />
                  <path d="M4.5 19.5L7.5 13.5L10.5 19.5H4.5Z" />
                  <path
                    d="M16.5 4.5C18.1569 4.5 19.5 5.84315 19.5 7.5C19.5 9.15685 18.1569 10.5 16.5 10.5C14.8431 10.5 13.5 9.15685 13.5 7.5C13.5 5.84315 14.8431 4.5 16.5 4.5Z"
                  />
                </svg>
              </span>
              <h4>{{ slotProps.data.title }}</h4>
              <p>{{ slotProps.data.description }}</p>
              <div class="shine"></div>
              <div class="background">
                <div class="tiles">
                  <div class="tile tile-1"></div>
                  <div class="tile tile-2"></div>
                  <div class="tile tile-3"></div>
                  <div class="tile tile-4"></div>

                  <div class="tile tile-5"></div>
                  <div class="tile tile-6"></div>
                  <div class="tile tile-7"></div>
                  <div class="tile tile-8"></div>

                  <div class="tile tile-9"></div>
                  <div class="tile tile-10"></div>
                </div>

                <div class="line line-1"></div>
                <div class="line line-2"></div>
                <div class="line line-3"></div>
              </div>
            </div>
          </NuxtLink>
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script setup>
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

const {
  data,
  error,
  pending: loading,
} = useFetch("/channel/get-channels", {
  method: "GET",
});

console.log(error.value, data.value, loading.value);
</script>
<style lang="scss">
.card {
  aspect-ratio: 4 / 3; /* Example ratio */
}
.card {
  height: 250px; /* adjust as needed */
}
.card {
  background-color: var(--background-color);
  box-shadow: 0px var(--card-box-shadow-1-y) var(--card-box-shadow-1-blur)
      var(--card-box-shadow-1),
    0px var(--card-box-shadow-2-y) var(--card-box-shadow-2-blur)
      var(--card-box-shadow-2),
    0 0 0 1px var(--card-border-color);
  padding: 56px 16px 16px 16px;
  border-radius: 15px;
  cursor: pointer;
  position: relative;
  transition: box-shadow 0.25s;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 15px;
    background-color: var(--card-background-color);
  }

  .icon {
    z-index: 2;
    position: relative;
    display: table;
    padding: 8px;

    &::after {
      content: "";
      position: absolute;
      inset: 4.5px;
      border-radius: 50%;
      background-color: var(--card-icon-background-color);
      border: 1px solid var(--card-icon-border-color);
      backdrop-filter: blur(2px);
      transition: background-color 0.25s, border-color 0.25s;
    }

    svg {
      position: relative;
      z-index: 1;
      display: block;
      width: 24px;
      height: 24px;
      transform: translateZ(0);
      color: var(--card-icon-color);
      transition: color 0.25s;
    }
  }

  h4 {
    z-index: 2;
    position: relative;
    margin: 12px 0 4px 0;
    font-family: inherit;
    font-weight: 600;
    font-size: 14px;
    line-height: 2;
    color: var(--card-label-color);
  }

  p {
    z-index: 2;
    position: relative;
    margin: 0;
    font-size: 14px;
    line-height: 1.7;
    color: var(--text-color);
  }

  .shine {
    border-radius: inherit;
    position: absolute;
    inset: 0;
    z-index: 1;
    overflow: hidden;
    opacity: 0;
    transition: opacity 0.5s;

    &:before {
      content: "";
      width: 150%;
      padding-bottom: 150%;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      bottom: 55%;
      filter: blur(35px);
      opacity: var(--card-shine-opacity);
      transform: translateX(-50%);
      background-image: var(--card-shine-gradient);
    }
  }

  .background {
    border-radius: inherit;
    position: absolute;
    inset: 0;
    overflow: hidden;
    -webkit-mask-image: radial-gradient(
      circle at 60% 5%,
      black 0%,
      black 15%,
      transparent 60%
    );
    mask-image: radial-gradient(
      circle at 60% 5%,
      black 0%,
      black 15%,
      transparent 60%
    );

    .tiles {
      opacity: 0;
      transition: opacity 0.25s;

      .tile {
        position: absolute;
        background-color: var(--card-tile-color);
        animation-duration: 8s;
        animation-iteration-count: infinite;
        opacity: 0;

        &.tile-4,
        &.tile-6,
        &.tile-10 {
          animation-delay: -2s;
        }

        &.tile-3,
        &.tile-5,
        &.tile-8 {
          animation-delay: -4s;
        }

        &.tile-2,
        &.tile-9 {
          animation-delay: -6s;
        }

        &.tile-1 {
          top: 0;
          left: 0;
          height: 10%;
          width: 22.5%;
        }

        &.tile-2 {
          top: 0;
          left: 22.5%;
          height: 10%;
          width: 27.5%;
        }

        &.tile-3 {
          top: 0;
          left: 50%;
          height: 10%;
          width: 27.5%;
        }

        &.tile-4 {
          top: 0;
          left: 77.5%;
          height: 10%;
          width: 22.5%;
        }

        &.tile-5 {
          top: 10%;
          left: 0;
          height: 22.5%;
          width: 22.5%;
        }

        &.tile-6 {
          top: 10%;
          left: 22.5%;
          height: 22.5%;
          width: 27.5%;
        }

        &.tile-7 {
          top: 10%;
          left: 50%;
          height: 22.5%;
          width: 27.5%;
        }

        &.tile-8 {
          top: 10%;
          left: 77.5%;
          height: 22.5%;
          width: 22.5%;
        }

        &.tile-9 {
          top: 32.5%;
          left: 50%;
          height: 22.5%;
          width: 27.5%;
        }

        &.tile-10 {
          top: 32.5%;
          left: 77.5%;
          height: 22.5%;
          width: 22.5%;
        }
      }
    }

    @keyframes tile {
      0%,
      12.5%,
      100% {
        opacity: 1;
      }

      25%,
      82.5% {
        opacity: 0;
      }
    }

    .line {
      position: absolute;
      inset: 0;
      opacity: 0;
      transition: opacity 0.35s;

      &:before,
      &:after {
        content: "";
        position: absolute;
        background-color: var(--card-line-color);
        transition: transform 0.35s;
      }

      &:before {
        left: 0;
        right: 0;
        height: 1px;
        transform-origin: 0 50%;
        transform: scaleX(0);
      }

      &:after {
        top: 0;
        bottom: 0;
        width: 1px;
        transform-origin: 50% 0;
        transform: scaleY(0);
      }

      &.line-1 {
        &:before {
          top: 10%;
        }

        &:after {
          left: 22.5%;
        }

        &:before,
        &:after {
          transition-delay: 0.3s;
        }
      }

      &.line-2 {
        &:before {
          top: 32.5%;
        }

        &:after {
          left: 50%;
        }

        &:before,
        &:after {
          transition-delay: 0.15s;
        }
      }

      &.line-3 {
        &:before {
          top: 55%;
        }

        &:after {
          right: 22.5%;
        }
      }
    }
  }

  &:hover {
    box-shadow: 0px 3px 6px var(--card-hover-box-shadow-1),
      0px var(--card-hover-box-shadow-2-y) var(--card-hover-box-shadow-2-blur)
        var(--card-hover-box-shadow-2),
      0 0 0 1px var(--card-hover-border-color);

    .icon {
      &::after {
        background-color: var(--card-hover-icon-background-color);
        border-color: var(--card-hover-icon-border-color);
      }

      svg {
        color: var(--card-hover-icon-color);
      }
    }

    .shine {
      opacity: 1;
      transition-duration: 0.5s;
      transition-delay: 0s;
    }

    .background {
      .tiles {
        opacity: 1;
        transition-delay: 0.25s;

        .tile {
          animation-name: tile;
        }
      }

      .line {
        opacity: 1;
        transition-duration: 0.15s;

        &:before {
          transform: scaleX(1);
        }

        &:after {
          transform: scaleY(1);
        }

        &.line-1 {
          &:before,
          &:after {
            transition-delay: 0s;
          }
        }

        &.line-2 {
          &:before,
          &:after {
            transition-delay: 0.15s;
          }
        }

        &.line-3 {
          &:before,
          &:after {
            transition-delay: 0.3s;
          }
        }
      }
    }
  }
}
</style>
