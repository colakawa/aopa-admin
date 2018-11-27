<template>
  <div class="table-wrap">
    <div class="filter-search">
      <p>筛选条件</p>
      <div class="filter-left">
        <Row>
          <Col span="6">
            <span>申请人</span>
            <input type="text" placeholder="模糊匹配查询" name="code" class="filter-input">
          </Col>
          <Col span="6">
            <span>手机号码</span>
            <input type="text" placeholder="模糊匹配查询" name="code" class="filter-input">
          </Col>
          <Col span="8">
            <span>审核状态</span>
            <select name="status" class="filter-select">
              <option v-for="item in statusList"
                :key="item.id"
                :value="item.id" >{{ item.name }}</option>
            </select>
          </Col>
        </Row>
      </div>
      <div class="filter-search-btn">
            查询
      </div>
    </div>
    <div class="table-sub-wrap">
      <p class="sub-wrap-title">机场管理</p>
      <table class="table-data">
        <thead>
          <tr>
            <th>ID</th>
            <th>机场名称</th>
            <th>机场所有人</th>
            <th>申请人</th>
            <th>手机号码</th>
            <th>状态</th>
            <th>操作</th>
            <th>申请时间</th>
            <th>审核时间</th>
            <th>审核人</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in otherAirportData" :key="item.airid">
            <td>{{ item.applyid }}</td>
            <td>{{ item.airport_name }}</td>
            <td>{{ item.airport_holder }}</td>
            <td>{{ item.applicant }}</td>
            <td>{{ item.contact_num }}</td>
            <td>{{ item.status_desc }}</td>
            <td class="table-operation">
              <span v-if="item.status_desc == '通过' || item.status_desc == '驳回'">查看</span>
              <span v-if="item.status_desc == '待审核'" @click="routerDetail(item.applyid)">审核</span>
            </td>
            <td>{{ item.add_time }}</td>
            <td>{{ item.check_time }}</td>
            <td>{{ item.check_user }}</td>
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
      otherAirportData: [],
      pageSize: 10, // 每页显示条数
      totalNum: 0, // 总条数
      pages: 1, // 当前页
      statusList: [ // 状态
        { id: '', name: '全部' },
        { id: 1, name: '待审核' },
        { id: 2, name: '通过' },
        { id: 3, name: '驳回' },
      ],
      create_date: '',
      status: '',
      code: '',
    };
  },
  methods: {
    // 获取列表数据
    getData(pageSize, pages) {
      const that = this;
      this.$fetch.post('admin/other_airport_check/otherAirportList', {
        token: this.$stores.getToken(),
        pages,
        page_num: pageSize,
      }).then(res => {
        that.otherAirportData = res.data;
        that.totalNum = res.totalNum;
        this.nowData = [];
        console.log(res);
      }).catch(error => {
        console.log(error);
      });
    },
     // 点击编辑-----路由跳转
    routerDetail(id){
      this.$router.push({path: 'otherAirportManage/otherApplyDetail', query: {applyId: id}})
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
    changeCertificateUnit(val, type) {
      console.log(val, '123');
    },
    // 操作
    // handleStatus(airid, status){
    //   const that = this;
    //   this.$swal({
    //     title: '确定要执行此操作吗？',
    //     text: '',
    //     type: "warning",
    //     showCancelButton: true,
    //     confirmButtonColor: "#DD6B55",
    //     confirmButtonText: "确定！",
    //     cancelButtonText:"取消",
    //   }).then((dismiss) => {
    //      if(dismiss.value){
    //        that.$fetch.post('/admin/Airport_manage/saveAirportStatus', {
    //          token: that.$stores.getToken(),
    //          airid: airid,
    //          status: status,
    //        })
    //        .then(res => {
    //          that.getData();
    //        })
    //        .catch(error => {
    //          console.log(error)
    //        })
    //      }else {
    //        return ;
    //      }
    //   })
    // }
  },
  created() {
    this.getData(this.pageSize, this.pages);
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/framework/tableListCommon.scss';
</style>
