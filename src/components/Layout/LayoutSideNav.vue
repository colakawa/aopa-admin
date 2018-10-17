<template>
    <div class="side-nav">
        <div class="login">
            登录成功
        </div>
        <ul>
            <li><router-link to="/login">登录页面</router-link></li>
            <li><router-link to="/userManage">用户管理</router-link></li>
            <li>
                <span>机场管理</span>
                <ul>
                    <li><router-link to="/">机场管理</router-link></li>
                    <li><router-link to="/">取证机场管理</router-link></li>
                </ul>
            </li>
            <li>
                <span>内容管理</span>
                <ul>
                    <li><router-link to="/">问题管理</router-link></li>
                    <li><router-link to="/" >公告管理</router-link></li>
                    <li><router-link to="/">机场url链接管理</router-link></li>
                    <li><router-link to="/">下载中心管理</router-link></li>
                    <li><router-link to="/">导航管理</router-link></li>
                    <li><router-link to="/">轮播管理</router-link></li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    
}
</script>

<style lang="scss" scoped>
    .side-nav {
        float: left;
        width: 15%;
        min-width: 160px;
        height: 900px;
        background-color: skyblue;
        .login {
            font-size: 28px;
            border: 1px solid #000;
        }
    }
    a {
        color: purple;
    }
</style>
