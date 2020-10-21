<template>
	<div>
		<div class="top-header" :class="scrollTop > 0 ? 'fixed' : ''" id="header">
			<div class="flex-row">

				<div class="header-icon waves-effect waves-circle waves-light on" @click="handleShowMenu">
					<i class="icon icon-lg icon-navicon"></i>
				</div>
				
				<div class="flex-col header-title ellipsis">{{title.name}}</div>

				<div class="search-wrap" :class="showInput ? 'in' : ''" id="search-wrap">
					<input id="key" class="search-input" autocomplete="off" placeholder="输入感兴趣的关键字">
					<div class="header-icon waves-effect waves-circle waves-light" id="search" @click="showInput = !showInput">
						<i class="icon icon-lg icon-search"></i>
					</div>
				</div>

				<div class="header-icon waves-effect waves-circle waves-light">
					<i class="icon icon-lg icon-share-alt"></i>
				</div>
			</div>
		</div>

		<div class="content-header index-header">
			<div class="container fade-scale in">
				<h1 class="title"  v-show="$route.name != 'articles'">{{title.name}}</h1>
				<h5 class="subtitle">{{title.subscribe}}</h5>
			</div>
		</div>
	</div>
  
</template>


<script lang="ts">
import { Component, Vue, Emit, Watch, Prop } from "vue-property-decorator";

@Component
export default class ClassName extends Vue {
	private showInput:boolean = false;
	private title:object = {};
	private scrollTop:number = 0;
	
	@Prop() articleTitle !: string;
	@Watch("$route") 
	routeChange(val: any, oldVal: any) {
		if (val.name == 'home') {
			this.title = {
				name: "Vincent's Blog",
				subscribe: "学习弯道超车的技巧！"
			}
			document.title = "Vincent's Blog"
		} else if (val.name == 'archives') {
			this.title = {
				name: "Archives"
			}
			document.title = "Archives | Vincent's Blog"
		} else if (val.name == 'tags') {
			this.title = {
				name: "Tags"
			}
			document.title = "Tags | Vincent's Blog"
		}
	}

	@Watch("articleTitle")
	articleTitleChange(val: string, oldVal: string) {
		this.title = {
			name: val
		}
		document.title = val
	}

	@Emit("bindShowMenu") showMenuFun(isShow:boolean){};

	mounted() {
		window.addEventListener('scroll', this.watchScroll)
	}

	private handleShowMenu() {
		this.showMenuFun(true)
	}

	private watchScroll() {
		this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	}
}
</script>


<style lang="less">
@media screen and (max-width: 760px) {
	.title {
		display: block!important;
		font-size: 24px!important;
		line-height: 1.5!important;
	}
}


</style>