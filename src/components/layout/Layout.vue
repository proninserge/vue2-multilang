<template>
  <div class="content">
    <Header v-if="$route.name !== '404' && $route.name !== 'Login'" />
    <el-main>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </el-main>
    <Footer v-if="$route.name !== '404' && $route.name !== 'Login'" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HeaderComponent from "@/components/layout/HeaderComponent.vue";
import FooterComponent from "@/components/layout/FooterComponent.vue";

@Component({
  components: {
    Header: HeaderComponent,
    Footer: FooterComponent,
  },
})
export default class Layout extends Vue {}
</script>

<style scoped lang="scss">
.content {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
.el-main {
  overflow: hidden;
}
.fade-enter-active {
  animation: slidePageIn 1s forwards;
  animation-timing-function: cubic-bezier(0.8, -0.49, 0.36, 1);
}

.fade-leave-active {
  animation: slidePageDown 1s forwards;
  animation-timing-function: cubic-bezier(0.8, -0.49, 0.36, 1);
}

@keyframes slidePageIn {
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0%);
  }
}

@keyframes slidePageDown {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.1;
    transform: translateY(100%);
  }
}
</style>
