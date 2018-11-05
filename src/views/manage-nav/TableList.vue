<template>
  <div class="table-wrap">
    <div class="table-sub-wrap">
      <div class="sub-wrap-title">导航列表 <span class="add-button" @click="routerAdd">+添加</span> </div>
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
              <span v-if="item.nav_status == '显示' || item.nav_status == '不显示'" @click="routerEdit(item.nav_id)">编辑</span>
              <span v-if="item.nav_status == '不显示'">显示</span>
              <span v-if="item.nav_status == '显示'">不显示</span>
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
    //----------获取数据------------//
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
    routerEdit(id){
      console.log(id, 'id')
      this.$router.push({path: 'navManage/navDeatail', query: {navId: id}})
    },
    // 点击添加-----路由跳转
    routerAdd(){
      this.$router.push({path: 'navManage/navDeatail', query: {type: 'add'}})
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

