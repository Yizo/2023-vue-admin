<template>
  <a-layout class="app-wrapper">
    <a-layout-header class="fixed-header">
      <logo/>
    </a-layout-header>
    <a-layout class="content-wrapper">
      <a-layout-sider theme="light"
                      v-model:collapsed="collapsed"
                      :width="sideBarWidth1" collapsible
                      :collapsed-width="collapsedWidth"
                      :trigger="null"
                      class="sidebar-container">
        <Sidebar :data="data"/>
        <!--start:展开收起按钮-->
        <span class="collapsed-wrapper" @click="handleToggle">
          <menu-fold-outlined v-if="!collapsed"/>
          <menu-unfold-outlined v-else/>
        </span>
        <!--end:展开收起按钮-->
      </a-layout-sider>
      <a-layout-content class="main-container">
        <Breadcrumbs style="padding: 8px 0;margin-left: 16px;"/>
        <baseView/>
        <a-layout-footer class="fixed-footer">Footer</a-layout-footer>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>


<script setup>
import {computed, ref} from 'vue'
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons-vue';
import logo from './components/Header/logo.vue'
import { Sidebar, Breadcrumbs, baseView  } from '@gm/layout'
import { themeStore } from '@/store'

const theme = themeStore()
const collapsedWidth = ref(50)
const collapsed = computed(()=>theme.$state.collapsed)
const sideBarWidth1 = computed(()=>theme.$state.sideBarWidth)
const sideBarWidth2 = computed(()=>{
  if(collapsed.value) {
    return collapsedWidth.value + 'px'
  } else {
    return theme.$state.sideBarWidth + 'px'
  }
})
const data = computed(()=>theme.$state.menu)

function handleToggle(){
  theme.$patch({
    'collapsed':!collapsed.value
  })
}
</script>

<style lang="less" scoped>
.app-wrapper {
  .fixed-header {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    border-bottom: 1px solid rgb(229,230,235);
  }
  .content-wrapper {
    display: flex;
    .sidebar-container {
      box-shadow: -1px 10px 10px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%);
      position: fixed;
      padding-top: 64px;
      top: 0;
      left: 0;
      z-index: 99;
      height: 100%;
      transition: all .2s cubic-bezier(.34,.69,.1,1);
      .collapsed-wrapper {
        position: absolute;
        right: 12px;
        bottom: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border-radius: 3px;
        cursor: pointer;
        background-color: rgb(247,248,250);
        &:hover {
          background-color: rgb(229,230,235);
        }
      }
    }
    .main-container {
      min-height: 100vh;
      overflow-y: hidden;
      background-color: #eef1f5;
      transition: padding .2s cubic-bezier(.34,.69,.1,1);
      padding-top: 64px;
      padding-left: v-bind(sideBarWidth2);
      display: flex;
      flex-direction: column;
      .fixed-footer {
        text-align: center;
        background-color: transparent;
      }
    }
  }
}
</style>