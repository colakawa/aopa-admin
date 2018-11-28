<template>
  <div class="table-wrap">
    <div class="filter-search">
      <p>筛选条件</p>
      <div class="filter-left">
        <Row>
          <Col span="6">
            <span>邀请码</span>
            <input type="text" placeholder="模糊匹配查询" name="code" class="filter-input" v-model="param.code">
          </Col>
          <Col span="6">
            <span>状态</span>
            <select name="status" class="filter-select" v-model="param.status">
              <option v-for="item in statusList"
                :key="item.id"
                :value="item.id" >{{ item.name }}</option>
            </select>
          </Col>
          <Col span="12">
            <span>生成日期</span>
            <DatePicker type="date" placeholder="YYYY-MM-DD" style="width: 200px" v-model="param.create_date"></DatePicker>
          </Col>
        </Row>
      </div>
      <div class="filter-search-btn" @click="handleSearch">
            查询
      </div>
    </div>
    <div class="table-sub-wrap">
      <p class="sub-wrap-title">机场管理 
        <span class="add-button" @click="produceCode">生成邀请码</span> 
         <span class="add-button" @click="handleDerive">导出列表</span>
      </p>
      <table class="table-data">
        <thead>
          <tr>
            <th>ID</th>
            <th>编号</th>
            <th>类型</th>
            <th>状态</th>
            <th>生成日期</th>
            <th>使用日期</th>
            <th>使用用户</th>
            <th>使用机场</th>
            <th>备注</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in codeData" :key="item.airid">
            <td>{{ item.invitation_code_id }}</td>
            <td>{{ item.invitation_code }}</td>
            <td>{{ item.type == 1 ? '已取证通用机场' : '其他起降场地'}}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.create_date }}</td>
            <td>{{ item.use_date }}</td>
            <td>{{ item.userid }}</td>
            <td>{{ item.airid }}</td>
            <td>{{ item.remark }}</td>
            <td class="table-operation">
              <span v-if="item.status != '作废'" @click="handleNullify(item.invitation_code_id)">作废</span>
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
      codeData: [],
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
      status: '',
      code: '',
      param: {
          code: '',
          status: '',
          create_date: '',
          remark: '',
          type: '',
      },
      create_num: '', // 生成邀请码数量
      remark: '', // 生成邀请码备注
      // invitation_code_id: '' // 作废参数
    };
  },
  methods: {
    // 获取列表数据
    getListData(pageSize, pages, param) {
      const that = this;
      this.$fetch
          .post('/admin/invitation/codeList', {
            token: this.$stores.getToken(),
            code: param.code,
            status: param.status,
            create_date: param.create_date,
            remark: param.remark,
            type: param.type,
            pages,
            page_num: pageSize,
          }).then(res => {
            that.codeData = res.data;
            that.totalNum = res.totalNum;
            this.nowData = [];
            console.log(res);
          }).catch(error => {
            console.log(error);
          });
    },
     // 搜索查询
    handleSearch(){
        const vm = this;
        vm.pages = 1
        vm.getListData(vm.pageSize, vm.pages, vm.param);      
    },
     // 点击编辑-----路由跳转
    routerDetail(id){
      // this.$router.push({path: 'airportManage/airportDetail', query: {airId: id}})
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
    // 生成邀请码
    produceCode(){
      this.$swal({
        title: '生成邀请码',
        html:
          '<div style="margin: 40px 0 40px;"><span>生成邀请码数量：</span><input id="swal-create_num" class="swal-input" v-model="create_num"></div>' +
          '<div style="margin: 0 0 40px;"><span>生成邀请码备注：</span><input id="swal-remark" class="swal-input" v-model="remark"></div>',
        focusConfirm: false,
        preConfirm: () => {
            this.create_num =  document.getElementById('swal-create_num').value;
            this.remark = document.getElementById('swal-remark').value;
            const that = this;
            this.$fetch
                .post('/admin/invitation/createInvitationCode', {
                  token: this.$stores.getToken(),
                  create_num: this.create_num,
                  remark: this.remark,
                }).then(res => {
                  that.getListData(that.pageSize, that.pages, that.param);
                }).catch(error => {
                  console.log(error);
                });
        }
      })
    },
    // 作废
    handleNullify(invitation_code_id){
      const that = this;
      this.$fetch
          .post('/admin/invitation/cancel', {
            token: this.$stores.getToken(),
            invitation_code_id: invitation_code_id,
          }).then(res => {
            that.$swal({
              title: res.msg,
              text: '',
            }).then(() => {
              that.getListData(that.pageSize, that.pages, that.param);
            })
          }).catch(error => {
            console.log(error);
          });
    },
    // 导出列表
    handleDerive(){
      window.open( 'http://www.lcsairport.com/admin/invitation/CodeExport' + '?code=' + this.param.code
        + '&create_date=' + this.param.create_date + '&status=' + this.param.status + '&token=' + this.$stores.getToken() 
        + '&remark=' + this.param.remark + '&type=' + this.param.type)
    }
  },
  created() {
    this.getListData(this.pageSize, this.pages, this.param);
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/framework/tableListCommon.scss';
</style>
