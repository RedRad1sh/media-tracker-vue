<template>
    <div class="pagination">
        <a :class="{'current-page-btn': currentPage === 1, 'page-btn': currentPage !== 1}"
            href="#" @click="this.$router.push({query: {...this.$route.query, page: getPreviousPage()}})">&laquo;</a>
        <a :class="{'current-page-btn': currentPage === index, 'page-btn': currentPage !== index}"
           v-for="index in pagination(currentPage, totalPages)"
           @click="this.$router.push({query: {...this.$route.query, page: index}})"
           :ref="`page-${index}`"
           :key="index"
           :style="index === '…' ? 'pointer-events:none' : ''"
        >
          {{ index }}
        </a>
        <a :class="{'current-page-btn': currentPage === totalPages, 'page-btn': currentPage !== totalPages}"
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