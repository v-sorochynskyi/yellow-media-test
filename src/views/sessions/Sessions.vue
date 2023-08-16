<template>
  <div>
    <div
      v-for="(movieGroup, date) in groupedSessionsByDate"
      :key="date"
      class="flex items-start w-full space-y-3 space-x-3"
    >
      <p class="text-2xl shrink-0 w-[200px]">
        {{ useDateFormat(new Date(date), 'dddd DD MMMM YYYY').value.replace('"', '') }}
      </p>
      <div class="flex grow overflow-x-auto snap-x space-x-3">
        <div v-for="data in movieGroup" :key="data.movie.id" class="w-[300px] shrink-0 flex flex-col snap-center">
          <MoviesImage :image="data.movie.image" />

          <div class="flex flex-wrap gap-4 text-primary">
            <div
              v-for="time in data.daytime.split(';')"
              :key="time"
              class="cursor-pointer hover:text-red-400 hover:underline"
              @click="generalStore.showPlacesDialog({
                movie_id: data.movie.id,
                daytime: time,
                showdate: date
              })"
            >
              {{ time }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDateFormat } from '@vueuse/core'

const generalStore = useGeneralStore()
const moviesListStore = useMoviesListStore()
const { movieList } = storeToRefs(moviesListStore)
const { generalLoading } = storeToRefs(generalStore)

const sessions = ref<TIndexedObject<ISession[]>>()

generalLoading.value = true

const groupedSessionsByDate = computed(() => {
  if (sessions.value) {
    return Object.entries(sessions.value).reduce((acc, current) => {
      current[1].forEach(element => {
        acc[element.showdate] = acc[element.showdate] ?? []

        const foundMovie = movieList.value.find((movie: IMovie) => movie.id === Number(current[0]))

        acc[element.showdate].push({
          daytime: element.daytime,
          movie: foundMovie
        })
      })

      return acc
    }, {})
  } else return {}
})

function getSessions () {
  return moviesListStore.getMovieList()
    .then(() => {
      return generalService.getSessions()
        .then(({ data }: {data: TIndexedObject<ISession[]>}) => {
          sessions.value = data
          return data
        })
    })
    .catch((e) => (console.log(e)))
    .finally(() => (generalLoading.value = false))
}

getSessions()
</script>
