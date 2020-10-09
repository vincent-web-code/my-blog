<template>
  <div id="menu" :class="isSmall && showMenu ? 'show' : (!isSmall && closeStatus ? 'hide': (isSmall && closeStatus ? 'hide' : ''))">
    <div class="inner flex-row-vertical">
      <!-- 删除按钮-->
      <div class="header-icon waves-effect waves-circle waves-light" id="menu-off" @click="handleHide">
        <i class="icon icon-lg icon-close"></i>
      </div>

      <!-- 用户信息 -->
      <user-info></user-info>

      <!-- 菜单 -->
      <div class="scroll-wrap flex-col">
        <ul class="nav">
          <li 
            v-for="item in navList"
            :key="item.id"
            class="waves-block waves-effect"
            :class="activeMenu == item.urlName ? 'active' : ''"
          >
            <span @click="toPath(item.urlName)">
              <i class="icon icon-lg" :class="`icon-${item.icon}`"></i>
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { navList } from '../../configs/navList'
import { Component, Vue, Watch, Prop, Emit } from "vue-property-decorator";
import userInfo from "@/components/userInfo/index.vue";
import headerNav from "@/components/header/index.vue";

@Component({
  components: {
    userInfo,
    headerNav
  }
})

export default class ClassName extends Vue {
	private navList: Array<Object> = navList;  // 菜单列表
  private activeMenu: string = 'Home';  // 菜单高亮


  @Prop() private showMenu!:boolean;
  @Prop() private isSmall!:boolean;
  @Prop() private closeStatus!:boolean;
  
  @Emit("hideMenu") hideMenu(bool:boolean){};
  @Emit("showMenu") showMenuFun(bool:boolean){};

  @Watch("$route")
  routeChange(val: any, oldVal: any) {
    if (val.name == this.activeMenu) return; 
    this.activeMenu = val.name;
  }

  // 隐藏菜单
  private handleHide() {
    this.hideMenu(false);
  }

  // 显示菜单
  private handleShow(){
    this.showMenuFun(true)
  }


  private toPath(url: string):void {
    if (url == this.activeMenu) return;
    if (url == 'home' || url == 'archives' || url == 'tags') {
      this.$router.push({
        name: url
      })
    }
    
  }
}
</script>

<style lang="less" scope>
.menu {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 66;
  width: 240px;
  min-height: 100%;
  background-color: #ffffff;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16);
}
</style>
