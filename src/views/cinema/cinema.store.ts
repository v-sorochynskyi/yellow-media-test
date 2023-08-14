// the first argument is a unique id of the store across your application
export const useCinemaStore = defineStore('cinemaStore', () => {
  return {

  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCinemaStore, import.meta.hot))
}
