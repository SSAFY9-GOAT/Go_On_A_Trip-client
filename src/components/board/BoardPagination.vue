<template>
  <!--                페이징 시작-->
    <div class="d-flex justify-content-center mt-3">
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <!--                            이전버튼시작-->
                <li class="page-item">
                    <button class="page-link" :disabled="currentPage === 1" @click="previousPage">Previous</button>
                </li>
                <!--                            이전버튼종료-->
                <!--                            페이징번호 처리시작-->
                    <li class="page-item" v-for="page in totalPages" :key="page">
                        <button class="page-link" @click="goToPage(page)">{{ page }}</button>
                    </li>
                <!--                            페이징번호 처리종료-->
                <!--                            시작버튼시작-->
                <li class="page-item">
                    <button class="page-link" :disabled="currentPage === totalPages" @click="nextPage">Next</button>
                </li>

                <!--                            시작버튼종료-->
            </ul>
        </nav>
    </div>
  <!--                페이징 종료-->
</template>

<script>
export default {
    name: "BoardPagination",
    props: {
        currentPage: {
            type: Number,
            required: true
        },
        totalPages: {
            type: Number,
            required: true
        }
    },
    methods: {
        goToPage(page) {
            // 페이지 번호를 클릭할 때 적절한 페이지 데이터를 로드하는 로직을 구현
            // 예: API 호출 등
            this.$emit('update-page', page);
        },
        previousPage() {
            if (this.currentPage > 1) {
                this.goToPage(this.currentPage - 1);
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.goToPage(this.currentPage + 1);
            }
        }
    }
}
</script>

<style scoped>

</style>