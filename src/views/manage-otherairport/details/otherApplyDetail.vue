<template>
  <div class="other-info">
    <p class="info-title">其他起降场地发布信息申请表详情</p>
    <table>
      <tbody>
        <tr>
          <td> <span>ID：</span> {{ detailData.applyid }} </td>
          <td class="border-none"> <span>当前状态：</span> {{ detailData.status_desc }} </td>
        </tr>
        <tr>
            <td>
              <span>机场名称：</span>
              <input type="text" v-model="detailData.airport_name" />
              <!-- <span v-model="detailData.airport_name">{{ detailData.airport_name }}</span> -->
              <span class="airport-name-btn" v-if="operate == '2' && focus != true" @click="onFocusInput">修改</span>
              <span class="airport-name-btn" v-if="operate == '2' && focus == true" @click="onBlurInput">提交修改</span>
              <span class="airport-name-btn" v-if="operate == '2'">创建该机场</span>
              <span class="airport-name-btn" v-if="operate != '2'">查看</span>
            </td>
            <td class="border-none"> <span>申请时间：</span> {{ detailData.add_time }} </td>
        </tr>
        <tr>
            <td> <span>机场运营人名称：</span> {{ detailData.airport_run }} </td>
            <td class="border-none"> <span>审核时间：</span> {{ detailData.check_time }} </td>
        </tr>
        <tr>
            <td> <span>机场所有人名称：</span> {{ detailData.airport_holder }} </td>
            <td class="border-none"> <span>审核人：</span> {{ detailData.check_user }} </td>
        </tr>
        <tr>
            <td> <span>申请人姓名：</span> {{ detailData.applicant }} </td>
            <td rowspan="6">
              <span>备注：</span>
              <p>审核人员可用于备注审核情况说明，字数不超过1000字。</p>
              <textarea cols="40" rows="10" :value="detailData.check_user"></textarea>
              <div class="operate-btn">
                <div class="btn-color1">存草稿</div>
                <div :class="operate == '2' ? 'btn-color2' : 'not-click'">通过</div>
                <div :class="operate == '2' ? 'btn-color3' : 'not-click'">保存</div>
              </div>
            </td>
        </tr>
        <tr>
            <td> <span>手机号码：</span> {{ detailData.contact_num }} </td>
        </tr>
        <tr>
            <td rowspan="4" class="bg-white">
              <p>机场所有人身份证明附件:（企业提供营业执照、事业单位提供组织结构代码证，个人提供身份证、
                    港澳台通行证等证件的扫描件或彩色照片）：</p>
              <div>
                <img :src="imgUrlPrefix + 'apply/' + detailData.attachment" alt="">
              </div>
            </td>
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
      detailData: '',
      applyid: '',
      // airport_name: '',
      operate: '',
      focus: false,
    }
  },
  methods: {
      // 获取详情数据
      getData(userid){
        const that = this;
        this.$fetch
          .post('/admin/other_airport_check/otherAirportDetail', {
            token: this.$stores.getToken(),
            applyid: this.applyid
          })
          .then(res => {
            that.detailData = res.data
            // that.airport_name = that.detailData.airport_name
            that.getSearchRes(that.detailData.airport_name)
            console.log(that.detailData, 'res')
          })
          .catch(error => {
            console.log(error);
          });
      },
      // 检索匹配数据库机场
      getSearchRes(airport_name){
        const that = this;
        this.$fetch
          .post('/admin/other_airport_check/otherAirportJudge', {
            token: this.$stores.getToken(),
            airport_name: airport_name
          })
          .then(res => {
            that.operate = res.data.operate
          })
          .catch(error => {
            console.log(error);
          });
      },
      // 修改机场名称
      onFocusInput(){
        this.focus = true;
      },
      onBlurInput(){
        this.focus = false;
        this.getSearchRes(this.detailData.airport_name)
      }
  },
  created (){
    if(this.$route.query.applyId != '' ){
      this.applyid = this.$route.query.applyId;
      this.getData();
      // this.getSearchRes(this.detailData)
    }
  }
}
</script>

<style lang="scss" scoped>
.other-info {
  .info-title {
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    margin: 20px auto;
  }
  table {
    width: 85%;
    border-collapse: collapse;
    tr, td {
      border: 1px solid #ddd;
    }
    td{
      padding: 10px 20px;
      span{
        display: inline-block;
        width: 100px;
        text-align: right;
      }
    }
    .border-none {
      border-bottom-color: transparent;
    }
    // 操作按钮样式
    .operate-btn{
      div {
        padding: 5px 20px;
        margin: 10px;
        color: #fff;
        display: inline-block;
        cursor: pointer;
      }
    }
    .airport-name-btn {
      color: #198CEA;
      cursor: pointer;
    }
  }
}
.bg-white {
  background-color: #fff;
  p {
    padding: 10px;
  }
  div {
    width: 135px;
    height: 90px;
    overflow: hidden;
    img {
      width: 100%;
      height: auto;
    }
  }
}
.btn-color1 {
  background-color: #198CEA;
}
.btn-color2 {
  background-color: green;
}
.btn-color3 {
  background-color: red;
}
.not-click {
    background-color: #ccc;
    pointer-events: none;
}

</style>


