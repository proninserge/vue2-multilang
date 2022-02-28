<template>
  <div id="app">
    <Layout />
  </div>
</template>

<script>
import Layout from "@/components/layout/Layout.vue";

export default {
  name: "App",
  components: {
    Layout,
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.el-main {
  flex: 1;
}
</style>
