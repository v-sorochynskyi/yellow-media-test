<template>
  <div class="h-full flex flex-col">
    <div class="flex flex-none">
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
    </div>
    <div class="flex items-center flex-auto">
      <MoviesCarousel v-if="movieList" :movieList="movieList" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { EGenres } from '@/types/enums'

const generalStore = useGeneralStore()
const { generalLoading } = storeToRefs(generalStore)

const movieList = ref<IMovie[]>()
const searchValue = ref('')
const genreValue = ref()

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

const allOptionValue = 'ALL'

generalLoading.value = true

const debouncedFn = useDebounceFn(() => {
  getMovies()
}, 1000, { maxWait: 5000 })

function getMovies () {
  const payload = {
    ...searchValue.value ? { name: searchValue.value } : {},
    ...genreValue.value && genreValue.value !== allOptionValue ? { genres: genres[genreValue.value] as number } : {}
  }

  generalLoading.value = true

  return generalService.getSomeData(payload)
    .then(({ data }: {data: IMovie[]}) => {
      movieList.value = data
    }).catch((e) => {
      console.log(e)
    }).finally(() => {
      generalLoading.value = false
    })
}

function onSelectGenre () {
  getMovies()
}

onMounted(() => {
  getMovies()
})
</script>
