<template>
  <div>
    <main class="p-3 mb-3 border-bottom container-sm">
      <div class="container-sm">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-sm-start ">
          <table class="table m-auto wrapper">
            <thead class="table-light">
            <tr>
              <th scope="col" class=' text-center'>번호</th>
              <th scope="col" class=' text-center'>제목</th>
              <th scope="col" class=' text-center'>등록일</th>
            </tr>
            </thead>
            <tbody class="table-group-divider">
            <!--                        <c:forEach items="${topNotions}" var="notion">-->
                                        <tr v-for="topnotice in topNoticeList" :key="topnotice">
                                            <th scope="row" class='text-center'>
                                                <span class="badge text-bg-primary">공지</span>
                                            </th>
                                            <td><a class='linkToNotion'>{{topnotice.title}}</a></td>
                                            <td class='text-center'>{{topnotice.createdDate}}</td>
                                        </tr>
            <!--                        </c:forEach>-->
            <!--                        <c:forEach items="${notions}" var="notion" varStatus="status">-->
                                        <tr v-for="notice in noticeList" :key="notice">
                                            <th scope="row" class='text-center'>{{notice.id}}</th>
                                            <td><a class='linkToNotion'>{{notice.title}}</a></td>
                                            <td class='text-center'>{{notice.createdDate}}</td>
                                        </tr>
            <!--                        </c:forEach>-->
            </tbody>
          </table>
        </div>
        <!--              <%-- 페이징 시작 --%>-->
        <!--              -->
        <!--              <%-- 페이징 종료 --%>-->
        <!--              <c:if test="${userinfo.authority eq 'ADMIN'}">-->
        <div class='wrapper m-auto mt-5'>
          <a href='${root}/notion/write' type='button' id='btnAddNotification' class='btn btn-success'>공지등록</a>
        </div>
        <!--              </c:if>-->
      </div>
    </main>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "NoticeList",
  components: {},
  data() {
    return {
      currentPage: 1,
      totalPages: 0,
      noticeList: [],
      topNoticeList: [],
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      const API_URL = `http://localhost:8080/notice`;
      const headers = {
        Authorization: sessionStorage.getItem("access-token"),
        'access-token': sessionStorage.getItem("access-token"),
      };
      const params = {
        page: this.currentPage,
      }
      axios.get(API_URL, {headers, params})
          .then(response => {
            this.topNoticeList = response.data.data.topNotions;
            this.noticeList = response.data.data.notions.content;
            this.topNoticeList.forEach(function (article) {
                article.createdDate = article.createdDate.replace('T', ' ');
            })
            this.noticeList.forEach(function (article) {
              article.createdDate = article.createdDate.replace('T', ' ');
            })
            this.totalPages = response.data.data.totalPages;
            //todo : 검색 시 페이징 처리
          })
          .catch(error => {
            console.log(error);
          })
    }
  }
}
</script>

<style scoped>

</style>