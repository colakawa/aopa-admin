<template>
  <div class="login-wrap">
    <div class="login-subwrap">
      <div><img src="../../assets/admin_logo.png" alt=""></div>
      <div class="subwrap-login">
        <p>通用机场信息管理系统</p>
        <div class="login-content">
          <div class="jsAdminLogin" id="password_login_area">

            <div class="content-posi-area">
                <div class="posi-area-img">
                    <img src="../../assets/admin_user.png" alt="">
                </div>
                <div class="posi-area-input">
                    <input type="text" value="" placeholder="用户名/手机号" id="admin_username_phone">
                </div>
            </div>

            <div class="content-posi-area">
                <div class="posi-area-img">
                    <img src="../../assets/admin_password.png" alt="">
                </div>
                <div class="posi-area-input">
                    <input value="" type="password" flag="password" placeholder="密码" id="password">
                    <!-- <input type="text" flag="password" data-type="password" maxlength="32" size="60" aria-required="true"  
                placeholder="密码" onblur="showValue('password',this.value);" /> -->
                </div>
            </div>

            <div class="content-posi-area">
                <div class="posi-area-validate">
                    <div class="posi-area-img">
                        <img src="../../assets/admin_yz.png">
                    </div>
                    <div>
                        <input type="text" placeholder="验证码"  id="code" autocomplete="off" />
                    </div>
                </div>
                
                <div class="posi-area-code">
                    <img :src="codeUrl" alt="" />
                </div>
                <!-- <input type="hidden" value="" id="key"> -->
            </div>

              <div class="login-btn" id="password_login">登录</div>
          </div>
          <div class="content--posi-bottom">
              <img src="../../assets/admin_choose.png" alt="" id="choose_btn">
              <input type="checkbox" id="checkbox_password" class="display_none"/>
              <span>记住用户名和密码</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
      return {
        key: '620',
        codeUrl: '',
      }
    },
    methods: {
      // 获取code码
      getCode(key){
          const that = this;
          this.$fetch
            .post('/index/Publicairport/getCode', {
              key: '620',
            })
            .then(res => {
              that.totalNum = res.totalNum;
              this.nowData = [];
              console.log(res);
            })
            .catch(error => {
              console.log(error);
            });
      }
    },
    created() {
        this.getCode();
    },
}
</script>


<style lang="scss" scoped>
.login-wrap {
    background-image: url('../../assets/admin_bg.png');
    width: 100%;
    height: 100%;
    .login-subwrap {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .subwrap-login {
            width: 440px;
            height: 415px;
            background-color: #fff;
            p {
                width: 100%;
                height: 70px;
                line-height: 70px;
                margin-bottom: 26px;
                background-color: #3690e8;
                color: #fff;
                text-align: center;
                font-size: 20px;
            }
            .login-content {
                .content-posi-area {
                  position: relative;
                  left: 10px;
                  clear: both;
                  font-size: 14px;
                  .posi-area-img {
                      position: absolute;
                      top: 10px;
                      left: 21px;
                      padding: 12px 11px 11px 11px;
                      background-color: #fff;
                      border: 1px solid #ccc;
                      img {
                          width: 18px;
                          height: 18px;
                      }
                  }
                  input {
                      padding: 0 10px;
                      height: 45px;
                      line-height: 45px;
                      width: 330px;
                      background-color: #f1f5ff;
                      margin: 10px 20px 10px 60px;
                      border: 1px solid #ccc;
                      box-sizing: border-box;
                  }
                  .posi-area-validate {
                    display: inline-block;
                    input {
                      width: 180px;
                    }
                  }
                  .posi-area-code {
                      display: inline-block;
                      width: 130px;
                      border: 1px solid red;
                      img {
                          width: 100%;
                      }
                  }
                }
                .login-btn {
                    width: 400px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    background-color: #3690e8;
                    border-radius: 5px;
                    margin: 10px 20px 25px 20px;
                    color: #fff;
                }
                .content--posi-bottom {
                    height: 50px;
                    line-height: 50px;
                    text-align: left;
                    background-color: #f1f5ff;
                    margin: 20px 0 0 0;
                    padding: 0 30px;
                    box-sizing: border-box;
                    color: #999;
                    
                }
            }
        }
    }
}
.display_none {
  display: none;
}
</style>

