<template>
  <div id="app">
    <menu-bar></menu-bar>

    <router-view id="main"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import menuBar from "@/components/menuBar/index.vue";

@Component({
  components: {
    menuBar
  }
})
export default class ClassName extends Vue {}
</script>

<style lang="less">
</style>
