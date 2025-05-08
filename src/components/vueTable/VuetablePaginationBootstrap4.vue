<template>
	<nav>
		<ul class="pagination">
			<li :class="['page-item', { disabled: isOnFirstPage }]">
				<a class="page-link" @click.prevent="loadPage('prev')">
					<span>&laquo;</span>
				</a>
			</li>

			<template v-if="notEnoughPages">
				<li
					v-for="n in totalPage"
					:key="n"
					:class="['page-item', { active: isCurrentPage(n) }]"
				>
					<a class="page-link" @click.prevent="loadPage(n)" v-html="n"></a>
				</li>
			</template>
			<template v-else>
				<li
					v-for="n in windowSize"
					:key="n"
					:class="['page-item', { active: isCurrentPage(windowStart + n - 1) }]"
				>
					<a
						class="page-link"
						@click.prevent="loadPage(windowStart + n - 1)"
						v-html="windowStart + n - 1"
					></a>
				</li>
			</template>

			<li :class="['page-item', { disabled: isOnLastPage }]">
				<a class="page-link" href="" @click.prevent="loadPage('next')">
					<span>&raquo;</span>
				</a>
			</li>
		</ul>
	</nav>
</template>

<script>
import VuetablePaginationMixin from "vuetable-2/src/components/VuetablePaginationMixin";

export default {
	mixins: [VuetablePaginationMixin],
};
</script>

<style scoped>
.page-link {
	color: #2453b3;
	background-color: #fff;
}
.page-item.active .page-link {
	color: #fff;
	background-color: #2d6ae5 !important;
	border-color: #2d6ae5;
}
a:not([href]):not([tabindex]):hover,
a:not([href]):not([tabindex]):focus {
	cursor: pointer;
}
.page-link:hover {
	color: #fff !important;
	background-color: #2d6ae5;
	border-color: #2d6ae5;
}
</style>
