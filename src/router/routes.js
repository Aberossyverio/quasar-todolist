
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
        name: 'about',
        component:() => import('../pages/AboutPage.vue')
      },

      {
        path: '/todo',
        name: 'todolist',
        component:() => import('../pages/TodoPage.vue')
      },

      {
        path: '/poke',
        name: 'pokemon',
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
