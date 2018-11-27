<template>
  <div class="detail-wrap">
    <div class="detail-title">问题详情</div>
    <div>
        <!-- 左边内容 -->
        <div class="detail-content-l">
          <div><em>问题ID：</em><span> {{ detailData.question_id }} </span></div>
          <div><em>提出人：</em><span> {{ detailData.real_name }} </span></div>
          <div><em>联系电话：</em><span> {{ detailData.mobile_phone }} </span></div>
          <div>
            <span><em>问题类型：</em></span>
            <select v-model="detailData.question_type">
              <option v-for="item in typeList" :key="item.id" :value="item.id"> {{item.name}} </option>
            </select>
          </div>
          <div><em>问题描述：</em><p style="text-indent: 24px;margin: 15px 0;"> {{ detailData.question_content }} </p></div>
          <div class="detail-img-wrap">
            <span><em>图片：</em></span>
            <ul class="img-wrap-ul">
              <li v-for="(img, index) in question_img" :key="index">
                  <img :src="imgUrlPrefix + 'question_img/' + img" alt="" />
              </li>
            </ul>
          </div>
        </div>
        <div class="middle-line"></div>
        <!-- 右边内容 -->
        <div class="detail-content-r">
          <div>
            <span>当前状态：</span>
            <select v-model="detailData.question_status">
              <option v-for="item in statusList" :key="item.id" :value="item.id"> {{item.name}} </option>
            </select>
          </div>
          <div class="textarea-wrap">
            <span>备注：</span>
            <textarea name="question_comment" cols="30" rows="10"> {{detailData.question_comment}} </textarea>
          </div>
          <div>问题提出时间：<span> {{ detailData.add_time }} </span></div>
          <div>问题解决时间：<span> {{ detailData.solve_time }} </span></div>
          <div>最后操作时间：<span> {{ detailData.last_operate_time }} </span></div>
          <div>最后操作人：<span> {{ detailData.last_operate_name }} </span></div>
        </div>
        <div v-if="statusId != '1'" class="detail-btn">
          <div>取消</div>
          <div>保存</div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      imgUrlPrefix: process.env.VUE_APP_IMG_BASE_URL,
      question_img: [],
      statusId: '',
      detailData: {
        question_id: '',
        real_name: '',
        mobile_phone: '',
        question_status_msg: '',
        question_type: '',
        question_content: '',
        question_status: '',
        question_comment: '',
        add_time: '',
        solve_time: '',
        last_operate_time: '',
        last_operate_name: '',
        question_img: '',
      },
      typeList: [
                  {id: '', name: '请选择'},
                  {id: 1, name: '机场取证'},
                  {id: 2, name: '机场信息发布'},
                  {id: 3, name: '机场信息查询'},
                  {id: 4, name: '机场地图'},
                  {id: 5, name: '机场搜索'},
                  {id: 6, name: '业务合作'},
                  {id: 7, name: '其他'},
                ],
      statusList: [
                  {id: 1, name: '未处理'},
                  {id: 2, name: '已处理'},
                  {id: 3, name: '已忽略'},
                ],
    }
  },
  methods: {
    // 获取详情页数据
    getData(question_id){
        const that = this;
        this.$fetch
          .post('/admin/Question_manage/getQuestionDetails', {
            token: this.$stores.getToken(),
            question_id: this.question_id
          })
          .then(res => {
            for(let i in that.detailData){
                    that.detailData[i] = res.data[i];
                  }
            that.question_img = res.data.question_img.split(',');
            console.log(that.question_img, 'question_img');
          })
          .catch(error => {
            console.log(error);
          });
    }
  },
  created(){
    if(this.$route.query.questionId != ''){
      this.question_id = this.$route.query.questionId;
      this.statusId = this.$route.query.statusId;
      this.getData()
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-wrap {
  padding: 20px;
  .detail-title {
    text-align: center;
    font-weight: 600;
    font-size: 18px;
    margin: 20px 0;
  }
  .detail-content-l {
    display: inline-block;
    width: 49%;
    div {
      margin: 5px 0;
      em {
        width: 80px;
        display: inline-block;
        margin-right: 10px;
        text-align: right;
        font-style: normal;
      }
    }
    .detail-img-wrap {
      .img-wrap-ul {
        width: 100%;
        li {
          width: 135px;
          height: 90px;
          display: inline-block;
          overflow: hidden;
          img {
            width: 100%;
            height: auto;
          }
        }
      }
    }
  };
  .detail-content-r {
    display: inline-block;
    width: 49%;
    .textarea-wrap {
      margin-top: 15px;
      margin-bottom: 15px;
      span {
          position: relative;
          top: -150px;
      }
    }
  }
  .detail-btn {
    margin-top: 40px;
    div {
      width: 100px;
      height: 40px;
      line-height: 40px;
      margin: 0 50px;
      text-align: center;
      display: inline-block;
      border: 1px solid #ccc;
      border-radius: 5px;
      cursor: pointer;
    }
    div:nth-child(2){
      background-color: #4e9be9;
      color: #fff;
      border: 1px solid transparent;
    }
  }
  .middle-line {
    position: relative;
    left: -50px;
    display: inline-block;
    width: 1px;
    height: 300px;
    background-color: #ddd;
  }
}
</style>


