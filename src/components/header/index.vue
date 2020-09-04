<template>
	<div>
		<div class="top-header" id="header">
			<div class="flex-row">

				<div class="header-icon waves-effect waves-circle waves-light on" @click="handleShowMenu">
					<i class="icon icon-lg icon-navicon"></i>
				</div>
				
				<div class="flex-col header-title ellipsis"></div>

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
				<h1 class="title">Yusen's Blog</h1>
				<h5 class="subtitle">学习弯道超车的技巧！</h5>
			</div>
		</div>
	</div>
  
</template>


<script lang="ts">
import { Component, Vue, Emit } from "vue-property-decorator";

@Component
export default class ClassName extends Vue {
	private showInput:boolean = false;

	@Emit("bindShowMenu") showMenuFun(isShow:boolean){};

	private handleShowMenu() {
		this.showMenuFun(true)
	}
}
</script>


<style lang="stylus" scope></style>