class GeneralService {
  getSomeData (payload: IMoviesPayload) {
    return useHttp.get('/movies', { params: payload })
  }
}

export const generalService = new GeneralService()
