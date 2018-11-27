<template>
  <div class="table-wrap">
    <div class="filter-search">
      <p>筛选条件</p>
      <div class="filter-left">
        <Row>
          <Col span="6">
          <span>关键词</span>
          <input type="text" placeholder="模糊匹配查询" class="filter-input" v-model="param.question_content">
            </Col>
          <Col span="5" class="">
          <span>问题类型</span>
          <select name="question_type_filter" class="filter-select" v-model="param.question_type">
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
          <select name="question_status_filter" class="filter-select" v-model="param.question_status">
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
          <input type="text" placeholder="模糊匹配查询" class="filter-input" v-model="param.real_name">
              </Col>
          <Col span="6">
          <span>联系电话</span>
          <input type="text" placeholder="模糊匹配查询" class="filter-input" v-model="param.mobile_phone">
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
              <span v-if="item.question_status == '1'" @click="routerDetail(item.question_id, 0)">编辑</span>
              <span v-if="item.question_status == '1'" @click="ignoreQuestion(item.question_id, item.question_status)">忽略</span>
              <span v-if="item.question_status == '2' || item.question_status == '3'"
              @click="routerDetail(item.question_id, 1)">查看</span>
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
      param: {
          question_content: '',
          question_type: '',
          question_status: '',
          real_name: '',
          mobile_phone: '',
      }
    };
  },
  methods: {
    // 获取列表数据
    getData(pageSize, pages, param) {
      const that = this;
      this.$fetch
        .post('admin/Question_manage/getQuestionList', {
          token: this.$stores.getToken(),
          question_content: param.question_content,
          question_type: param.question_type,
          question_status: param.question_status,
          real_name: param.real_name,
          mobile_phone: param.mobile_phone,
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
     // 搜索查询
    handleSearch(){
        const vm = this;
        vm.pages = 1
        vm.getData(vm.pageSize, vm.pages, vm.param);      
    },
    // 点击编辑-----路由跳转
    routerDetail(id, status){
      this.$router.push({path: 'questionManage/questionDetail', query: {questionId: id, statusId: status}})
    },
    // 忽略问题
    ignoreQuestion(question_id, question_status){
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
           that.$fetch.post('/admin/Question_manage/saveQuestion', {
             token: that.$stores.getToken(),
             question_id: question_id,
             question_status: question_status,
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
  },
  created() {
    this.getData(this.pageSize, this.pages, this.param);
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/framework/tableListCommon.scss';
</style>

