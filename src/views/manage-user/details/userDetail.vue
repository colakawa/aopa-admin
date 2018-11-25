<template>
  <div class="person-info">
    <p class="info-title">基本信息</p>
    <table>
      <tbody>
        <tr>
          <td> <span>ID：</span> {{ userList.userid }} </td>
          <td rowspan="7" class="bg-white">
            <span>头像：</span>
            <img :src="imgUrlPrefix + 'user_img/' + userList.company_name" alt="">
          </td>
        </tr>
        <tr>
            <td> <span>用户类型：</span> {{ userList.user_status }} </td>
        </tr>
        <tr>
            <td> <span>注册手机：</span> {{ userList.mobile_phone }} </td>
        </tr>
        <tr>
            <td> <span>昵称：</span> {{ userList.username }} </td>
        </tr>
        <tr>
            <td> <span>性别：</span> {{ userList.sex }} </td>
        </tr>
        <tr>
            <td> <span>真实姓名：</span> {{ userList.real_name }} </td>
        </tr>
        <tr>
            <td> <span>所在单位：</span> {{ userList.company_name }} </td>
        </tr>
        <tr>
          <td> <span>职务：</span> {{ userList.duty }} </td>
          <td> <span>注册时间：</span> {{ userList.add_time }} </td>
        </tr>
        <tr>
          <td> <span>地址：</span> {{ userList.address }} </td>
          <td> <span>最后登录时间：</span> {{ userList.last_save_time }} </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data(){
    return {
      imgUrlPrefix: process.env.VUE_APP_IMG_BASE_URL,
      userList: '',
      userid: '',
    }
  },
  methods: {
      // 获取详情数据
      getData(userid){
        const that = this;
        this.$fetch
          .post('/admin/index/findUser', {
            token: this.$stores.getToken(),
            userid: this.userid
          })
          .then(res => {
            that.userList = res.data
            console.log(that.userList, 'res')
          })
          .catch(error => {
            console.log(error);
          });
      }
  },
  created (){
    if(this.$route.query.userId != '' ){
      this.userid = this.$route.query.userId;
      this.getData();
    }
  }
}
</script>

<style lang="scss" scoped>
.person-info {
  .info-title {
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    margin: 20px auto;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    tr, td {
      border: 1px solid #ddd;
    }
    tr:nth-child(odd){
      background-color: #f5f5f5;
    }
    td{
      height: 45px;
      line-height: 45px;
      span{
        display: inline-block;
        width: 100px;
        text-align: right;
      }
    }
  }
}
.bg-white {
  background-color: #fff;
}
</style>


