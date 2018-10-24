<template>
    <div class="app-layout">
        <app-header></app-header>
        <div class="app-side-left">
            <app-side-nav></app-side-nav>
        </div>
        <div class="app-side-main">
            <div class="app-content">
                <app-crumbs></app-crumbs>
                <div class="app-content-inside">
                    <router-view />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AppHeader from "@/components/framework/AppHeader.vue";
import AppCrumbs from "@/components/framework/AppCrumbs.vue";
import AppSideNav from "@/components/framework/AppSideNav.vue";

export default {
    components: {
        AppHeader,
        AppCrumbs,
        AppSideNav
    }
};
</script>
