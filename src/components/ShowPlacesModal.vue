<template>
  <ElDialog v-model="isShowPlacesDialog" width="80%" @open="getPlaces" @close="reset">
    <template #header>
      <div class="flex items-center space-x-4">
        <p class="text-primary">
          {{ useDateFormat(new Date(placesPayload?.showdate as string), 'dddd DD MMMM YYYY').value.replace('"', '') }}
          {{ placesPayload?.daytime }}
        </p>
      </div>
    </template>
    <div v-loading="loading" class="flex flex-col items-center w-full">
      <div v-for="item in placesData" :key="item[0].row" class="flex items-center justify-center space-x-4 w-full">
        <div class="w-5">{{ item[0].row }}</div>

        <el-checkbox-group class="flex overflow-x-auto" @change="changeHandler($event, item[0].row)">
          <ElCheckbox
            v-for="seat in item[1]"
            :key="seat.seat"
            :disabled="!seat.is_free"
            :label="seat.seat"
            class="places-checkbox"
          >
            <div
              class="flex items-center justify-center w-6 h-6 border rounded"
              :class="[{'bg-gray-500': !seat.is_free},{'bg-red-400': selectedSeats[item[0].row]?.includes(seat.seat)}]"
            >
              {{ seat.seat }}
            </div>
          </ElCheckbox>
        </el-checkbox-group>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isShowPlacesDialog = false">Cancel</el-button>
        <el-button
          type="primary"
          :disabled="isButtonDisabled || loading"
          @click="makeOrder"
        >
          Book
        </el-button>
      </span>
    </template>
  </ElDialog>
</template>

<script lang="ts" setup>
import { useDateFormat } from '@vueuse/core'
import { ElNotification } from 'element-plus'
import type { ElDialog, CheckboxValueType } from 'element-plus'

const generalStore = useGeneralStore()
const { isShowPlacesDialog, placesPayload } = storeToRefs(generalStore)
const loading = ref(false)
const placesData = ref()
const selectedSeats = ref<TIndexedObject<number[]>>({})

const isButtonDisabled = computed(() => {
  return !Object.values(selectedSeats.value).length ||
    !Object.values(selectedSeats.value).some((seats) => seats.length)
})

function getPlaces () {
  if (placesPayload) {
    loading.value = true

    return generalService.getPlaces(placesPayload.value as IPlacesPayload)
      .then(({ data }) => {
        placesData.value = data
      })
      .catch((e) => (console.log(e)))
      .finally(() => (loading.value = false))
  }
}

function changeHandler (event: CheckboxValueType[], row: string) {
  selectedSeats.value[row] = selectedSeats.value[row] ?? []

  if (selectedSeats.value[row].includes(event[0] as number)) {
    const foundIndex = selectedSeats.value[row].findIndex((item) => item === event[0])

    selectedSeats.value[row].splice(foundIndex, 1)
  } else {
    selectedSeats.value[row].push(event[0] as number)
  }
}

function reset () {
  selectedSeats.value = {}
}

function makeOrder () {
  const rows = Object.keys(selectedSeats.value)

  const promises = rows.reduce((acc: any, current) => {
    const seatsArray = selectedSeats.value[current]

    seatsArray.forEach((seatNumber: number) => {
      acc.push(generalService.bookPlace({
        movie_id: placesPayload.value?.movie_id as number,
        row: current as number,
        seat: seatNumber,
        showdate: placesPayload.value?.showdate as string,
        daytime: placesPayload.value?.daytime as string
      }))
    })

    return acc
  }, [])

  loading.value = true

  Promise.all(promises)
    .then((res) => {
      reset()
      isShowPlacesDialog.value = false
      ElNotification({ type: 'success', message: `${res.length} ${res.length > 1 ? 'tickets have' : 'ticket has'} been booked` })
      return res
    })
    // .then(() => {
    //   return getPlaces()
    // })
    .catch((e) => (console.log(e)))
    .finally(() => (loading.value = false))
}

</script>
