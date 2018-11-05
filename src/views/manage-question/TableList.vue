<template>
  <div class="table-wrap">
    <div class="filter-search">
      <p>筛选条件</p>
      <div class="filter-left">
        <Row>
          <Col span="6">
          <span>关键词</span>
          <input type="text" placeholder="模糊匹配查询" id="question_content_filter" class="filter-input">
            </Col>
          <Col span="5" class="">
          <span>问题类型</span>
          <select name="question_type_filter" class="filter-select">
            <option value="" selected>全部</option>
            <option value="1">机场取证</option>
            <option value="2">机场信息发布</option>
            <option value="3">机场信息查询</option>
            <option value="4">机场地图</option>
            <option value="5">机场搜索</option>
            <option value="6">业务合作</option>
            <option value="7">其他</option>
          </select>
            </Col>
          <Col span="5">
          <span>问题状态</span>
          <select name="question_status_filter" class="filter-select" id="question_status_filter">
            <option value="" selected>全部</option>
            <option value="1">未处理</option>
            <option value="2">已处理</option>
            <option value="3">已忽略</option>
          </select>
            </Col>
        </Row>
        <Row>
          <Col span="6">
          <span>提出人</span>
          <input type="text" placeholder="模糊匹配查询" id="real_name_filter" class="filter-input">
              </Col>
          <Col span="6">
          <span>联系电话</span>
          <input type="text" placeholder="模糊匹配查询" id="mobile_phone_filter" class="filter-input">
              </Col>
          <Col span="3" class="filter-search-btn">
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
            <th>问题类型</th>
            <th>问题描述</th>
            <th>提出人</th>
            <th>联系电话</th>
            <th>状态</th>
            <th>操作</th>
            <th>提出时间</th>
            <th>解决时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in questionData" :key="item.question_id">
            <td>{{ item.question_id }}</td>
            <td>{{ item.question_type }}</td>
            <td>{{ item.question_content }}</td>
            <td>{{ item.real_name }}</td>
            <td>{{ item.mobile_phone }}</td>
            <td>{{ item.question_status_msg }}</td>
            <td class="table-operation">
              <span v-if="item.question_status == '1'">编辑</span>
              <span v-if="item.question_status == '1'">忽略</span>
              <span v-if="item.question_status == '2' || item.question_status == '3'">查看</span>
            </td>
            <td>{{ item.add_time }}</td>
            <td>{{ item.solve_time }}</td>
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
      questionData: [],
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
        .post('admin/Question_manage/getQuestionList', {
          token: this.$stores.getToken(),
          pages,
          page_num: pageSize,
        })
        .then(res => {
          that.questionData = res.data;
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

