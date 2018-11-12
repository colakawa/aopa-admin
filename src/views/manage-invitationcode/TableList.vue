<template>
  <div class="table-wrap">
    <div class="filter-search">
      <p>筛选条件</p>
      <div class="filter-left">
        <Row>
          <Col span="6">
            <span>邀请码</span>
            <input type="text" placeholder="模糊匹配查询" name="code" class="filter-input">
          </Col>
          <Col span="8" v-if="value == '1'">
            <select name="status" class="filter-select">
              <option v-for="status in statusList"
                :key="status.id"
                :value="status.id" >{{ status.name }}</option>
            </select>
          </Col>
          <Col span="4" v-if="value == '1'">
            <DatePicker type="datetime" id="create_date" placeholder="YYYY-MM-DD" style="width: 200px" v-model="create_date"></DatePicker>
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
            <th>编号</th>
            <th>状态</th>
            <th>生成日期</th>
            <th>使用日期</th>
            <th>使用用户</th>
            <th>使用机场</th>
            <th>备注</th>
            <th>操作</th>
          </tr>
        </thead>
        <!-- <tbody>
          <tr v-for="item in airportData" :key="item.airid">
            <td>{{ item.airid }}</td>
            <td>{{ item.airport_name }}</td>
            <td>{{ item.other_airport_type }}</td>
            <td>{{ item.airport_type }}</td>
            <td>{{ item.airport_rank }}</td>
            <td>{{ item.airport_run }}</td>
            <td>{{ item.mobile_phone }}</td>
            <td>{{ item.status }}</td>
            <td class="table-operation">
              <span @click="handleStatus(item.airid, item.status)"
                v-if="item.status == '冻结' || item.status == '下线'">上线</span>
              <span @click="handleStatus(item.airid, item.status)"
                v-if="item.status == '已发布' || item.status == '在线' || item.status == '已取证'">下线</span>
              <span v-if="item.status == '已发布' || item.status == '在线'">变更所属</span>
              <span v-if="item.type == '1'">查看</span>
              <span v-if="item.type == '2'" @click="routerDetail(item.airid)">编辑</span>
            </td>
            <td>{{ item.release_time }}</td>
            <td>{{ item.save_time }}</td>
          </tr>
        </tbody> -->
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
      airportData: [],
      pageSize: 10, // 每页显示条数
      totalNum: 0, // 总条数
      pages: 1, // 当前页
      statusList: [ // 状态
        { id: '', name: '全部' },
        { id: 1, name: '未使用' },
        { id: 2, name: '已绑定机场信息' },
        { id: 3, name: '已注册用户' },
        { id: 4, name: '已发布机场信息' },
        { id: 9, name: '作废' },
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
      this.$fetch.post('admin/invitation/codeList', {
        token: this.$stores.getToken(),
        pages,
        page_num: pageSize,
      }).then(res => {
        that.airportData = res.data;
        that.totalNum = res.totalNum;
        this.nowData = [];
        console.log(res);
      }).catch(error => {
        console.log(error);
      });
    },
     // 点击编辑-----路由跳转
    routerDetail(id){
      this.$router.push({path: 'airportManage/airportDetail', query: {airId: id}})
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
    handleStatus(airid, status){
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
           that.$fetch.post('/admin/Airport_manage/saveAirportStatus', {
             token: that.$stores.getToken(),
             airid: airid,
             status: status,
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
    }
  },
  created() {
    this.getData();
  },
};
</script>
