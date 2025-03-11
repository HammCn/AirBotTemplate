<template>
  <div class="admin">
    <div class="header">
      header
    </div>
    <div class="main">
      <div class="menu">
        menu
      </div>
      <div class="body">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.admin {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: absolute;
  inset: 0;
  background-color: #f5f5f5;

  .header {
    background-color: #fff;
    border-bottom: 1px solid #eee;
    box-shadow: 0 0px 10px rgba(0, 0, 0, 0.05);
    padding: 15px 20px;
    font-size: 16px;
  }

  .main {
    display: flex;
    flex: 1;
    height: 0;
    margin: 10px;
    background-color: #fff;
    box-shadow: 0 0px 10px rgba(0, 0, 0, 0.05);
    border-radius: 20px;

    .menu {
      width: 250px;
      border-right: 1px solid #f5f5f5;
      padding: 10px;
    }
  }
}
</style>
