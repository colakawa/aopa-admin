<template>
    <div class="home">
        <layout-header></layout-header>
        <div class="container">
            <layout-side-nav></layout-side-nav>
            <div class="content-right">
                <layout-crumbs></layout-crumbs>
                <div>
                    <router-view />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.home {
    width: 100%;
    .container{
        width: 100%;
        min-width: 1200px;
        .content-right {
            display: inline-block;
            width: 88%;
        }
    }
}
</style>

