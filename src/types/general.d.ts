type TIndexedObject<T = any> = {
  [key: string]: T
}

type TCallbackFn<T extends unknown[] = [], R = void> = (...args: T) => R

interface IMovie {
  id: number
  name: string
  description: string
  genre: number
  image: string
  additional: string
}

interface IGenreOption {
  value: string
  label: string
}

interface IMoviesPayload {
  name?: string
  genres?: number
  movie_id?: number
}

interface ISessionsPayload {
  movie_id?: number
}

interface ISession {
  showdate: string
  daytime: string
}

interface IPlacesPayload {
  movie_id?: number
  daytime?: string
  showdate?: string
}

interface IBookPlacePayload {
  'movie_id': number
  'row': number
  'seat': number
  'showdate': string
  'daytime': string
}
