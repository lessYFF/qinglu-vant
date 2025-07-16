<script setup>
import { onBeforeMount, computed } from 'vue'
import { user, getUser } from '../../utils/auth'

const props = defineProps({
  allowed: String,
})

const hasRole = computed(() => {
  if (user.value && user.value.menuAutos.includes(props.allowed)) {
    return true
  }
  return false
})

onBeforeMount(() => getUser())
</script>
<template>
  <slot v-if="hasRole"></slot>
</template>
