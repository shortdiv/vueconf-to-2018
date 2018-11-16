<template>
  <div class="loading-card">
    <div v-if="timer" class="loading-mug">
      <Mug />
      <h1>Brewing in Progress</h1>
      <span v-for="(ellipsis, idx) in 3" :key="`${ellipsis}--${idx}`"> . </span>
    </div>
    <svg
      v-else
      class="success-circle"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
    >
      <circle
        class="success-circle__circle"
        cx="26"
        cy="26"
        r="25"
        fill="none"
      />
      <path
        class="success-circle__check"
        fill="none"
        d="M14.1 27.2l7.1 7.2 16.7-16.8"
      />
    </svg>
    <slot></slot>
  </div>
</template>

<script>
import Mug from "./fog/Mug.vue";

export default {
  name: "LoadingCard",
  components: {
    Mug
  },
  data() {
    return {
      timer: null
    };
  },
  methods: {
    removeNotification() {
      clearTimeout(this.timer);
      this.timer = null;
    }
  },
  mounted() {
    this.timer = setTimeout(this.removeNotification, 5000);
  }
};
</script>

<style lang="scss" scoped>
@mixin load-ellipsis($duration, $delay) {
  animation: move-and-fade $duration linear infinite;
  animation-delay: $delay;
  @keyframes move-and-fade {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
}
.loading-card {
  background-color: #6e4228d6;
  text-align: center;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  z-index: 10;
}
.loading-mug {
  position: relative;
  top: 40%;
}
h1,
span {
  color: wheat;
  display: inline;
  font-size: 2em;
}
span {
  opacity: 1;
  @include load-ellipsis(2.5s, 0.5s);
  &:nth-child(2n) {
    @include load-ellipsis(2.5s, 1s);
  }
  &:last-child {
    @include load-ellipsis(2.5s, 1.5s);
  }
}

svg {
  position: relative;
  top: 30%;
}
</style>
