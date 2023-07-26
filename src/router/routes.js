
const routes = [

  {
      path: '/',
      component: () => import('../pages/IndexPage.vue')
  },

  {
    path: '/about',
    component:() => import('../pages/AboutPage.vue')
  },

  {
    path: '/todo',
    component:() => import('../pages/TodoPage.vue')
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
