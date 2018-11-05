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
          <Col span="5" class="">
          <span>机场类型</span>
          <select
            name="other_airport_type1"
            id="other_airport_type"
            class="filter-select"
            v-model="value">
            <!--1.通用机场  2.运输机场 3.其他起降场地-->
            <option value="">机场类别（全部）</option>
            <option value="1">通用机场</option>
            <option value="2">运输机场</option>
            <option value="3">其他起降场地</option>
          </select>
            </Col>
          <!--机场类型-->
          <Col span="8" v-if="value == '1'">
          <select name="airport_type" id="airport_type" class="filter-select">
            <option
              v-for="airportType in airportTypeList"
              :key="airportType"
              :value="airportType.id"
            >{{ airportType.name }}</option>
          </select>
            </Col>
          <Col span="4" v-if="value == '1'">
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
        <Row>
          <Col span="6">
          <span>运营人&nbsp;&nbsp;</span>
          <input type="text" placeholder="模糊匹配查询" id="admin_search_text" class="filter-input">
              </Col>
          <Col span="5">
          <span>机场状态</span>
          <select name="status" class="filter-select" id="status">
            <option value="">机场状态（全部）</option>
            <option value="2">已发布</option>
            <option value="3">已取证</option>
            <option value="9">已下线</option>
            <option value="2">在线</option>
          </select>
              </Col>
          <!--所在地区：1.华北；2.西北；3.东北；4.华东；5.西南；6.中南；7.新疆；-->
          <Col span="6">
          <span>所在地区</span>
          <select
            name="certificate_unit"
            id="certificate_unit"
            class="filter-select"
            v-model="certificateUnitId">
            <option
              v-for="certificateUnit in certificateUnitList"
              :value="certificateUnit.id"
            >{{ certificateUnit.name }}</option>
          </select>
              </Col>
          <Col span="6">
          <select name="province_id" id="province_id" class="filter-select">
            <!-- 省份数据 -->
            <option
              v-for="province in provinceList[certificateUnitId]"
              :value="province"
            >{{ province }}</option>
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
              <span v-if="item.status == '冻结' || item.status == '下线'">上线</span>
              <span v-if="item.status == '已发布' || item.status == '在线' || item.status == '已取证'">下线</span>
              <!-- <span>冻结</span>
              <span>解冻</span> -->
              <span v-if="item.status == '已发布' || item.status == '在线'">变更所属</span>
              <span v-if="item.type == '1'">查看</span>
              <span v-if="item.type == '2'">编辑</span>
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
        '': ['省/直辖市（全部）', '黑龙江省', '吉林省', '辽宁省', '北京市', '天津市', '内蒙古自治区', '河北省', '山西省',
          '上海市', '浙江省', '山东省', '江苏省', '福建省', '江西省', '安徽省', '湖北省', '广西壮族自治区', '广东省', '河南省', '海南省',
          '湖南省', '甘肃省', '青海省', '陕西省', '宁夏回族自治区', '重庆市', '云南省', '四川省', '贵州省', '西藏自治区',
          '新疆维吾尔自治区',
        ],
        3: ['省/直辖市（全部）', '黑龙江省', '吉林省', '辽宁省'],
        1: ['省/直辖市（全部）', '北京市', '天津市', '内蒙古自治区', '河北省', '山西省'],
        4: ['省/直辖市（全部）', '上海市', '浙江省', '山东省', '江苏省', '福建省', '江西省', '安徽省'],
        6: ['省/直辖市（全部）', '湖北省', '广西壮族自治区', '广东省', '河南省', '海南省', '湖南省'],
        2: ['省/直辖市（全部）', '甘肃省', '青海省', '陕西省', '宁夏回族自治区'],
        5: ['省/直辖市（全部）', '重庆市', '云南省', '四川省', '贵州省', '西藏自治区'],
        7: ['省/直辖市（全部）', '新疆维吾尔自治区'],
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
      certificateUnitId: '',
      value: '',
    };
  },
  methods: {
    handleUserStatus(index) {
      console.log(this.$Modal);
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
      this.$fetch.post('admin/Airport_manage/AdminAirportInfo', {
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
    changeCertificateUnit(val, type) {
      console.log(val, '123');
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
