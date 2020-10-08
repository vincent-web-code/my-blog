<template>
  <div id="app">
    <menu-bar 
      :showMenu="showMenu"
      :isSmall="isSmall"
      :closeStatus="closeStatus"
      @hideMenu="handleHideMenu"
      @showMenuFun="handleShowMenu"
    >
    </menu-bar>

    <div id="main">
      <header-nav
        @bindShowMenu="handleShowMenu"
      >
      </header-nav>

      <router-view />

    </div>
    <div class="mask" id="mask" :class="showMenu && isSmall ? 'in' : ''" @click="handleHideMenu(false)"></div>

    <!-- 返回顶部按钮 -->
    <a 
      class="waves-effect waves-circle waves-light" 
      :class="scrollTop > 300 ? 'in' : ''"
      id="gotop"
      href="#main"
    >
      <span class="icon icon-lg icon-chevron-up"></span>
    </a>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import menuBar from "@/components/menuBar/index.vue";
import headerNav from "@/components/header/index.vue"

@Component({
  components: {
    menuBar,
    headerNav
  }
})
export default class ClassName extends Vue {

  @Watch("screenWidth")
  widthChange(val:number, oldVal:number) {
    this.handleWidth(val, true)
  }

  private showMenu:boolean = true;
  private screenWidth:any = '';   // 窗口宽度
  private isSmall:boolean = false;  // 是否小屏
  private closeStatus:boolean = false;  // 是否关闭
  private scrollTop:number = 0;  // 滚动距离顶部的位置

  mounted(): void {
    window.onresize = () => {
      return (() => {
        this.screenWidth = window.innerWidth;
      })()
    }
    this.handleWidth(window.innerWidth);
    window.addEventListener('scroll', this.watchScroll)
  }

  handleShowMenu(bool:boolean) {
    if (this.screenWidth > 1240) {
      this.closeStatus = false;
    } 
    this.showMenu = bool; // true
  }

  handleHideMenu(bool:boolean) {
    if (this.screenWidth > 1240) {
      this.closeStatus = true;
    }
    this.showMenu = bool;  // false
  }

  handleWidth(width:number, watch?:boolean): void {
    this.screenWidth = width;
    if (this.screenWidth <= 1240) {
      if(watch) this.showMenu = false;
      this.isSmall = true;
    } else {
      this.isSmall = false;
    }
  }

  // 监听用户滑动
  watchScroll() {
    this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  }

  // 返回顶部
  goTop() {

  }
}
</script>

<style lang="less">
</style>
