<template>
  <!-- <div class="crumbs">
        <span v-for="(item, index) in breadlist">
            <router-link :to="item.path">{{item.name}}</router-link>
        </span>
    </div> -->
  <Breadcrumb separator=">" class="crumbs">
    <BreadcrumbItem v-for="(item, index) in breadlist" :key="index" :to="{path: item.path}">
      {{ item.name }}
    </BreadcrumbItem>
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
      breadlist: '',
    };
  },
  methods: {
    getBread() {
      this.breadlist = this.$route.matched;
      console.log(this.$route.matched, 'this.$route.matched;');
      // console.log(this.$route.matched)
      this.$route.matched.map(item => item);
    },
  },
  watch: {
    $route() {
      this.getBread();
    },
  },
};
</script>

<style lang='scss' scoped>
.crumbs {
  background-color: #eee;
  height: $heightCrumbs;
  line-height: $heightCrumbs;
}
</style>
