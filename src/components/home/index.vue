<!--首页页面-->

<template>
  <section class="content-box-container">
    <b-motormap></b-motormap>
  </section>
</template>

<script>
  import BMotormap from '@/components/basis/BApollo/MotorMap'

  export default {
    name: "index",
    components: {
      BMotormap
    }
  }
</script>

<style type="text/css" scoped>

</style>
