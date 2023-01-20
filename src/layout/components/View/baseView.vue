<template>
  <div class="base-view-wrapper">
    <router-view v-slot="{ Component }">
      <transition name="slide" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style lang="less" scoped>
@import '@/styles/transition';
.base-view-wrapper {
  flex: 1;
  padding: 0 16px 16px;
}
</style>