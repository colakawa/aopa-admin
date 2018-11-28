<template>
  <div class="table-wrap">
    <div class="filter-search">
      <p>筛选条件</p>
      <div class="filter-left">
        <Row>
          <Col span="6">
          <span>机场名称</span>
          <input type="text" placeholder="模糊匹配查询" class="filter-input" v-model="param.airport_name">
            </Col>
          <Col span="5" class="">
          <span>机场类型</span>
          <select
            class="filter-select"
            v-model="param.other_airport_type">
            <!--1.通用机场  2.运输机场 3.其他起降场地-->
            <option value="">机场类别（全部）</option>
            <option value="1">通用机场</option>
            <option value="2">运输机场</option>
            <option value="3">其他起降场地</option>
          </select>
            </Col>
          <!--机场类型-->
          <Col span="8" v-if="param.other_airport_type == '1'">
          <select class="filter-select" v-model="param.airport_type">
            <option
              v-for="airportType in airportTypeList"
              :key="airportType"
              :value="airportType.id"
            >{{ airportType.name }}</option>
          </select>
            </Col>
          <Col span="4" v-if="param.other_airport_type == '1'">
          <!--A1 A2 A3 B -->
          <select name="airport_rank" class="filter-select" v-model="param.airport_rank">
            <option value="">机场类/级别（全部）</option>
            <option value="1">A1</option>
            <option value="2">A2</option>
            <option value="3">A3</option>
            <option value="4">B</option>
          </select>
            </Col>
        </Row>
        <Row>
          <Col span="6">
          <span>运营人&nbsp;&nbsp;</span>
          <input type="text" placeholder="模糊匹配查询" class="filter-input" v-model="param.airport_run">
              </Col>
          <Col span="5">
          <span>机场状态</span>
          <select name="status" class="filter-select" v-model="param.status">
            <option value="">机场状态（全部）</option>
            <option value="1">未发布(在线未发布)</option>
            <option value="2">已发布(在线已发布)</option>
            <option value="3">下线</option>
            <option value="4">在线</option>
            <option value="5">假删</option>
          </select>
              </Col>
          <!--所在地区：1.华北；2.西北；3.东北；4.华东；5.西南；6.中南；7.新疆；-->
          <Col span="6">
          <span>所在地区</span>
          <select
            name="certificate_unit"
            class="filter-select"
            v-model="param.certificate_unit">
            <option
              v-for="certificateUnit in certificateUnitList"
              :value="certificateUnit.id"
            >{{ certificateUnit.name }}</option>
          </select>
              </Col>
          <Col span="6">
          <select name="province_id" class="filter-select" v-model="param.province_id">
            <!-- 省份数据 -->
            <option
              v-for="province in provinceList[param.certificate_unit]"
              :value="province"
            >{{ province == '' ?  '省/直辖市（全部）': province }}</option>
          </select>
              </Col>
        </Row>
      </div>
      <div class="filter-search-btn" @click="handleSearch">
            查询
      </div>
    </div>
    <div class="table-sub-wrap">
      <p class="sub-wrap-title">机场管理
         <span class="add-button" @click="routerDetail('')">创建机场</span> 
         <span class="add-button" @click="handleDerive">导出列表</span>
      </p>
      <table class="table-data">
        <thead>
          <tr>
            <th>ID</th>
            <th>机场名称</th>
            <th>机场类别</th>
            <th>机场类型</th>
            <th>机场类/级别</th>
            <th>机场运营人</th>
            <th>所属用户</th>
            <th>状态</th>
            <th>操作</th>
            <th>发布时间</th>
            <th>最后修改时间</th>
          </tr>
        </thead>
        <tbody>
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
              <span v-if="item.status == '已发布' || item.status == '在线'" @click="changeOwnership(item.airport_name, item.airid)">变更所属</span>
              <span v-if="item.type == '1'">查看</span>
              <span v-if="item.type == '2'" @click="routerDetail(item.airid)">编辑</span>
            </td>
            <td>{{ item.release_time }}</td>
            <td>{{ item.save_time }}</td>
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
      airportData: [],
      pageSize: 10, // 每页显示条数
      totalNum: 0, // 总条数
      pages: 1, // 当前页
      certificateUnitList: [ // 地区数据
        { id: '', name: '地区（全部）' },
        { id: 1, name: '华北' },
        { id: 2, name: '西北' },
        { id: 3, name: '东北' },
        { id: 4, name: '华东' },
        { id: 5, name: '西南' },
        { id: 6, name: '中南' },
        { id: 7, name: '新疆' },
      ],
      provinceList: {
        // 地区省份二级联动
        '': ['', '黑龙江省', '吉林省', '辽宁省', '北京市', '天津市', '内蒙古自治区', '河北省', '山西省',
          '上海市', '浙江省', '山东省', '江苏省', '福建省', '江西省', '安徽省', '湖北省', '广西壮族自治区', '广东省', '河南省', '海南省',
          '湖南省', '甘肃省', '青海省', '陕西省', '宁夏回族自治区', '重庆市', '云南省', '四川省', '贵州省', '西藏自治区',
          '新疆维吾尔自治区',
        ],
        3: ['', '黑龙江省', '吉林省', '辽宁省'],
        1: ['', '北京市', '天津市', '内蒙古自治区', '河北省', '山西省'],
        4: ['', '上海市', '浙江省', '山东省', '江苏省', '福建省', '江西省', '安徽省'],
        6: ['', '湖北省', '广西壮族自治区', '广东省', '河南省', '海南省', '湖南省'],
        2: ['', '甘肃省', '青海省', '陕西省', '宁夏回族自治区'],
        5: ['', '重庆市', '云南省', '四川省', '贵州省', '西藏自治区'],
        7: ['', '新疆维吾尔自治区'],
      },
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
      param: {
          airport_rank: '',
          airport_type: '',
          status: '',
          certificate_unit: '',
          province_id: '',
          airport_name: '',
          airport_run: '',
          mobile_phone: '',
          other_airport_type: ''
      },
      mobile_phone: '',  // 变更所属--电话
    };
  },
  methods: {
    // 获取列表数据
    getData(pageSize, pages, param) {
      const that = this;
      this.$fetch.post('admin/Airport_manage/AdminAirportInfo', {
        token: this.$stores.getToken(),
        airport_rank: param.airport_rank,
        airport_type: param.airport_type,
        status: param.status,
        certificate_unit: param.certificate_unit,
        province_id: param.province_id,
        airport_name: param.airport_name,
        airport_run: param.airport_run,
        mobile_phone: param.mobile_phone,
        other_airport_type: param.other_airport_type,
        pages,
        page_num: pageSize,
      }).then(res => {
        that.airportData = res.data;
        that.totalNum = res.totalNum;
        this.nowData = [];
      }).catch(error => {
        console.log(error);
      });
    },
     // 点击编辑-----路由跳转
    routerDetail(id){
      this.$router.push({path: 'airportManage/airportDetail', query: {airId: id}})
    },
    // 搜索查询
    handleSearch(){
        const vm = this;
        vm.pages = 1
        vm.getData(vm.pageSize, vm.pages,vm.param);      
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
      vm.getData(vm.pageSize, vm.pages,vm.param);      
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
              that.getData(this.pageSize, this.pages,this.param);
           })
           .catch(error => {
             console.log(error)
           })
         }else {
           return ;
         }
      })
    },
    // 导出列表
    handleDerive(){
      window.open('http://www.lcsairport.com/admin/Airport_manage/airportExport' + '?other_airport_type=' + this.param.other_airport_type 
        + '&airport_rank=' + this.param.airport_rank + '&airport_type=' + this.param.airport_type 
        + '&status=' + this.param.status  + '&certificate_unit=' + this.param.certificate_unit
        + '&province_id=' + this.param.province_id + '&airport_name=' + this.param.airport_name
        + '&airport_run=' + this.param.airport_run + '&token=' + this.$stores.getToken())
    },
    // 变更所属
    changeOwnership(airport_name, airid){
          this.$swal({
          title: '变更所属权',
          html:
            '<div style="margin: 40px 0 40px;"><span>新所属人手机号码：</span><input id="swal-mobile_phone" class="swal-input" v-model="create_num"></div>',
          focusConfirm: false,
          showCancelButton: true,
          cancelButtonText: '取消',
          confirmButtonText: '下一步',
          preConfirm: () => {
              this.mobile_phone = document.getElementById('swal-mobile_phone').value;
              const that = this;
              this.$fetch
                  .post('/admin/Airport_manage/saveAirportTheir', {
                    token: this.$stores.getToken(),
                    mobile_phone: this.mobile_phone,
                    airid: airid,
                    airport_name: airport_name,
                  }).then(res => {
                    if(res.code == '200'){
                        that.$swal({
                            title: '变更所属权',
                            html:
                              '<div style="margin: 40px 0 40px;"><span>'+ airport_name +'管理权已变更为以下账户：</span></div>' +
                              '<div style="margin: 40px 0 40px;">'+ this.mobile_phone +'</div>',
                            focusConfirm: false,
                            preConfirm: () => {
                              that.getData(that.pageSize, that.pages, that.param);
                            }
                        })
                    }else {
                      if(this.mobile_phone == ''){
                          that.$swal('电话号码不能为空')
                      }else {
                          that.$swal(res.msg)
                      }
                    }
                  }).catch(error => {
                    console.log(error);
                  });
          }
        })
    }
  },
  created() {
    this.getData(this.pageSize, this.pages,this.param);
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/framework/tableListCommon.scss';
</style>
