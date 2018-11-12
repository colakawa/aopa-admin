<template>
  <div class="table-wrap">
    <div class="table-sub-wrap">
      <div class="sub-wrap-title">导航列表 <span class="add-button" @click="routerDetail('')">+添加</span> </div>
      <table class="table-data">
        <thead>
          <tr>
            <th>序号</th>
            <th>导航名称</th>
            <th>url</th>
            <th>pid</th>
            <th>状态</th>
            <th>操作</th>
            <th>添加时间</th>
            <th>修改时间</th>
            <th>排序</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in navData" :key="item.nav_id">
            <td>{{ item.nav_id }}</td>
            <td>{{ item.nav_name }}</td>
            <td>{{ item.url }}</td>
            <td>{{ item.pid }}</td>
            <td>{{ item.nav_status }}</td>
            <td class="table-operation">
              <span v-if="item.nav_status == '显示' || item.nav_status == '不显示'"
                @click="routerDetail(item.nav_id)">编辑</span>
              <span v-if="item.nav_status == '不显示'" @click="changeStatus(item.nav_id, 1)">显示</span>
              <span v-if="item.nav_status == '显示'" @click="changeStatus(item.nav_id, 2)">不显示</span>
              <span v-if="item.nav_status == '显示' || item.nav_status == '不显示'" @click="modal2=true">删除</span>
              <span v-if="item.nav_status == '已删除'">查看</span>
            </td>
            <td>{{ item.add_time }}</td>
            <td>{{ item.save_time }}</td>
            <td>{{ item.rank }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <Modal v-model="modal2" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>确定要执行此操作吗?</span>
        </p>
        <div style="text-align:center">
            <p>确定要执行此操作吗?</p>
        </div>
        <div slot="footer">
            <Button type="error" size="large">Delete</Button>
            <Button type="error" size="large">Delete</Button>
        </div>
    </Modal>

  </div>
</template>

<script>
export default {
  data() {
    return {
      navData: [],
      modal2: false,
      modal_loading: false,
    };
  },
  methods: {
    //----------获取列表数据------------//
    getData(pageSize, pages) {
      const that = this;
      this.$fetch
        .post('/admin/Nav_manage/getNavList', {
          token: this.$stores.getToken(),
        })
        .then(res => {
          that.navData = res.data;
          that.totalNum = res.totalNum;
          this.nowData = [];
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 点击编辑-----路由跳转
    routerDetail(id){
      this.$router.push({path: 'navManage/navDetail', query: {navId: id}})
    },
    // 操作导航显示状态
    changeStatus(nav_id, nav_status) {
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
           that.$fetch.post('/admin/Nav_manage/saveNav', {
             token: that.$stores.getToken(),
             nav_id: nav_id,
             nav_status: nav_status,
           })
           .then(res => {
             console.log(nav_status)
             if(nav_status === 1){ that.navData.nav_status == '不显示'}
             if(nav_status === 2){ that.navData.nav_status == '显示'}
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
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/framework/tableListCommon.scss';
</style>

