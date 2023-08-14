class GeneralService {
  getSomeData () {
    return useHttp.get('/movies')
  }
}

export const generalService = new GeneralService()
