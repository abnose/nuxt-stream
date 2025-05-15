<template>
  <div
    :class="`customCard w-[${width}] relative flex flex-col justify-center items-center`"
  >
    <div class="flex justify-between px-5 w-full absolute top-0 left-[-70px]">
      <h4 style="">{{ header }}</h4>
    </div>
    <slot></slot>
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
</template>

<script setup lang="ts">
const props = defineProps<{
  header: string;
  icon?: string;
  width?: string;
}>();
</script>

<style lang="scss" scoped>
.customCard {
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

  h4 {
    writing-mode: sideways-rl;
    z-index: 2;
    position: relative;
    margin: 12px 0 4px 0;
    font-family: inherit;
    font-weight: 600;
    font-size: 24px;
    line-height: 2;
    color: var(--card-label-color);
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
