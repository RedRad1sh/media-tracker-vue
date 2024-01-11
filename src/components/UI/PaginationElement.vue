<template>
    <div class="pagination">
        <a :class="currentPage === 1 ? 'current-page-btn' : 'page-btn'"
            href="#" @click="this.$router.push({query: {...this.$route.query, page: getPreviousPage()}})">&laquo;</a>
        <a :class="currentPage === index? 'current-page-btn' : 'page-btn'"
           v-for="index in pagination(currentPage, totalPages)"
           @click="this.$router.push({query: {...this.$route.query, page: index}})"
           :ref="`page-${index}`"
           :key="index"
           :style="index === '…' ? 'pointer-events:none' : ''"
        >
          {{ index }}
        </a>
        <a :class="currentPage === totalPages? 'current-page-btn' : 'page-btn'"
            href="#" @click="this.$router.push({query: {...this.$route.query, page: getNextPage()}})">&raquo;</a>
    </div>
</template>

<script>
import { generate } from '@bramus/pagination-sequence';

export default {
    name: 'PaginationElement',
    props: {
        totalPages: {
            type: Number,
            required: true,
        },
        currentPage: {
            type: Number,
            required: true,
        }
    },
    methods: {
        getPreviousPage() {
          return this.currentPage === 1? 1:this.currentPage - 1;
        },
        getNextPage() {
          return this.currentPage === this.totalPages? this.currentPage: this.currentPage + 1;
        },
        pagination(currentPageNumber, totalPageNumber) {
            return generate(currentPageNumber, totalPageNumber);
        }
    }
}

</script>

<style scoped>
</style>