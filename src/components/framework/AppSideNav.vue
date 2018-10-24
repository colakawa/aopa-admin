<template>
    <div class="side-nav">
            <div class="login-success">登陆成功样式</div>
            <Menu :open-names="['1']" accordion  width="width">
                <!-- <Submenu name="1"> -->
                    <!-- <template slot="title">
                        <Icon type="ios-paper" />
                        内容管理
                    </template> -->
                    <MenuItem name="1-1" to="/userManage"><Icon type="md-person" />用户管理</MenuItem>
                <!-- </Submenu> -->
                <Submenu name="2">
                <template slot="title">
                    <Icon type="ios-paper-plane" />
                    机场管理
                </template>
                <MenuItem name="2-1" to="/">机场管理</MenuItem>
                <MenuItem name="2-2" to="/userManage">取证机场管理</MenuItem>
            </Submenu>
                <Submenu name="3">
                <template slot="title">
                    <Icon type="md-bookmark" />
                    内容管理
                </template>
                    <MenuItem name="3-1" to="/login"><Icon type="ios-volume-up" />问题管理</MenuItem>
                    <MenuItem name="3-2" to="/login"><Icon type="ios-volume-up" />公告管理</MenuItem>
                    <MenuItem name="3-3" to="/login"><Icon type="ios-volume-up" />机场url链接管理</MenuItem>
                    <MenuItem name="3-4" to="/login"><Icon type="ios-volume-up" />下载中心管理</MenuItem>
                    <MenuItem name="3-5" to="/login"><Icon type="ios-volume-up" />导航管理</MenuItem>
                    <MenuItem name="3-6" to="/login"><Icon type="ios-volume-up" />轮播管理</MenuItem>
            </Submenu>
            </Menu>
    </div>
</template>

<script>
export default {
    data() {
        return {
            width: "12%"
        };
    }
};
</script>

<style lang="scss" scoped>
.side-nav {
    height: 100%;
    overflow: auto;
    .login-success {
        color: #fff;
        font-size: 26px;
    }
    ul {
        color: #fff;
        background-color: #284666;
        li,
        a {
            color: #fff;
        }
    }
    .login {
        font-size: 28px;
        border: 1px solid #000;
    }
}
.ivu-col ul[data-v-4425a5a6] {
    width: 12%;
}
a {
    color: purple;
}
</style>
