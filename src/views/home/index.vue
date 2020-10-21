<template>
  <div class="container body-wrap">
    <ul class="post-list">
      <li v-for="art in artList" :key="art.id" class="post-list-item fade in">
        <div class="article-card article-type-post">
          <!-- 创建日期 -->
          <div class="post-meta">
            <div class="post-time">{{art.createDate | filterDate}}</div>
          </div>

          <!-- 标题 -->
          <h3 class="post-title" @click="toArticle(art._id, art.title)">
            <div class="post-title-link" >{{art.title}}</div>
          </h3>

          <!-- 内容 -->
          <div class="post-content">
            <span  v-html="filterValue(art.content)"></span>
            <span class="post-more waves-effect waves-button" @click="toArticle(art._id, art.title)">阅读全文...</span>
          </div>

          <!-- 标签 -->
          <div class="post-footer">
            <ul class="article-tag-list">
              <li class="article-tag-list-item" v-for="(tag, index) in art.categroyName" :key="index">
                <a class="article-tag-list-link waves-effect waves-button">{{tag}}</a>
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { formatterDate } from '../../utils/date';
@Component({
  filters: {
    filterDate(val: string) {
      return val ? formatterDate(val, 'YYYY年MM月DD日') : ''
    },
  }
})
export default class name extends Vue {
  private pagination: any = {
    page: 1,
    size: 10,
    total: 0
  }
  private artList: object[] = [];

  private created() {
    this.getList();
  };

  private async getList() {
    let { page, size } = this.pagination;
    let params = {
      page, size
    }
    let { list, total } = await this.$http.get('/getArticleList', { params });
    
    this.artList = list;
    this.pagination.total = total;
  };

  private toArticle(id: string, title: string): void {
    this.$router.push({
      name: 'articles',
      query: { id }
    })
  };

  private filterValue(str: string) {
    if (!str) return '';
    let num = 0;
    let value = str.split("<h2>");
    while(!value[num]) {
      num++;
    }
    str = value[num];
    str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
    return str;
  }
}
</script>

<style lang="less" scoped>
// @import "../../styles/_partial/article";
.post-content {
  padding-bottom: 20px;
  line-height: 1.8;
}
.post-footer {
  position: relative;
  border-top: 1px solid #ddd;
}
</style>
