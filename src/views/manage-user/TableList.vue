<template>
  <div class="table-wrap">
    <div class="filter-search">
      <p>筛选条件</p>
      <div class="filter-left">
        <Row>
          <Col span="6">
          <span>手机号码</span>
          <input type="text" placeholder="模糊匹配查询" id="admin_info_search_phone" class="filter-input">
            </Col>
          <Col span="6">
          <span>真实姓名</span>
          <input type="text" placeholder="模糊匹配查询" id="admin_info_search_name" class="filter-input">
            </Col>
          <Col span="5" class="">
          <span>性别</span>
          <select name="sex" id="sex" class="filter-select">
            <option value="">全部</option>
            <option value="1">男</option>
            <option value="2">女</option>
          </select>
            </Col>
        </Row>
        <Row>
          <Col span="5">
          <span>用户类型</span>
          <select name="usergroupid" class="filter-select" id="usergroupid">
            <option value="">全部</option>
            <option value="2">普通用户</option>
            <option value="1">机场信息管理员</option>
          </select>
              </Col>
          <Col span="6">
          <span>用户状态</span>
          <select name="user_status" id="user_status" class="filter-select">
            <option value="">全部</option>
            <option value="9">冻结</option>
            <option value="1">正常</option>
          </select>
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
            <th>用户类型</th>
            <th>手机</th>
            <th>真实姓名</th>
            <th>性别</th>
            <th>昵称</th>
            <th>状态</th>
            <th>操作</th>
            <th>注册时间</th>
            <th>最后修改时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in userData" :key="item.userid">
            <td>{{ item.userid }}</td>
            <td>{{ item.usergroupid }}</td>
            <td>{{ item.mobile_phone }}</td>
            <td>{{ item.real_name }}</td>
            <td>{{ item.sex }}</td>
            <td>{{ item.username }}</td>
            <td>{{ item.user_status }}</td>
            <td class="table-operation">
              <span v-if="item.user_status == '正常'">冻结</span>
              <span v-if="item.user_status == '冻结'">解冻</span>
              <span>查看</span>
            </td>
            <td>{{ item.add_time }}</td>
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
      userData: [],
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
        .post('admin/index/adminUserInfo', {
          token: this.$stores.getToken(),
          pages,
          page_num: pageSize,
        })
        .then(res => {
          that.userData = res.data;
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

