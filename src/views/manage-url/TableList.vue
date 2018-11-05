<template>
  <div class="table-wrap">
    <div class="table-sub-wrap">
      <p class="sub-wrap-title">机场管理</p>
      <table class="table-data">
        <thead>
          <tr>
            <th>序号</th>
            <th>机场名称</th>
            <th>url</th>
            <th>添加时间</th>
            <th>排序</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in urlData" :key="item.air_url_id">
            <td>{{ item.air_url_id }}</td>
            <td>{{ item.airport_name }}</td>
            <td>{{ item.air_url }}</td>
            <td>{{ item.add_time }}</td>
            <td>{{ item.rank }}</td>
            <td>{{ item.status_msg }}</td>
            <td class="table-operation">
              <!-- 1显示 2不显示 9已删除 -->
              <span>编辑</span>
              <span v-if="item.status == '2'">显示</span>
              <span v-if="item.status == '1'">不显示</span>
              <span v-if="item.status == '1' || item.status == '2'">删除</span>
              <span v-if="item.status == '9'">恢复</span>
            </td>
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
      urlData: [],
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
    remove(index) {
      this.data6.splice(index, 1);
    },
    getData(pageSize, pages) {
      const that = this;
      this.$fetch
        .post('admin/Air_url_manage/getAirUrlList', {
          token: this.$stores.getToken(),
        })
        .then(res => {
          that.urlData = res.data;
          console.log(res, 'res');
        })
        .catch(error => {
          console.log(error);
        });
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

