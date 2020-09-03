<template>
  <div class="brand-wrap">
    <div class="brand">
      <a href="/" class="avatar waves-effect waves-circle waves-light">
        <img src="../../assets/images/headimg.png" alt="" />
      </a>
      <div class="introduce">
        <h5 class="nickname">
          Vincent
        </h5>
        <a href="mailto:947980793@qq.com" class="mail">
          947980793@qq.com
        </a>
      </div>
      
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ClassName extends Vue {}
</script>

<style lang="less" scope>
.brand-wrap {
  background-image: url("../../assets/images/brand.jpg");
}
</style>
