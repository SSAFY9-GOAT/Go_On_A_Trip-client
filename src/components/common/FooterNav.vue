<template>
    <div class="container">
        <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <p class="col-md-4 mb-0 text-muted">&copy; SSAFY 광주5반</p>
            <router-link :to="{name: 'index'}">
            <a href="${root}"
               class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                <img :src="require('@/assets/img/logo/point.png')" alt="" width="40"/>
            </a>
            </router-link>
            <ul class="nav col-md-4 justify-content-end">
                <li class="nav-item">
                    <a href="#" class="nav-link px-2 text-muted">이용약관</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link px-2 text-muted">개인정보처리방침</a>
                </li>
                <li class="nav-item">
                    <a href="${root}/notion?action=list" class="nav-link px-2 text-muted">공지사항</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link px-2 text-muted">문의하기</a>
                </li>
            </ul>
        </footer>
    </div>
</template>

<script>
export default {
    name: "FooterNav"
}
</script>

<style scoped>

</style>