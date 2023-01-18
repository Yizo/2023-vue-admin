<template>
  <a-layout class="app-wrapper">
    <a-layout-header class="fixed-header">
      <Navbar/>
    </a-layout-header>
    <a-layout class="content-wrapper">
      <a-layout-sider theme="light" class="sidebar-container">
        <Sidebar/>
      </a-layout-sider>
      <a-layout-content class="main-container">
        <div class="main">
          <AppMain/>
        </div>
        <a-layout-footer class="fixed-footer">Footer</a-layout-footer>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>


<script setup>
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar/index.vue'
import AppMain from './components/AppMain.vue'
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
      box-shadow: 0 2px 5px 0 rgb(0 0 0 / 8%);
      position: fixed;
      padding-top: 64px;
      top: 0;
      left: 0;
      z-index: 99;
      height: 100%;
      width: @sideBarWidth !important;
      min-width: @sideBarWidth !important;
      max-width: @sideBarWidth !important;
      transition: all .2s cubic-bezier(.34,.69,.1,1);
    }
    .main-container {
      min-height: 100vh;
      overflow-y: hidden;
      background-color: var(--color-fill-2);
      transition: padding .2s cubic-bezier(.34,.69,.1,1);
      padding-top: 64px;
      padding-left: @sideBarWidth;
      display: flex;
      flex-direction: column;
      .main {
        flex: 1;
        padding: 0 20px 20px;
      }
      .fixed-footer {
        text-align: center;
      }
    }
  }
}
</style>