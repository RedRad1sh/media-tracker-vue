<template>
    <div class="pagination">
        <a href="#">&laquo;</a>
        <a :class="Number(currentPage) === index ? 'page-active-button' : ''"
           v-for="index in pagination(currentPage, totalPages)"
           @click="this.$router.push({query: {...this.$route.query, page: index}})"
           :ref="`page-${index}`"
           :key="index"
           :style="index === '…' ? 'pointer-events:none' : ''"
        >
          {{ index }}
        </a>
        <a href="#">&raquo;</a>
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
        pagination(currentPageNumber, totalPageNumber) {
            return generate(currentPageNumber, totalPageNumber);
        }
    }
}

</script>

<style scoped>
</style>