
const routes = [
  {
    path: "/:catchAll(.*)",
    redirect: { name: 'notFound' },
  },
  {
    name: "dashboard",
    // path: '/:catchAll(.*)*',
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/DashboardPage.vue') }
    ],
  },
  {
    path: '/company',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/CompanyPage.vue') }
    ],
  },
  {
    name: "notFound",
    path: '/404',
    component: () => import('pages/ErrorNotFound.vue')
  },
]

export default routes

