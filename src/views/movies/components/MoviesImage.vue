<template>
  <div v-if="!image ||imageHasError" class="h-full w-full flex items-center justify-center">
    <el-icon :size="100"><IconPicture /></el-icon>
  </div>

  <img
    v-else
    class="h-full object-cover"
    :src="image"
    alt="image"
    @error="imageHasError = true"
    @load="imageHasError = false"
  >
</template>

<script lang="ts" setup>
import { Picture as IconPicture } from '@element-plus/icons-vue'

defineProps<{
  image: IMovie['image']
}>()

const imageHasError = ref(false)

</script>
