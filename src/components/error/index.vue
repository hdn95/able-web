<template>
  <section class="notFind-container">
    <img src="../../assets/404.png" height="200" width="200"/>

    <section style="font-size: .85rem">{{$t('ErrorPage.errText')}}
      <router-link :to="{path:'/'}"
                   tag="span" style="color: #3a8ee6;cursor: pointer">{{$t('Home.title')}}
      </router-link>
    </section>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "index"
  }
</script>

<style type="text/css" scoped>
  .notFind-container {
    width: 100%;
    height: 35rem;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
