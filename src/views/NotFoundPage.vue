<template>
  <div class="not-found">
    <h1>404</h1>
    <h2>{{ $t("pages.404.description") }}</h2>
    <h3>
      <router-link :to="{ name: 'Home' }">{{
        $t("pages.404.back-link")
      }}</router-link>
    </h3>
  </div>
</template>

<style scoped lang="scss">
.not-found {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  margin: 0;
  font-size: 130px;
  line-height: 130px;
}

h2 {
  font-size: 50px;
  line-height: 50px;
}
</style>
