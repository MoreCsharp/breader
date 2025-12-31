<template>
  <router-view />
  <TabBar v-if="showTabBar" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import TabBar from '@/components/TabBar.vue'

const route = useRoute()
const showTabBar = computed(() => {
  const hideRoutes = ['reader', 'bookDetail', 'searchResult']
  return !hideRoutes.includes(route.name as string)
})
</script>
