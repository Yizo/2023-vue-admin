<template>
  <a-layout class="app-wrapper">
    <a-layout-sider theme="light"
                    v-model:collapsed="collapsed"
                    :width="sideBarWidth1" collapsible
                    :collapsed-width="collapsedWidth"
                    :trigger="null"
                    class="sidebar-container">
      <logo style="padding: 16px 0; margin-left: 20px" v-if="!collapsed"></logo>
      <Sidebar :data="data"/>
    </a-layout-sider>
    <a-layout class="content-wrapper">
      <a-layout-header class="fixed-header">
        <!--start:展开收起按钮-->
        <span class="collapsed-wrapper" @click="handleToggle">
          <menu-fold-outlined v-if="!collapsed"/>
          <menu-unfold-outlined v-else/>
        </span>
        <!--end:展开收起按钮-->
      </a-layout-header>
      <a-layout-content class="main-container">
        <Breadcrumb style="padding: 8px 0;margin-left: 16px;"/>
        <baseView/>
        <a-layout-footer class="fixed-footer">Footer</a-layout-footer>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>


<script setup>
import {computed, ref} from 'vue'
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons-vue';
import logo from './components/Logo/index.vue'
import Sidebar from './components/Sidebar/index.vue'
import baseView from './components/View/baseView.vue'
import Breadcrumb from './components/Breadcrumb/index.vue'
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
  display: flex;
  .sidebar-container {
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 8%);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    height: 100%;
    transition: all .2s cubic-bezier(.34,.69,.1,1);
  }
  .content-wrapper {
    flex: 1;
    padding-left: v-bind(sideBarWidth2);
    .fixed-header {
      background-color: #fff;
      border-bottom: 1px solid rgb(229,230,235);
      padding: 0 16px;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 99;
      margin-left: v-bind(sideBarWidth2);
      .collapsed-wrapper {
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
      background-color: rgb(242 243 245);
      transition: padding .2s cubic-bezier(.34,.69,.1,1);
      display: flex;
      flex-direction: column;
      padding-top: 64px;
      .fixed-footer {
        text-align: center;
        background-color: transparent;
      }
    }
  }
}
</style>