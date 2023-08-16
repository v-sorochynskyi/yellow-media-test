<template>
  <div class="h-full flex flex-col">
    <div class="flex flex-none items-center mb-5">
      <el-input
        v-model="searchValue"
        class="max-w-[300px]"
        placeholder="Search"
        @input="debouncedFn"
      />
      <el-select
        v-model="genreValue"
        placeholder="Select genre"
        class="ml-5"
        @change="onSelectGenre"
      >
        <el-option :value="allOptionValue">{{ allOptionValue }}</el-option>
        <el-option
          v-for="item in genreOptions"
          :key="item.value" :value="item.value"
        >
          {{ item.label }}
        </el-option>
      </el-select>
      <span class="ml-4">{{ movieList.length }} {{ movieList.length > 1 ? 'items': 'item' }}</span>
    </div>

    <div class="flex flex-auto overflow-y-auto">
      <div
        v-if="movieList?.length"
        class="grid grid-cols-auto-fill w-full gap-4 p-3"
      >
        <MoviesImage
          v-for="item in movieList"
          :key="item.id"
          :image="item.image"
          class="w-full cursor-pointer max-h-[400px] hover:scale-105 transition-transform"
          @click="$router.push({ name: $routeNames.movieDetails, params: {id: item.id} })"
        />
      </div>
      <div v-else class="flex h-full w-full justify-center items-center">
        No data
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EGenres } from '@/types/enums'

const generalStore = useGeneralStore()
const moviesListStore = useMoviesListStore()
const { generalLoading } = storeToRefs(generalStore)
const { movieList } = storeToRefs(moviesListStore)

const allOptionValue = 'ALL'
const searchValue = ref('')
const genreValue = ref(allOptionValue)

generalLoading.value = true

const genres = Object.fromEntries(Object.entries(EGenres)
  .filter((pair) => isNaN(Number(pair[0]))))

const genreOptions = (Object.keys(genres) as string[])
  .reduce((acc: IGenreOption[], key: string) => {
    acc.push({
      value: key,
      label: key
    })

    return acc
  }, [] as IGenreOption[])

onMounted(() => {
  getMovies()
})

const debouncedFn = useDebounceFn(() => {
  getMovies()
}, 1000, { maxWait: 5000 })

function getMovies () {
  const payload = {
    ...searchValue.value ? { name: searchValue.value } : {},
    ...genreValue.value && genreValue.value !== allOptionValue ? { genres: genres[genreValue.value] as number } : {}
  }

  generalLoading.value = true

  moviesListStore.getMovieList(payload)
    .catch((e) => (console.log(e)))
    .finally(() => (generalLoading.value = false))
}

function onSelectGenre () {
  getMovies()
}
</script>
