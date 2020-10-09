<template>
	<div>
		
	</div>
</template>


<script lang="ts">
import{ Component, Vue } from 'vue-property-decorator';

@Component
export default class Article extends Vue{
	private articleInfo: any = {};
	private created() {
		this.getArticle();
	}

	private async  getArticle() {
		let res = await this.$http.get(`/article/${this.$route.query.id}`);
		this.articleInfo = res;
	}
}
</script>


<style lang="stylus" scope>

</style>