class CinemaService {
  getSomeData () {
    return useHttp.get('/movies')
  }
}

export const cinemaService = new CinemaService()
