  <!-- <div class="table-wrap">
    <div class="filter-search">
      <p>筛选条件</p>
      <div>一大堆的筛选条件</div>
    </div>
    <div class="table-sub-wrap">
      <p>机场管理</p>
      <table class="table-data">
      </table>

    </div>
  </div> -->

<template>
  <div>
    <Table border stripe :columns="columns" :data="airportData">
    </Table>
    <Page
      :total="totalNum"
      :page-size="pageSize"
      :current="pages"
      @on-change="handlePage"
      @on-page-size-change="handlePageSize"
      show-sizer
      show-total/>
  </div>
</template>

<script>

export default {
  data() {
    return {
      columns: [
        {
          title: 'ID',
          key: 'airid',
        },
        {
          title: '机场名称',
          key: 'airport_name',
        },
        {
          title: '机场类别',
          key: 'other_airport_type',
        },
        {
          title: '机场类型',
          key: 'airport_type',
        },
        {
          title: '机场类/级别',
          key: 'airport_rank',
        },
        {
          title: '机场运营人',
          key: 'airport_run',
        },
        
        {
          title: '所属用户',
          key: 'mobile_phone',
        },
        {
          title: '状态',
          key: 'status',
        },
        {
          title: '操作',
          key: 'status',
          //自定义渲染当前列，包括渲染自定义组件，它基于 Vue 的 Render 函数
          //render 函数传入两个参数，第一个是 h，第二个是对象，包含 row、column 和 index，分别指当前单元格数据，当前列数据，当前是第几行。
          render: (h, params) => {
            const text = params.row.status == '已发布' || '在线' ? '下线':'上线';
            const text2 = params.row.status == '已发布' ? '变更所属':'';

            return h('div', [
                    h(
                      'Button',
                      {
                        props: {
                          type: 'primary',
                          size: 'small',
                        },
                        style: {
                          marginRight: '5px',
                        },
                        on: {
                          click: () => {
                            this.show(params.index);
                          },
                        },
                      },
                      text,
                    ),
                    h(
                      'Button',
                      {
                        props: {
                          type: 'primary',
                          size: 'small',
                        },
                        style: {
                          backgroundColor:'#fff',
                          color: 'blue',
                        },
                        on: {
                          click: () => {
                            this.handleUserStatus(params.index);
                          },
                        },
                      },
                      text2,
                    ),
                  ])
          }
        },
        {
          title: '发布时间',
          key: 'release_time',
        },
        {
          title: '最后修改时间',
          key: 'save_time',
        },
      ],
      airportData: [],
      pageSize: 10, // 每页显示条数
      totalNum: 0, // 总条数
      pages: 1, // 当前页
    };
  },
  methods: {
    handleUserStatus(index) {
      console.log(this.$Modal)
      this.$Modal.info({
        title: '确定要执行此操作吗？',
        // content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
        content: '确定要执行此操作吗？' + index,
      });
    },
    remove(index) {
      this.data6.splice(index, 1);
    },
    getData(pageSize, pages) {
      const that = this;
      this.$fetch.post('admin/Airport_manage/AdminAirportInfo', {
        token: this.$fetch.token,
        pages,
        page_num: pageSize,
      }).then(res => {
        that.airportData = res.data;
        that.totalNum = res.totalNum;
        this.dataCount = this.data.length;
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
  },
  created() {
    this.getData();
  },
};
</script>


<style lang="scss" scoped>
.table-wrap {
  width: 100%;
  height: 850px;
  // background-color: yellowgreen;
  .table-sub-wrap {
    .table-data {
      border-collapse: collapse;
      tbody {
        tr {
          td {
            border: 1px solid #000;
          }
        }
      }
    }
  }
}
</style>
