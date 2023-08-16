// the first argument is a unique id of the store across your application
export const useGeneralStore = defineStore('generalStore', () => {
  const generalLoading = ref(false)
  const isShowPlacesDialog = ref(false)
  const placesPayload = ref<IPlacesPayload>()

  function showPlacesDialog (payload: IPlacesPayload) {
    placesPayload.value = payload
    isShowPlacesDialog.value = true
  }

  return {
    generalLoading,
    isShowPlacesDialog,
    placesPayload,
    showPlacesDialog
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGeneralStore, import.meta.hot))
}
