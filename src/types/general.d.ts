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
}
