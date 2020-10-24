<template>
  <div>
    <div class="tabs-bar container">
      <div class="tags-list">
        <a 
          class="tags-list-item waves-effect waves-button waves-light"
          :class="currentId == -1 ? 'active' : ''"
          @click="toTag(-1)"
        >全部</a>

        <a
          class="tags-list-item waves-effect waves-button waves-light"
          :class="currentId == tag._id ? 'active' : ''"
          v-for="(tag, index) in tagsList"
          :key="tag._id"
          @click="toTag(tag._id, index)"
        >
          {{ tag.name }}
        </a>
      </div>
      <div class="tags-list-more">
        <a class="action tags-list-item waves-effect waves-circle waves-light">
          <i class="icon icon-ellipsis-h"></i>
        </a>
      </div>
      
    </div>

    <div class="container body-wrap fade in">
      <div class="waterfall in">
        <div class="waterfall-item" v-for="(item, index) in articleList" :key="item._id" @click="toArticle(item._id, item.title)">
          <div class="article-card archive-article">
            <div class="post-meta">
              <span class="post-time">{{item.createDate | filterDate}}</span>
            </div>
            <h3 class="post-title">
              <a class="post-title-link">{{item.title}}</a>
            </h3>
            <div class="post-footer">
              <ul class="article-tag-list">
                <li class="article-tag-list-item" v-for="(tag, index) in item.categroyName" :key="index">
                  <a class="article-tag-list-link waves-effect waves-button">{{tag}}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { formatterDate } from "../../utils/date"

@Component({
  filters: {
    filterDate(val: string) {
      return val ? formatterDate(val, 'YYYY年MM月DD日') : ''
    },
  }
})
export default class tags extends Vue {
  private tagsList: Array<Object> = [];
  private list: Array<Object> = [];
  private articleList: Array<Object> = [];
  private firstId: String = '';
  private currentId: string = "-1";

  private created() {
    this.fetch();
  }

  private async fetch() {
    let res = await this.$http.get("/tagsList");
    this.tagsList = res;
    this.list = res;
    this.firstId = (this.list as any)[0]._id;
  }

  private toArticle(id: string, title: string): void {
    this.$router.push({
      name: 'articles',
      query: { id }
    })
  };

  private async toTag(id: any, index: number) {
    this.currentId = id;
    // tag数据重组
    if (index == undefined || this.firstId == (this.tagsList as any)[index]._id){
      this.tagsList = this.list;
      return;
    }
    if (index == 0) {
      this.tagsList.splice(0, 0, this.tagsList[this.tagsList.length - 1]);
      this.tagsList.length = this.tagsList.length - 1;
    }
    let preArr:any = [];
    let nextArr:any = [];
    this.tagsList.forEach((e, i) => {
      if (index > i + 1) {
        preArr.push(e)
      } else {
        nextArr.push(e)
      }
    })
    this.tagsList = nextArr.concat(preArr);

    // 获取文章数据
    let res = await this.$http.get(`/getCategory/${id}`);
    this.articleList = res;
  }
}
</script>


<style lang="less" scoped>
.tabs-bar {
  transform: translateY(-58px);
  // margin-top: -44px;
  // margin-bottom: 30px;
}
.body-wrap {
  // margin-top: 44px;
  // transform: translateY(58px);
}
.tags-list-more {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 2;
  height: 44px;
  padding-left: 1em;
  background: #3f51b5 !important;
}
.post-footer {
  position: relative;
  border-top: 1px solid #ddd;
}
@media screen and (max-width: 760px) {
  .tabs-bar {
    margin-left: 0px;
    margin-right: 0px;
    width: auto;
  }
}
</style>