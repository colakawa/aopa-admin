<template>
  <div class="table-wrap">
    <div class="table-sub-wrap">
      <p class="sub-wrap-title">机场管理</p>
      <table class="table-data">
        <thead>
          <tr>
            <th>序号</th>
            <th>轮播标题</th>
            <th>图片</th>
            <th>排序</th>
            <th>跳转链接</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in carouselData" :key="item.carousel_id">
            <td>{{ item.carousel_id }}</td>
            <td>{{ item.carousel_title }}</td>
            <td>
              <div class="carousel-wrap">
                <img :src="imgUrlPrefix + 'carousel/' + item.carousel_img_url" alt="">
              </div>
            </td>
            <td>{{ item.sort }}</td>
            <td>{{ item.url }}</td>
            <td>{{ item.carousel_status_msg }}</td>
            <td class="table-operation">
              <span v-if="item.carousel_status == '1' || item.carousel_status == '2'">编辑</span>
              <span v-if="item.carousel_status == '2'">显示</span>
              <span v-if="item.carousel_status == '1'">不显示</span>
              <span v-if="item.carousel_status == '1' || item.carousel_status == '2'">删除</span>
              <span v-if="item.carousel_status == '9' || item.carousel_status == '已删除'">查看</span>
            </td>
          </tr>
        </tbody>
      </table>
      <Page
        :total="totalNum"
        :page-size="pageSize"
        :current="pages"
        @on-change="handlePage"
        @on-page-size-change="handlePageSize"
        show-sizer
        show-total/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // imgUrlPrefix: 'http://ga.aopa.org.cn/carousel/',
      imgUrlPrefix: process.env.VUE_APP_IMG_BASE_URL,
      carouselData: [],
      pageSize: 10, // 每页显示条数
      totalNum: 0, // 总条数
      pages: 1, // 当前页
    };
  },
  mounted() {
    console.log(process.env, 'process.env');
  },
  methods: {
    handleUserStatus(index) {
      this.$Modal.info({
        title: '确定要执行此操作吗？',
        // content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
        content: `确定要执行此操作吗？${index}`,
      });
    },
    remove(index) {
      this.data6.splice(index, 1);
    },
    getData(pageSize, pages) {
      const that = this;
      this.$fetch
        .post('admin/Carousel_manage/carouselList', {
          token: this.$stores.getToken(),
          pages,
          page_num: pageSize,
        })
        .then(res => {
          that.carouselData = res.data;
          that.totalNum = res.totalNum;
          this.nowData = [];
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    },
    handlePage(value) {
      this.pages = value;
      this.changePage();
    },
    handlePageSize(value) {
      this.pageSize = value;
      this.changePage();
    },
    // 点击切换分页
    changePage() {
      const vm = this;
      this.getData(vm.pageSize, vm.pages);
    },
    _nowPageSize(index) {
      this.pageSize = index;
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/framework/tableListCommon.scss';
.carousel-wrap {
  width: 100px;
  height: 60px;
  padding: 10px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>

