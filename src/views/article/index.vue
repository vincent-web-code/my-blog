<template>
	<div class="container body-wrap" >
		<div class="post-widget">
			<div class="post-toc-wrap" :class="scrollTop > 100 ? 'fixed': ''">
				<h4>TOC</h4>
				<ol class="post-toc">
					<!-- active -->
					<li class="post-toc-item post-toc-level-2" :class="current == index ? 'active' : ''" v-for="(item, index) in TOCList" :key="index" @click="current = index">
						<a class="post-toc-link" :href="`#id${index+1}`">
							<span class="post-toc-number">{{index+1}}.</span>
							<span class="post-toc-text">{{item}}</span>
						</a>
					</li>
				</ol>
			</div>
		</div>

		<div class="post-article article-type-post fade in">
			<div class="post-card">
				<h1 class="post-card-title">{{articleInfo.title}}</h1>
				<div class="post-meta">
					<span>{{articleInfo.createDate | filterDate}}</span>
					<span style="padding-left:20px">阅读数 {{readNum}}</span>
				</div>
				
				<div v-html="articleInfo.content" class="post-content"></div>

				<div class="page-reward">
					<i class="page-reward-btn waves-effect waves-circle waves-light">赏</i>
				</div>

				<div class="post-footer">
					<ul class="article-tag-list">
						<li class="article-tag-list-item" v-for="(tag, index) in articleInfo.categroyName" :key="index">
							<a class="article-tag-list-link waves-effect waves-button">{{tag}}</a>
						</li>
					</ul>
				</div>
			</div>

			<div class="post-nav flex-row flex-justify-between" :class="!articleInfo.prev ? 'flex-row-reverse' : ''"> <!--flex-row-reverse-->
				<div class="waves-block waves-effect prev" @click="toArticle(articleInfo.prev._id)" v-if="articleInfo.prev">
					<a class="post-nav-link">
						<div class="tips"><i class="icon icon-angle-left icon-lg icon-pr"></i> Prev</div>
						<h4 class="title">{{articleInfo.prev.title}}</h4>
					</a>
				</div>

				<div class="waves-block waves-effect next" @click="toArticle(articleInfo.next._id)" v-if="articleInfo.next">
					<a class="post-nav-link">
						<div class="tips">Next <i class="icon icon-angle-right icon-lg icon-pr"></i></div>
						<h4 class="title">{{articleInfo.next.title}}</h4>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>


<script lang="ts">
import{ Component, Vue, Emit, Watch } from 'vue-property-decorator';
import { formatterDate } from '../../utils/date';
@Component({
	filters: {
		filterDate(val: string) {
			return val ? formatterDate(val, 'YYYY年MM月DD日') : ''
		},
	}
})
export default class Article extends Vue{
	private articleInfo: any = {};
	private readNum: number = 0;
	private TOCList: Array<string> = [];
	private screenWidth:any = '';   // 窗口宽度
	private scrollTop:number = 0;  // 滚动距离顶部的位置
	private current:any = 0;

	@Emit('getTitle') getTitle(title:string) {}
	@Emit("hideMenu") hideMenu(bool:boolean){};

	@Watch('$route')
	changeRoute(val:any) {
		this.getInitData();
	}

	private created() {
		this.getInitData();
	}

	mounted(): void {
		window.onresize = () => {
			return (() => {
				this.screenWidth = window.innerWidth;
			})()
		}
		window.addEventListener('scroll', this.watchScroll)
		
	}

	private async getInitData() {
		this.hideMenu(false);
		await this.getArticle();  // 获取文章详情
		
		this.getClickNum(); // 获取阅读量

		if (window.location.hash) {
			this.$nextTick(() => {
				this.current = Number(window.location.hash.split('#id')[1]) - 1;
				let height = (document.querySelectorAll(`#id${this.current + 1}`)[0] as any).offsetTop + 212 - 56;
				window.scroll(0, height)
			})
		} else {
			window.scroll(0,0)  // 返回顶部
		}
	}


	private async getArticle() {
		let res = await this.$http.get(`/article/${this.$route.query.id}`);
		this.articleInfo = res;
		let content = this.articleInfo.content;
		// 获取toc
		let TOCList = content.match(/<h2>(.*?)<\/h2>/g);
		TOCList = TOCList.map((e:string) => {
			return e.replace("<h2>", '').replace("</h2>", '')
		});
		this.TOCList = TOCList;

		// 添加锚点
		let array = content.split("<h2>");
		let str = '';
		let index = 1;
		for (let i = 0; i < array.length; i++) {
			if (array[i].indexOf('</h2>') != -1) {
				str = str + `<h2 id="id${index + 1}">` + array[i];
				index++
			} else {
				str = str + array[i];
				index--;
			}	
		}
		this.articleInfo.content = str;
		this.getTitle(this.articleInfo.title);
	}

	private async getClickNum() {
		let res = await this.$http.put('/readNum', { id: this.$route.query.id });
		this.readNum = res.readNum;
	}

	private toArticle(id:string) {
		this.$router.push({
			name: 'articles',
			query: { id }
		})
	}

	// 监听用户滑动
	watchScroll() {
		let allHeigth:any[] = []
		this.TOCList.forEach((e,index) => {
			allHeigth.push((document.querySelectorAll(`#id${index + 1}`)[0] as any).offsetTop + 212 - 56)
		})
		this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		allHeigth.forEach((e, index) => {
			if (!allHeigth[index-1]) {
				this.current = 0;
			} else if (this.scrollTop >= e && allHeigth[index-1] < e) {
				this.current = index
			}
		})
  	}

}
</script>


<style lang="less" scoped>
// @import "_partial/article";
.post-article {
	float: left;
    width: 80%;
    padding-right: 30px;
}
.post-card {
	margin-top: -150px;
    min-height: 100px;
    padding: 35px;
    background: #fff;
    border-radius: 4px;
	box-shadow: 0 10px 30px rgba(0,0,0,0.2);
	.post-meta {
		margin-top: 8px;
	}
}
.post-card-title {
	font-size: 32px;
}
.post-content {
	padding-top: 20px;
	padding-bottom: 20px;
	line-height: 1.8;
	/deep/ p {
		word-wrap: break-word
	}
	/deep/ h2 {
		font-size: 22px !important;
		padding-top: 56px;
    	margin-top: -56px;
	}

	/deep/ blockquote {
		position: relative;
		padding: 16px 20px;
		border-left: 4px solid #3f51b5;
		color: #6e6e6e;
		background: #f5f5f5;
		font-size: 14px;
		border-radius: 0 2px 2px 0;
	}
	/deep/.ql-syntax{
		margin-left: -35px;
		margin-right: -35px;
		padding: 20px 35px;
		// margin-bottom: 20px;
	}
	/deep/ code {
		color: #ff4081;
		line-height: 1;
		margin: 0 4px;
		font-size: 80%;
		padding: 3px 5px;
		border: 1px solid #eee;
		border-radius: 2px;
		word-wrap: break-word;
	}
}
.post-footer {
	position: relative;
    margin: 0 -35px;
    padding: 20px 35px 0;
    border-top: 1px solid #ddd;
}

.post-nav {
	margin-top: 30px;
	padding: 16px 0 0;
	.next {
		text-align: right;
	}

	.prev {
		text-align: left;
	}
}
.post-nav .prev, .post-nav .next {
	width: 47%;
	background: #f5f5f5;
}

.post-nav-link {
	display: block;
    line-height: 2em;
    font-size: 16px;
	padding: 10px 16px;
	.tips {
		color: #727272;
	}
	.title {
		position: relative;
		display: inline-block;
	}
}

.post-nav-link .title::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #3f51b5;
    visibility: hidden;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    -webkit-transition: .4s ease-in-out;
	transition: .4s ease-in-out;
}

.post-nav-link .title:hover::after, .post-nav-link .title:active::after {
	visibility: visible;
	-webkit-transform: scaleX(1);
	transform: scaleX(1);
}

@media screen and (max-width: 760px) {
	.post-article {
		float: none;
		width: 100% !important;
		padding-right: 0 !important;
	}

	.post-card {
		position: relative;
		margin: -20px -16px 0;
		border-radius: 0;
		padding: 16px;
	}

	.post-card-title {
		display: none;
	}

	.post-card .post-meta {
		margin-top: -40px;
		padding: 20px 12px;
		background: #fff;
		box-shadow: 0 1px 4px 0 rgba(0,0,0,0.16);
		border-radius: 2px;
	}
}

.post-widget {
	float: right;
	width: 20%;
	padding-left: 30px;
	min-height: 1px;
	.fixed {
		top: 76px;
		bottom: 140px;
		overflow-y: auto;
	}
	.post-toc-wrap {
		position: fixed;
		overflow-x: hidden;
		width: 20%;
		list-style: none;
		margin: 0;
		h4 {
			padding: 0 0 10px 20px;
			font-size: 15px;
			font-weight: 600;
			color: #727272;
		}
		.post-toc {
			display: inline-block;
			padding: 0;
			font-size: 13px;
			margin: 0;
			.post-toc-item {
				position: relative;
				font-weight: 400;
    			color: #727272;
			}
			.active {
				.post-toc-link {
					font-weight: 600!important;
					color: #3f51b5 !important;
				}
				.post-toc-link:before {
					background: rgba(0,0,0,0.06);
				}
				.post-toc-link:after {
					border-left: 3px solid #3f51b5;
				}
			}
		}
	}
}
.post-toc-link {
	position: relative;
	z-index: 2;
	display: block;
	padding: 3px 20px;
	line-height: 1.5rem;
	color: inherit;
	word-break: break-all;
	cursor: pointer;
}
.post-toc-link:hover {
    opacity: .8;
}
a:hover {
    color: #303f9f;
    text-decoration: underline;
}
.post-toc-link:before, .post-toc-link:after {
	content: "";
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
}
</style>