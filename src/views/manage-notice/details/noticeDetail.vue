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
        </div>
    </div>
</template>

<script>
// import UE from '../../../components/templatework/UE.vue';
export default {
    // components: {
    //     UE
    // },
    data(){
        return {
            notice_id: '',
        }
    },
    methods: {
        //
    },
    created(){
        if(this.$route.query.noticeId != ''){
            //
        }
    }
}
</script>

