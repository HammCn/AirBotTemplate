<template>
  <el-table :data="list">
    <el-table-column v-for="column in userTableColumn" v-bind="column" />
  </el-table>
</template>
<script lang="ts" setup>
import { type User, userTableColumn } from '@/model/user';
import { ElTable, ElTableColumn } from 'element-plus';
import { ref, type Ref } from 'vue';
console.log(userTableColumn);

const list: Ref<User[]> = ref([])
</script>