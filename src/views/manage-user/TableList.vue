<template>
  <div class="table-wrap">
    <div class="filter-search">
      <p>筛选条件</p>
      <div class="filter-left">
        <Row>
          <Col span="6">
              <span>手机号码</span>
              <input type="text" placeholder="模糊匹配查询" class="filter-input" v-model="mobile_phone">
          </Col>
          <Col span="6">
              <span>真实姓名</span>
              <input type="text" placeholder="模糊匹配查询" class="filter-input" v-model="real_name">
          </Col>
          <Col span="5" class="">
          <span>性别</span>
          <select name="sex" id="sex" class="filter-select" v-model="sex">
              <option value="">全部</option>
              <option value="1">男</option>
              <option value="2">女</option>
          </select>
            </Col>
        </Row>
        <Row>
          <Col span="5">
          <span>用户类型</span>
          <select name="usergroupid" class="filter-select" v-model="usergroupid">
            <option value="">全部</option>
            <option value="2">普通用户</option>
            <option value="1">机场信息管理员</option>
          </select>
              </Col>
          <Col span="6">
          <span>用户状态</span>
          <select name="user_status" class="filter-select" v-model="user_status">
            <option value="">全部</option>
            <option value="9">冻结</option>
            <option value="1">正常</option>
          </select>
              </Col>
          <Col span="3" class="filter-search-btn">
              <span @click="handleSearch">查询</span>
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
              <span v-if="item.user_status == '正常'" @click="handleStatus(item.userid, item.user_status)">冻结</span>
              <span v-if="item.user_status == '冻结'" @click="handleStatus(item.userid, item.user_status)">解冻</span>
              <span @click="routerDetail(item.userid)">查看</span>
            </td>
            <td>{{ item.add_time }}</td>
            <td>{{ item.last_save_time }}</td>
          </tr>
        </tbody>
      </table>
      <Page
        :total="totalNum"
        :page-size="page_num"
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
      page_num: 10, // 每页显示条数
      totalNum: 0, // 总条数
      pages: 1, // 当前页
      mobile_phone: '',
      real_name: '',
      sex: '',
      usergroupid: '',
      user_status: '',
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
    // 获取列表数据
    getData(page_num, pages, mobile_phone, real_name, sex, usergroupid, user_status) {
      const that = this;
      this.$fetch
        .post('admin/index/adminUserInfo', {
          token: this.$stores.getToken(),
          mobile_phone,
          real_name,
          sex,
          usergroupid,
          user_status,
          pages,
          page_num,
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
    // 操作
    handleStatus(userid, status){
      const that = this;
      this.$swal({
        title: '确定要执行此操作吗？',
        text: '',
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定！",
        cancelButtonText:"取消",
      }).then((dismiss) => {
         if(dismiss.value){
           that.$fetch.post('/admin/index/saveUserStatus', {
             token: that.$stores.getToken(),
             userid: userid,
             user_status: status,
           })
           .then(res => {
             that.getData();
           })
           .catch(error => {
             console.log(error)
           })
         }else {
           return ;
         }
      })
    },
    // 点击查看-----路由跳转
    routerDetail(id){
      this.$router.push({path: '/userDetail', query: {userId: id}})
    },
    // 搜索查询
    handleSearch(){
        const vm = this;
        vm.pages = 1
        vm.getData(this.page_num, this.pages, this.mobile_phone, this.real_name, this.sex, this.usergroupid, this.user_status);
    },
    handlePage(value) {
      this.pages = value;
      this.changePage();
    },
    handlePageSize(value) {
      this.page_num = value;
      this.changePage();
    },
    // 点击切换分页
    changePage() {
      const vm = this;
      this.getData(vm.page_num, vm.pages, this.mobile_phone, this.real_name, this.sex, this.usergroupid, this.user_status);
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

