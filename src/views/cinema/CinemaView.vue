<template />

<script lang="ts" setup>
const loading = ref(false)
function getMovies () {
  return cinemaService.getSomeData()
}

onMounted(() => {
  loading.value = true

  getMovies()
    .then((res) => {
      console.log(res)
    })
  console.log(
    'mounted'
  )
})
</script>
