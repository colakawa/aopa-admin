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
              <span v-if="item.nav_status == '显示' || item.nav_status == '不显示'">删除</span>
              <span v-if="item.nav_status == '已删除'">查看</span>
            </td>
            <td>{{ item.add_time }}</td>
            <td>{{ item.save_time }}</td>
            <td>{{ item.rank }}</td>
          </tr>
        </tbody>
      </table>
    </div>
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
    handleUserStatus(index) {
      this.$Modal.info({
        title: '确定要执行此操作吗？',
        // content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
        content: `确定要执行此操作吗？${index}`,
      });
    },
    // remove(index) {
    //   this.data6.splice(index, 1);
    // },
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
      this.$router.push({path: 'navManage/navDeatail', query: {navId: id}})
    },
    // 操作导航显示状态
    changeStatus(nav_id, nav_status) {
      const that = this;
      // that.$layer.alert("找不到对象！");
      this.$fetch.post('/admin/Nav_manage/saveNav', {
        token: this.$stores.getToken(),
        nav_id: nav_id,
        nav_status: nav_status,
      })
      .then(res => {
        console.log(nav_status)
        if(nav_status === 1){ this.navData.nav_status == '不显示'}
        if(nav_status === 2){ this.navData.nav_status == '显示'}
        this.getData();
      })
      .catch(error => {
        console.log(error)
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

