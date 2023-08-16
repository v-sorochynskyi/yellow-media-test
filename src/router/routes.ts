import type { RouteRecordRaw } from 'vue-router'

import { routeNames } from './route-names'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const defaultLayoutRoutes: RouteRecordRaw = {
  path: '/',
  name: routeNames.rootPage,
  redirect: { name: routeNames.movies },
  component: DefaultLayout,
  children: [
    // list of views that use default layout
    {
      path: '/movies/:id',
      name: routeNames.movieDetails,
      component: () => import('@/views/movieDetails/MovieDetails.vue')
    },
    {
      path: 'movies',
      name: routeNames.movies,
      meta: {
        label: 'movies'
      },
      component: () => import('@/views/movies/MoviesList.vue')
    },
    {
      path: 'sessions',
      name: routeNames.sessions,
      meta: {
        label: 'sessions'
      },
      component: () => import('@/views/sessions/Sessions.vue')
    }
  ]
}

const [movieDetailsRoute, ...navigationRoutes] = defaultLayoutRoutes.children

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  },

  defaultLayoutRoutes
]

export {
  routes,
  defaultLayoutRoutes,
  navigationRoutes,
  movieDetailsRoute
}
