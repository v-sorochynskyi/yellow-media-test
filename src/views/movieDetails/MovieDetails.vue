<template>
  <div>
    <template v-if="movieData">
      <div class="flex items-start space-x-4">
        <div class="w-1/3 shrink-0">
          <MoviesImage
            :image="movieData?.image"
            class="w-full"
          />
        </div>
        <div class="grow">
          <h1 class="text-3xl text-primary mb-4">{{ movieData?.name }}</h1>
          <p class="mb-4" v-html="movieData?.description" />
          <p v-html="movieData?.additional" />
        </div>
      </div>
      <div class="mt-4">
        <h2 class="text-primary text-xl">Movie sessions:</h2>

        <div v-for="session in sessionsData" :key="session.showdate" class="flex space-x-4 border-b items-center h-10">
          <div class="w-[200px]">
            {{ useDateFormat(new Date(session.showdate), 'dddd DD MMMM YYYY').value.replace('"', '') }}
          </div>
          <div class="flex flex-wrap space-x-4">
            <div
              v-for="time in session.daytime.split(';')"
              :key="time"
              class="cursor-pointer hover:text-red-400 hover:underline"
              @click="generalStore.showPlacesDialog({
                movie_id: route.params.id,
                daytime: time,
                showdate: session.showdate
              })"
            >
              {{ time }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { useDateFormat } from '@vueuse/core'

const generalStore = useGeneralStore()
const { generalLoading } = storeToRefs(generalStore)
const route = useRoute()
const movieData = ref<IMovie>()
const sessionsData = ref()

function getData () {
  generalLoading.value = true
  return generalService.getMoviesList({ movie_id: route.params.id })
    .then(({ data }: {data: IMovie[]}) => {
      movieData.value = data[0]
      return data
    })
    .then(() => {
      return generalService.getSessions({ movie_id: route.params.id })
    })
    .then(({ data }: { data: TIndexedObject<ISession[]> }) => {
      sessionsData.value = (Object.values(data))[0]
    })
    .catch((e) => (console.log(e)))
    .finally(() => (generalLoading.value = false))
}

getData()
</script>
