
const routes = [

  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    children:[

      {
        path:'/',
        name:'index',
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
        path: '/poke',
        component:() => import('../pages/PokePage.vue')
      },

      {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue')
      }

    ]
  },

]

export default routes
