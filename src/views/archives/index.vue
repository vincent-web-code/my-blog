<template>
    <div class="container body-wrap fade in">
        <h3 class="archive-separator">七月，2018</h3>
        <div class="waterfall in">
            <!-- v-for="" -->
            <div class="waterfall-item">
                <div class="article-card archive-article">
                    <div class="post-meta">
                        <div class="post-time">2018年07月03日</div>
                    </div>
                    
                    <h3 class="post-title">
                        <div class="post-title-link">基于 MIME 类型的服务端推送</div>
                    </h3>

                    <div class="post-footer">
                        <ul class="article-tag-list">
                            <li class="article-tag-list-item">
                                <div class="article-tag-list-link waves-effect waves-button">MIME</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="waterfall-item">
                <div class="article-card archive-article">
                    <div class="post-meta">
                        <div class="post-time">2018年07月03日</div>
                    </div>
                    
                    <h3 class="post-title">
                        <div class="post-title-link">基于 MIME 类型的服务端推送</div>
                    </h3>

                    <div class="post-footer">
                        <ul class="article-tag-list">
                            <li class="article-tag-list-item">
                                <div class="article-tag-list-link waves-effect waves-button">MIME</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import{ Component, Vue } from 'vue-property-decorator';

@Component
export default class archives extends Vue{
    private articleList: Array<object> = [];

    private created() {
        this.fetch();
    }

    private async fetch() {
        // let { code, data } = await this.$http.get('article')
    }
}
</script>


<style lang="less" scoped>
@import "../../styles/_partial/archives";
.post-footer {
    position: relative;
    border-top: 1px solid #ddd;
}
</style>