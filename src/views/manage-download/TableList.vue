<template>
  <div class="table-wrap">
    <div class="table-sub-wrap">
      <p class="sub-wrap-title">下载管理<span class="add-button" @click="routerDetail('')">+添加</span></p>
      <table class="table-data">
        <thead>
          <tr>
            <th>序号</th>
            <th>标题</th>
            <th>文件类型</th>
            <th>状态</th>
            <th>操作</th>
            <th>创建时间</th>
            <th>实施时间</th>
            <th>修改时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in downloadData" :key="item.download_id">
            <td>{{ item.download_id }}</td>
            <td>{{ item.download_title }}</td>
            <td>{{ item.download_type }}</td>
            <td>{{ item.download_status_msg }}</td>
            <td class="table-operation">
              <span @click="routerDetail(item.download_id)">编辑</span>
              <span @click="deleteFile(item.download_id)">删除</span>
            </td>
            <td>{{ item.add_time }}</td>
            <td>{{ item.applying_time }}</td>
            <td>{{ item.update_time }}</td>
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
      downloadData: [],
      pageSize: 10, // 每页显示条数
      totalNum: 0, // 总条数
      pages: 1, // 当前页
    };
  },
  methods: {
    //----------获取列表数据------------//
    getData(pageSize, pages) {
      const that = this;
      this.$fetch
        .post('admin/Downloads_manage/downloadList', {
          token: this.$stores.getToken(),
          pages,
          page_num: pageSize,
        })
        .then(res => {
          that.downloadData = res.data;
          that.totalNum = res.totalNum;
          this.nowData = [];
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 选择分页当前页
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
    // 编辑路由跳转
    routerDetail(id){
      this.$router.push({path: 'downloadManage/downloadDetail', query: {downloadId: id}})
    },
    // 删除下载文件TODO:未测试
    deleteFile(download_id){
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
           that.$fetch.post('/admin/Downloads_manage/removeDownload', {
             token: that.$stores.getToken(),
             download_id: download_id,
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

<style lang="scss" scoped>
@import '@/styles/framework/tableListCommon.scss';
</style>

