import type { RouteRecordRaw } from 'vue-router'

export const cinemaRouteNames = {
  cinema: 'cinema'
}

export const cinemaRoutes: Array<RouteRecordRaw> = [
  {
    path: 'cinema',
    name: cinemaRouteNames.cinema,
    meta: {
      label: 'Cinema'
    },
    component: () => import('./CinemaView.vue')
  }
]
