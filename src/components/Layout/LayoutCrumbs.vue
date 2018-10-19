<template>
    <!-- <div class="crumbs">
        <span v-for="(item, index) in breadlist">
            <router-link :to="item.path">{{item.name}}</router-link>
        </span>
    </div> -->
    <Breadcrumb separator=">" class="crumbs">
        <BreadcrumbItem v-for="(item, index) in breadlist" :key="index" :to="{path: item.path}">{{item.name}}</BreadcrumbItem>
        <!-- <BreadcrumbItem to="/">Home</BreadcrumbItem>
        <BreadcrumbItem to="/components/breadcrumb">Components</BreadcrumbItem>
        <BreadcrumbItem>Breadcrumb</BreadcrumbItem> -->
    </Breadcrumb>
</template>
<script>
    export default {
        created() {
            this.getBread();
        },
        data() {
            return {
                breadlist: ""
            }
        },
        methods: {
            getBread(){
                this.breadlist = this.$route.matched;
                console.log(this.$route.matched)
                this.$route.matched.forEach((item, index) => {
                    console.log(item.path)
                    item.meta.name === "首页" ? item.path = "/" : this.$route.path === item.path;
                })
            }
        },
        watch: {
            $route(){
                this.getBread()
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

