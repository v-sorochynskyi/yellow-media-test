class GeneralService {
  getMoviesList (payload: IMoviesPayload) {
    return useHttp.get('/movies', { params: payload })
  }

  getSessions (payload: ISessionsPayload) {
    return useHttp.get('/movieShows', { params: payload })
  }

  getPlaces (payload: IPlacesPayload) {
    return useHttp.get('/showPlaces', { params: payload })
  }

  bookPlace (payload: IBookPlacePayload) {
    return useHttp.post('/bookPlace', payload)
  }
}

export const generalService = new GeneralService()
