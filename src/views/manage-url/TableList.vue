<template>
  <div class="table-wrap">
    <div class="table-sub-wrap">
      <p class="sub-wrap-title">机场管理 <span class="add-button" @click="routerDetail('')">+添加</span> </p>
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
              <span @click="routerDetail(item.air_url_id)">编辑</span>
              <span v-if="item.status == '2'" @click="changeShowStatus(item.air_url_id, 1)">显示</span>
              <span v-if="item.status == '1'" @click="changeShowStatus(item.air_url_id, 2)">不显示</span>
              <span v-if="item.status == '1' || item.status == '2'" @click="changeShowStatus(item.air_url_id, 9)">删除</span>
              <span v-if="item.status == '9'" @click="changeShowStatus(item.air_url_id, 2)">恢复</span>
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
    //---------获取列表数据--------//
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
    //---------list操作,显示状态--------//
    changeShowStatus(air_url_id, status){
      const that = this;
      this.$fetch.post('/admin/Air_url_manage/saveAirUrl', {
        token: this.$stores.getToken(),
        air_url_id: air_url_id,
        status: status,
      })
      .then(res => {
        // console.log(status)
        if(status === 1){ this.urlData.status == '不显示'}
        if(status === 2){ this.urlData.status == '显示'}
        this.getData();
      })
      .catch(error => {
        console.log(error)
      })
    },
    //---------list操作,删除与恢复--------//
    changeUrlStatus(air_url_id, status){
      const that = this;
      this.$fetch.post('/admin/Air_url_manage/saveAirUrl', {
        token: this.$stores.getToken(),
        air_url_id: air_url_id,
        status: status,
      })
      .then(res => {
        console.log(status)
        if(status === 9){ this.urlData.status == '恢复'}
        if(status === 2){ this.urlData.status == '删除'}
        this.getData();
      })
      .catch(error => {
        console.log(error)
      })
    },
    // 点击编辑&添加-----路由跳转
    routerDetail(id){
      this.$router.push({path: 'urlManage/urlDeatail', query: {airUrlId: id}})
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

