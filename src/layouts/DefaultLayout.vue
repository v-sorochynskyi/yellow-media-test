<template>
  <div v-loading="generalLoading" class="flex flex-col h-full overflow-hidden">
    <header
      class="p-4 bg-orange-200 text-white capitalize shadow flex items-center" data-testid="page-header"
    >
      <el-button
        v-for="nav in navigation"
        :key="nav.name"
        :type="$elComponentType.primary"
        plain
        class="hover:underline capitalize"
        @click="$router.push({ name: nav.name })"
      >
        {{ nav.label }}
      </el-button>
    </header>

    <div class="flex-grow overflow-auto p-4">
      <router-view />
    </div>

    <footer class="p-4 bg-red-200 capitalize shrink-0">example footer</footer>
  </div>
</template>

<script lang="ts" setup>
import { defaultLayoutRoutes } from '@/router/routes'

const generalStore = useGeneralStore()
const { generalLoading } = storeToRefs(generalStore)

const navigation = [
  ...defaultLayoutRoutes.children?.map(route => ({
    name: route.name as string,
    label: route.meta?.label || ''
    // ...
  })) || []
]
</script>
