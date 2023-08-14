<template>
  <el-carousel type="card" height="450px" indicator-position="none" :autoplay="false" class="w-full">
    <el-carousel-item
      v-for="item in movieList"
      :key="item.id"
      class="flex items-start justify-between bg-white border"
    >
      <div class="w-[300px] h-full shrink-0">
        <MoviesImage :image="item.image" />
      </div>
      <div class="h-full flex flex-col items-center grow">
        <h3 class="text-xl font-semibold text-primary flex-none">{{ item.name }}</h3>
        <p class="overflow-auto flex-auto flex px-3" v-html="item.description" />
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script lang="ts" setup>
defineProps<{
  movieList: IMovie[]
}>()
</script>

<style lang="scss" scoped>
.el-carousel__item:nth-child(2n) {
  @apply bg-gray-100;
}

.el-carousel__item:nth-child(2n + 1) {
  @apply bg-gray-200;
}
</style>
