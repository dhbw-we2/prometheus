
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/PageStart.vue')},
      { path: '/Start', component: () => import('pages/PageStart.vue')},
      { path: '/Home', component: () => import('pages/PageHome.vue'), meta: {requiresAuth: true}},
      { path: '/Events', component: () => import('pages/PageEvents.vue'), meta: {requiresAuth: true}},
      { path: '/Groups', component: () => import('pages/PageGroups.vue'), meta: {requiresAuth: true}},
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/PageHome.vue') },
      {path: 'login', name: 'Login', component: () => import('pages/Auth')},
      {path: 'register', name: 'Register', component: () => import('pages/Auth')},
      {path: 'forgotPassword', name: 'ForgotPassword', component: () => import('pages/ForgotPassword.vue')
      },
    ]
  },
  {
    path: '/user',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'profile', name: 'UserProfile', component: () => import('pages/user/Profile.vue'), meta: {requiresAuth: true}
      }
    ]
  }
]

// Always leave this as last one
routes.push({
  path: '*',
  component: () => import('pages/Error404.vue')
})

export default routes
