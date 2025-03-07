<template>
  <el-button :attr="attrs" :type="type">
    <template v-for="(_, name) in slots" #[name]="props">
      <slot :name="name" :attr="props">
      </slot>
    </template>
    <template #default>
      <slot name="default">
        好的
      </slot>
    </template>
  </el-button>
</template>
<script setup lang="ts">
import { useAttrs, useSlots, type PropType } from 'vue';
const slots = useSlots()
const attrs = useAttrs()
defineProps({
  type: {
    type: String as PropType<'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'>,
    default: 'primary'
  }
})

</script>