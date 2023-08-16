export const useMoviesListStore = defineStore('moviesListStore', () => {
  const movieList = ref<IMovie[]>([])

  function setMovieList (movies: IMovie[]) {
    movieList.value = movies
  }

  function getMovieList (payload: IMoviesPayload) {
    return generalService.getMoviesList(payload)
      .then(({ data }: {data: IMovie[]}) => {
        setMovieList(data)

        return data
      })
  }

  return {
    movieList,
    setMovieList,
    getMovieList
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMoviesListStore, import.meta.hot))
}
