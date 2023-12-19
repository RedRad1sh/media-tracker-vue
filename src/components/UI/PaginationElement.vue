<template>
    <div class="pagination">
        <a href="#">&laquo;</a>
        <a :class="elementSelect(`${index}`)" v-for="index in pagination(currentPage, totalPages)"
            @click="this.$router.push(`?page=${index}`)" :ref="`page-${index}`" :key="index">{{
                index }}</a>
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
        },
        elementSelect(pageNum) {
            if (pageNum == this.currentPage) {
                console.log(this.currentPage)
                return 'page-active-button'
            }
            return ''
        }
    }
}

</script>

<style scoped>
.page-active-button {
    background-color: white;
    color: rgb(36, 35, 50);
}
</style>