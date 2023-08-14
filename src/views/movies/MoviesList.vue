<template>
  <div class="grid grid-cols-auto-fill gap-4">
    <el-card v-for="movie in movieList" :key="movie.id" shadow="hover" class="cursor-pointer">
      <template #header>
        <h2>{{ movie.name }}</h2>
      </template>
      <img :src="movie.image" :alt="movie.name" class="w-full block">
    </el-card>
  </div>
</template>

<script setup lang="ts">
const movieList = ref<IMovie[]>()

const generalStore = useGeneralStore()
const { generalLoading } = storeToRefs(generalStore)

function getMovies () {
  return generalService.getSomeData()
}

onMounted(() => {
  generalLoading.value = true

  getMovies()
    .then(({ data }: {data: IMovie[]}) => {
      console.log(data)

      movieList.value = data
    }).catch((e) => {
      console.log(e)
    }).finally(() => {
      generalLoading.value = false
    })
})
</script>
