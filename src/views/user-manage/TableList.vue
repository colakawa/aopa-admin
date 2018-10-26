<template>
  <div>
    <Table border stripe :columns="columns" :data="userData">
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
          key: 'userid',
        },
        {
          title: '用户类型',
          key: 'usergroupid',
        },
        {
          title: '手机',
          key: 'mobile_phone',
        },
        {
          title: '真实姓名',
          key: 'real_name',
        },
        {
          title: '性别',
          key: 'sex',
        },
        {
          title: '昵称',
          key: 'username',
        },
        {
          title: '状态',
          key: 'user_status',
        },
        {
          title: '操作',
          key: 'user_status',
          //自定义渲染当前列，包括渲染自定义组件，它基于 Vue 的 Render 函数
          //render 函数传入两个参数，第一个是 h，第二个是对象，包含 row、column 和 index，分别指当前单元格数据，当前列数据，当前是第几行。
          render: (h, params) => {
            const text = params.row.user_status == '正常' ? '冻结':'解冻';

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
                      '查看',
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
                      text,
                    ),
                  ])
          }
        },
        {
          title: '注册时间',
          key: 'add_time',
        },
        {
          title: '最后修改时间',
          key: 'last_save_time',
        },
      ],
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
        content: '确定要执行此操作吗？' + index,
      });
    },
    remove(index) {
      this.data6.splice(index, 1);
    },
    getData(pageSize, pages) {
      const that = this;
      this.$fetch.post('admin/index/adminUserInfo', {
        token: this.$fetch.token,
        pages,
        page_num: pageSize,
      }).then(res => {
        that.userData = res.data;
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
