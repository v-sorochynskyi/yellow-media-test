<template>
  <div v-loading="generalLoading" class="flex flex-col h-full overflow-hidden">
    <header
      class="p-4 bg-white text-primary capitalize shadow flex items-center" data-testid="page-header"
    >
      <nav>
        <ul class="flex items-center space-x-4">
          <router-link
            v-for="nav in navigation"
            :key="nav.name"
            #default="{ isExactActive }"
            :to="{name: nav.name}"
            custom
          >
            <li
              :type="$elComponentType.primary"
              plain
              class="hover:underline capitalize cursor-pointer text-xl"
              :class="{underline: isExactActive}"
              @click="$router.push({ name: nav.name })"
            >
              {{ nav.label }}
            </li>
          </router-link>
        </ul>
      </nav>
    </header>

    <div class="flex-grow overflow-auto p-4">
      <router-view #default="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>

    <ShowPlacesModal />
  </div>
</template>

<script lang="ts" setup>
import { navigationRoutes } from '@/router/routes'

const generalStore = useGeneralStore()
const { generalLoading } = storeToRefs(generalStore)

const navigation = [
  ...navigationRoutes.map(route => ({
    name: route.name as string,
    label: route.meta?.label || ''
    // ...
  })) || []
]
</script>
