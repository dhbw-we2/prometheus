
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/PageStart.vue') },
      { path: '/Start', component: () => import('pages/PageStart.vue')},
      { path: '/Events', component: () => import('pages/PageEvents.vue')},
      { path: '/Groups', component: () => import('pages/PageGroups.vue')},
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: 'login', name: 'Login', component: () => import('pages/Auth')},
      {path: 'register', name: 'Register', component: () => import('pages/Auth')},
      {path: 'forgotPassword', name: 'ForgotPassword', component: () => import('pages/ForgotPassword.vue')
      },
    ]
  }
]

// Always leave this as last one
routes.push({
  path: '*',
  component: () => import('pages/Error404.vue')
})

export default routes
