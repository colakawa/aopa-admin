<template>
    <div class="crumbs">
        <span v-for="(item, index) in breadlist">
            <router-link :to="item.path">{{item.name}}</router-link>
        </span>
    </div>
    <!-- <Breadcrumb separator=">" class="crumbs">
        <BreadcrumbItem to="/">Home</BreadcrumbItem>
        <BreadcrumbItem to="/components/breadcrumb">Components</BreadcrumbItem>
        <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
    </Breadcrumb> -->
</template>
<script>
    export default {
        created() {
            this.getBreadcrumb(true);
        },
        data() {
            return {
                breadlist: [{name:'首页', path:'/'}]
            }
        },
        methods: {
            getBreadcrumb () {
                var breadNumber= this.$route.query.breadNum || 1;//url变量breadNum记录层级，默认为1，如果大于1，要添加上变量；
                var breadLength=this.$store.state.breadListState.length;//目前breadlist集合数组个数
                var curName=this.$route.name;
                var curPath=this.$route.fullPath;
                var newBread={name:curName,path:curPath};
                var ishome=curName=='首页';
                console.log(ishome);
                if(breadNumber === 1){
                    this.$store.commit('breadListStateRemove', 1)
                    if(!ishome){
                        this.$store.commit('breadListStateAdd', newBread);
                    }
                }else if(breadLength <= breadNumber){
                    this.$store.commit('breadListStateAdd', newBread)
                }else {
                    this.$store.commit('breadListStateRemove', parseInt(breadNumber)+1)
                }
                this.breadlist = this.$store.state.breadListState;
                console.log(this.breadlist)
            },
            breadListStateAdd(state, obj){
                state.breadListState.push(obj);
            },
            breadListStateRemove(state, num){
                state.breadListState = state.breadListState.slice(0,num)
            }
        },
        watch: {
            $route(){
                this.getBreadcrumb();
            }
        }
    }
</script>

<style lang="scss" scoped>
.crumbs {
    width: 100%;
    padding: 5px;
}
</style>

