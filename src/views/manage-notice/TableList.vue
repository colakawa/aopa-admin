<template>
  <div class="table-wrap">
    <div class="filter-search">
      <p>筛选条件</p>
      <div class="filter-left">
        <Row>
          <Col span="6">
          <span>公告标题</span>
          <input type="text" placeholder="模糊匹配查询" name="notice_title" class="filter-input">
            </Col>
          <Col span="16" class="">
          <span>发布时间</span>
          <DatePicker type="datetime" placeholder="Select date and time" style="width: 200px"></DatePicker>
          <span>至</span>
          <DatePicker type="datetime" placeholder="Select date and time" style="width: 200px"></DatePicker>
            </Col>
          <Col span="2" class="filter-search-btn">
              查询
            </Col>
        </Row>
      </div>
    </div>
    <div class="table-sub-wrap">
      <p class="sub-wrap-title">机场管理</p>
      <table class="table-data">
        <thead>
          <tr>
            <th>ID</th>
            <th>标题</th>
            <th>状态</th>
            <th>操作</th>
            <th>创建时间</th>
            <th>发布时间</th>
            <th>最后编辑日期</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in noticeData" :key="item.notice_id">
            <td>{{ item.notice_id }}</td>
            <td>{{ item.notice_title }}</td>
            <td>{{ item.notice_status_msg }}</td>
            <td class="table-operation">
              <span>编辑</span>
              <span v-if="item.notice_status == '1'">发布</span>
              <span v-if="item.notice_status == '2'">下线</span>
              <span v-if="item.notice_status == '3'">上线</span>
              <span v-if="item.notice_status == '1'">删除</span>
              <span v-if="item.notice_status == '2' && item.recommend == '1'">推荐</span>
              <span v-if="item.notice_status == '2' && item.recommend == '2'">不推荐</span>
            </td>
            <td>{{ item.add_time }}</td>
            <td>{{ item.issue_time }}</td>
            <td>{{ item.last_save_time }}</td>
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
      noticeData: [],
      pageSize: 10, // 每页显示条数
      totalNum: 0, // 总条数
      pages: 1, // 当前页
    };
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
        .post('admin/Notice_manage/getNoticeList', {
          token: this.$stores.getToken(),
          pages,
          page_num: pageSize,
        })
        .then(res => {
          that.noticeData = res.data;
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
</style>

