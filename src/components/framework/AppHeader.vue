<template>
    <div class="app-header">
        <img class="header-logo" src="@/assets/logo_admin.png" alt="logo">
        <span class="header-text">通用机场信息后台管理平台</span>
    </div>
</template>


<style lang="scss" scoped>
.app-header {
    height: $heightHeader;
    line-height: $heightHeader;
    padding: 0 10px;
    background-color: #198cea;
    .header-logo {
        height: 29px;
        margin-top: -2px;
        // margin-top: ($heightHeader - 30px) / 2;
    }
    .header-text {
        margin-left: 10px;
        font-size: 20px;
        color: #fff;
    }
}
</style>
