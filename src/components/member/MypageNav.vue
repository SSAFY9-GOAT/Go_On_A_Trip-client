<template>
    <b-col class="col-3 ms-5">
        <nav id="sidebarMenu" class=" d-md-block bg-light sidebar collapse">
            <div class="position-sticky pt-3 sidebar-sticky">
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <router-link to="/mypage" v-if="this.$store.state.myPageState === 'my-info'"
                                     class="nav-link active" aria-current="page" href="">
                            마이페이지
                        </router-link>
                        <router-link to="/mypage" v-else class="nav-link " aria-current="page" href="">
                            마이페이지
                        </router-link>
                    </li>
                    <!--                  <li class="nav-item ">-->
                    <!--                      <c:if test="${currShow eq 'myArticle'}">-->
                    <!--                          <a class="nav-link active" aria-current="page" href="#">-->
                    <!--                      </c:if>-->
                    <!--                      <c:if test="${currShow != 'myArticle'}">-->
                    <!--                          <a class="nav-link " aria-current="page" href="${root}/myArticle">-->
                    <!--                      </c:if>-->
                    <!--                      <span data-feather="file" class="align-text-bottom"></span>-->
                    <!--                      내가 쓴 게시물-->
                    <!--                      </a>-->
                    <!--                  </li>-->
                    <!--                  <li class="nav-item">-->
                    <!--                      <c:if test="${currShow eq 'myHotplace'}">-->
                    <!--                          <a class="nav-link active" aria-current="page" href="">-->
                    <!--                      </c:if>-->
                    <!--                      <c:if test="${currShow != 'myHotplace'}">-->
                    <!--                          <a class="nav-link " aria-current="page"-->
                    <!--                             href="${root}/myHotPlace">-->
                    <!--                      </c:if>-->
                    <!--                      <span data-feather="shopping-cart" class="align-text-bottom"></span>-->
                    <!--                      내가 등록한 핫플레이스-->
                    <!--                      </a>-->
                    <!--                  </li>-->
                    <!--                  <li class="nav-item">-->
                    <!--                      <c:if test="${currShow eq 'myFavorite'}">-->
                    <!--                          <a class="nav-link active" aria-current="page" href="">-->
                    <!--                      </c:if>-->
                    <!--                      <c:if test="${currShow != 'myFavorite'}">-->
                    <!--                          <a class="nav-link " aria-current="page"-->
                    <!--                             href="${root}/myFavorite">-->
                    <!--                      </c:if>-->
                    <!--                      <span data-feather="shopping-cart" class="align-text-bottom"></span>-->
                    <!--                      내가 좋아요 누른 핫플레이스-->
                    <!--                      </a>-->
                    <!--                  </li>-->
                    <li class="nav-item mt-5">
                        <router-link to="/mypage/modifyPw" v-if="this.$store.state.myPageState === 'modifyPw'"
                                     class="nav-link active" aria-current="page">
                            <span data-feather="home" class="align-text-bottom"></span>
                            <i class="bi bi-person"></i>
                            비밀번호 변경
                        </router-link>
                        <router-link to="/mypage/modifyPw" v-else class="nav-link " aria-current="page">
                            <span data-feather="home" class="align-text-bottom"></span>
                            <i class="bi bi-person"></i>
                            비밀번호 변경
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/mypage/modify" v-if="this.$store.state.myPageState === 'modify'"
                                     class="nav-link active" aria-current="page">
                            <span data-feather="home" class="align-text-bottom"></span>
                            <i class="bi bi-person"></i>
                            정보 변경
                        </router-link>
                        <router-link to="/mypage/modify" v-else class="nav-link " aria-current="page">
                            <span data-feather="home" class="align-text-bottom"></span>
                            <i class="bi bi-person"></i>
                            정보 변경
                        </router-link>
                    </li>
                    <li class="nav-item mt-5">
                        <router-link to="/withdrawal" class="nav-link text-danger">
                            <span data-feather="shopping-cart" class="align-text-bottom"></span>
                            회원탈퇴
                        </router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </b-col>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "mypageNav"
})
</script>


<style scoped>
/*
 * Sidebar
 */

.sidebar {
    /* position: ; */
    /* top: ; */
    /* rtl:raw:
    right: 0;
    */
    /* bottom: 0; */
    /* rtl:remove */
    left: 0;
    z-index: 100;
    /* Behind the navbar */
    /* Height of navbar */
    /* padding: 48px 0 0;  */
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
}

@media (max-width: 767.98px) {
    .sidebar {
        top: 5rem;
    }
}

.sidebar-sticky {
    height: calc(100vh - 48px);
    overflow-x: hidden;
    overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

.sidebar .nav-link {
    font-weight: 500;
    color: #333;
}

.sidebar .nav-link .feather {
    margin-right: 4px;
    color: #727272;
}

.sidebar .nav-link.active {
    color: #2470dc;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
    color: inherit;
}

.sidebar-heading {
    font-size: .75rem;
}
</style>