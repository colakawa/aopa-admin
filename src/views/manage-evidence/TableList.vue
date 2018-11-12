<template>
  <div class="table-wrap">
    <div class="filter-search">
      <p>筛选条件</p>
      <div class="filter-left">
        <Row>
          <Col span="6">
          <span>机场名称</span>
          <input type="text" placeholder="模糊匹配查询" id="admin_airport_search_text" class="filter-input">
            </Col>
          <!--机场类型-->
          <Col span="8">
          <select name="airport_type" id="airport_type" class="filter-select">
            <option
              v-for="airportType in airportTypeList"
              :key="airportType.id"
              :value="airportType.id"
            >{{ airportType.name }}</option>
          </select>
            </Col>
          <Col span="4">
          <!--A1 A2 A3 B -->
          <select name="airport_rank" id="airport_rank" class="filter-select">
            <option value="">机场类/级别（全部）</option>
            <option value="1">A1</option>
            <option value="2">A2</option>
            <option value="3">A3</option>
            <option value="4">B</option>
          </select>
            </Col>
        </Row>
      </div>
      <div class="filter-search-btn">
            查询
      </div>
    </div>
    <div class="table-sub-wrap">
      <p class="sub-wrap-title">机场管理 <span class="add-button" @click="routerDetail('')">添加取证机场</span> </p>
      <table class="table-data">
        <thead>
          <tr>
            <th>序号</th>
            <th>许可证编号</th>
            <th>机场名称</th>
            <th>机场类别</th>
            <th>机场类/级别</th>
            <th>机场所有人</th>
            <th>机场运营人</th>
            <th>领证日期</th>
            <th>状态</th>
            <th>操作时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in certificateLogData"
          :key="item.certificate_log_id"
          @click="routerDetail(item.certificate_log_id)">
            <td>{{ item.certificate_log_id }}</td>
            <td>{{ item.licence_num }}</td>
            <td>{{ item.airport_name }}</td>
            <td>{{ item.airport_type }}</td>
            <td>{{ item.airport_rank }}</td>
            <td>{{ item.airport_holder }}</td>
            <td>{{ item.airport_run }}</td>
            <td>{{ item.certificate_time }}</td>
            <td>{{ item.airport_status }}</td>
            <td>{{ item.operation_time }}</td>
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
      certificateLogData: [],
      pageSize: 10, // 每页显示条数
      totalNum: 0, // 总条数
      pages: 1, // 当前页
      airportTypeList: [ // 机场类型
        { id: '', name: '机场类型（全部）' },
        { id: 1, name: '跑道型机场' },
        { id: 2, name: '跑道型机场（兼表面直升机场）' },
        { id: 3, name: '跑道型机场（兼水上机场）' },
        { id: 4, name: '跑道型机场（兼表面直升机场、水上机场）' },
        { id: 5, name: '表面直升机场' },
        { id: 6, name: '高架直升机场' },
        { id: 7, name: '船上直升机场' },
        { id: 8, name: '直升机水上平台' },
        { id: 9, name: '水上机场' },
      ],
      certificateUnitId: '',
      value: '',
    };
  },
  methods: {
    // 获取列表数据
    getListData(pageSize, pages) {
      const that = this;
      this.$fetch.post('admin/Promulgate_airport_manage/certificateLogList', {
        token: this.$stores.getToken(),
        pages,
        page_num: pageSize,
      }).then(res => {
        that.certificateLogData = res.data;
        that.totalNum = res.totalNum;
        console.log(res);
      }).catch(error => {
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
      this.getListData(vm.pageSize, vm.pages);
    },
    changeCertificateUnit(val, type) {
      console.log(val, '123');
    },
    // 查看详情，创建机场-----路由跳转
    routerDetail(id){
      this.$router.push({path: 'evidenceManage/evidenceDetail', query: {evidenceId: id}})
    },
  },
  created() {
    this.getListData();
  },
};
</script>


<style lang="scss" scoped>
@import '@/styles/framework/tableListCommon.scss';
</style>
