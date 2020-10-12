
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/PageGroups.vue') },
      { path: '/Start', component: () => import('pages/PageStart.vue')},
      { path: '/Events', component: () => import('pages/PageEvents.vue')},
      { path: '/Groups', component: () => import('pages/PageGroups.vue')}
    ]
  }
]

// Always leave this as last one
routes.push({
  path: '*',
  component: () => import('pages/Error404.vue')
})

export default routes
