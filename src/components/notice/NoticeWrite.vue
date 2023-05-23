<template>
<div>
        <div class='shadow m-lg-auto m-lg-5 m-5 m-auto p-lg-5 container-sm justify-content-center align-content-center'>
            <div class='notion-head m-auto'>
                <div class='notion-title'>
                    <div class="mb-3 ">
                        <div class="input-group ">
                            <span class="input-group-text" id="basic-addon2">제목</span>
                            <input type="text" class="form-control" placeholder="제목을 입력하세요" aria-label="제목을 입력하세요"
                                   name="title" v-model="title"
                                   aria-describedby="basic-addon2">
                        </div>
                    </div>
                </div>
            </div>
            <div class='notion-body'>
                <div>
                    <div class='notion-content'>
                        <div class="mb-3">
                            <div class="input-group">
                    <textarea type="text" name="content" class="form-control" v-model="content"
                              aria-describedby="basic-addon3"
                              aria-label="With textarea" rows='20' placeholder="내용을 입력하세요"></textarea>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" v-model="top" id="flexCheckDefault">
                                <label class="form-check-label" for="flexCheckDefault">
                                    상단 고정
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class='notion-footer mt-5 '>
                <button type="button" class='btn btn-outline-success' @click="write">등록하기</button>
            </div>
        </div>
    <div class='m-5 m-auto p-lg-5 container-sm justify-content-center align-content-center'>
        <div class='row justify-content-end'>
            <router-link to="/notice" class=' col-1 btn btn-outline-info'>목록으로</router-link>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "NoticeWrite",
    data() {
        return {
            title: "",
            content: "",
            top: null,
        };
    },
    methods: {
        write() {
            let notice = {
                title: this.title,
                content: this.content,
                top: this.top,
            };
            this.$emit("write", notice);
        }
    }
}
</script>

<style scoped>

</style>