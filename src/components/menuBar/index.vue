<template>
  <div class="menu" id="menu">
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
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import userInfo from "@/components/userInfo/index.vue";

@Component({
  components: {
    userInfo
  }
})

export default class ClassName extends Vue {
	private navList: Array<Object> = [{
    id: 1,
    name: 'Home',
    icon: 'home',
    urlName: 'home'
  }, {
    id: 2,
    name: 'Archives',
    icon: 'archives',
    urlName: 'archives'
  }, {
    id: 3,
    name: 'Tags',
    icon: 'tags',
    urlName: 'tags'
  }, {
    id: 4,
    name: 'Github',
    icon: 'github',
    urlName: 'github'
  }, {
    id: 5,
    name: 'Weibo',
    icon: 'weibo',
    urlName: 'weibo'
  }];
  private activeMenu: string = 'Home';

  @Watch("$route")
  routeChange(val: any, oldVale: any) {
    if (val.name == this.activeMenu) return; 
    this.activeMenu = val.name;
    // console.log(val)
  }

  mounted(): void {
    // console.log(this.$route)
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
