<template>
    <div>
        <div>
            <span>*标题：</span>
            <input type="text">
        </div>
         <div>
            <div>
                <span>*类型：</span>
                <select name="" id="">
                    <option value="">通知公告</option>
                    <option value="">中国AOPA</option>
                </select>
            </div>
            <div>
                <span>*推荐标识：</span>
                <select name="" id="">
                    <option value="">不推荐</option>
                    <option value="">推荐</option>
                </select>
            </div>
        </div>
         <div>
            <span>*来源：</span>
            <input type="text">
        </div>
        <div>
            <span>*内容：</span>
            <!-- <UE></UE> -->
            <div id="father">
                <Editor :catchData="catchData"></Editor>
            </div>
        </div>
        <button @click="handleSubmit">保存</button>
    </div>
</template>

<script>
// import UE from '../../../components/templatework/UE.vue';
import Editor from '../../../components/templatework/vueEditor.vue';
export default {
    components: {
        // UE,
        Editor
    },
    data(){
        return {
            notice_id: '',
            content: '',
        }
    },
    methods: {
        catchData(value){
            console.log(value, '666666')
            this.content=value      //在这里接受子组件传过来的参数，赋值给data里的参数
        },
        handleSubmit(){
            console.log(this.content, '444444')
        }
    },
    created(){
        if(this.$route.query.noticeId != ''){
            //
        }
    }
}
</script>

