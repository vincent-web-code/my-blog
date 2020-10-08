<template>
  <div class="container body-wrap">
    <ul class="post-list">
      <li v-for="art in artList" :key="art.id" class="post-list-item fade in">
        <div class="article-card article-type-post">
          <!-- 创建日期 -->
          <div class="post-meta">
            <div class="post-time">{{art.createTime}}</div>
          </div>

          <!-- 标题 -->
          <h3 class="post-title">
            <div class="post-title-link">{{art.title}}</div>
          </h3>

          <!-- 内容 -->
          <div class="post-content">
            {{art.content}}
            <span class="post-more waves-effect waves-button">阅读全文...</span>
          </div>

          <!-- 标签 -->
          <div class="post-footer">
            <ul class="article-tag-list">
              <li class="article-tag-list-item" v-for="(tag, index) in art.tags" :key="index">
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
@Component
export default class name extends Vue {
  private artList: object[] = [
    {
      id: 1,
      createTime: "2020年09月07日",
      title: "基于 MIME 类型的服务端推送",
      content:
        "目前就职于视听行业相关的公司，故而需要接触流媒体传输相关技术。今天介绍一种基于 MIME 类型的服务端流媒体推送实现。",
      tags: ["MIME", "Server Push", "multipart", "x-mixed-replace"]
    },
    {
      id: 2,
      createTime: "2020年09月07日",
      title: "前端静态数据的管理",
      content:
        "静态数据所谓静态数据，本文内指的是一些静态常量、配置化数据以及枚举类数据等，很少变化或者说很少在运行时变化的数据。例如：API 服务器的 rootPath、常用的正则表达式、业务相关的枚举类数据、固定的填充数据以及 i18n 等。虽然这些数据很少变化，但在一个大的项目中非常容易到处使用。常见的问题有：同样规则的正则表达式，这写一个，那写一个业务枚举数据各种迷之 magicNumber 进行判断比较，如 if(this.type === 1)，1 是啥？？？对同一种数据的多处定义，A 组件一个 framework: ['Vue', 'React', 'Angular']，B 组件用的时候又定义一次i18n 时，不同模块中的类型场景定义多个描述……这些问题的出现就给后期项目维护增加了时间和沟通成本，有意识的提取静态数据是必须要做的事。",
      tags: ["前端", "数据管理"]
    },
    {
      id: 3,
      createTime: "2020年09月07日",
      title: "Vue最佳实践",
      content:
        "记录我在使用 Vue 中发现的一些好的代码实践，希望能够保持更新。🤠 ",
      tags: ["Vue", "技巧"]
    },
    {
      id: 4,
      createTime: "2020年09月07日",
      title: "Vue最佳实践",
      content:
        "记录我在使用 Vue 中发现的一些好的代码实践，希望能够保持更新。🤠 ",
      tags: ["Vue", "技巧"]
    },
    {
      id: 5,
      createTime: "2020年09月07日",
      title: "Vue最佳实践",
      content:
        "记录我在使用 Vue 中发现的一些好的代码实践，希望能够保持更新。🤠 ",
      tags: ["Vue", "技巧"]
    },
    {
      id: 6,
      createTime: "2020年09月07日",
      title: "Vue最佳实践",
      content:
        "记录我在使用 Vue 中发现的一些好的代码实践，希望能够保持更新。🤠 ",
      tags: ["Vue", "技巧"]
    }
  ];

  private mounted() {
    // this.$message({
    //   message: 'success',
    //   type: 'success'
    // })
  }
}
</script>

<style lang="less" scoped>
@import "../../styles/_partial/article";
.post-content {
  padding-bottom: 20px;
  line-height: 1.8;
}
</style>
