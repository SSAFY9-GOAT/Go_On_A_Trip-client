<template>
    <div>
        <form method="post" action="${root}/article/write">
            <div class='shadow m-lg-auto m-lg-5 m-5 m-auto p-lg-5 container-sm justify-content-center align-content-center'>
                <div class='notion-head m-auto'>
                    <div class='notion-title'>
                        <div class="mb-3 ">
                            <div class="input-group ">
                                <span class="input-group-text" id="basic-addon2">제목</span>
                                <input type="text" class="form-control" placeholder="제목을 입력하세요" aria-label="제목을 입력하세요"
                                       name="title"
                                       aria-describedby="basic-addon2"
                                       v-model="title">
                            </div>
                        </div>
                    </div>
                </div>
                <div class='notion-body'>
                    <div>
                        <div class=' notion-content'>
                            <div class="mb-3">
                                <div class="input-group">
                    <textarea type="text" name="content" class="form-control" id="basic-url"
                              aria-describedby="basic-addon3"
                              aria-label="With textarea" rows='20' placeholder="내용을 입력하세요"
                              v-model="content"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='notion-footer mt-5 '>
                    <button type="button" class='btn btn-outline-success' @click="write">등록하기</button>
                </div>
            </div>
        </form>
        <div class='m-5 m-auto p-lg-5 container-sm justify-content-center align-content-center'>
            <div class='row justify-content-end'>
                <router-link :to="{name: 'boardlist'}" class='col-1 btn btn-outline-info'>목록으로</router-link>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "BoardWrite",
    data() {
        return {
            title: "",
            content: "",
        };
    },
    methods: {
        write() {
            let article = {
                title: this.title,
                content: this.content,
            };
            this.$emit("write", article);
        }
    },
    created() {
    }
}
</script>

<style scoped>

</style>