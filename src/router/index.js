import { createRouter, createWebHistory } from 'vue-router';

// Import your views
import HomeView from '@/views/site/HomeView.vue';
import AboutView from '@/views/site/AboutView.vue';
import NotFound from '@/views/NotFound.vue';

// Import your layouts
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';

// Import your admin views
import Dashboard from '@/views/admin/Dashboard.vue';
import Products from '@/views/admin/products/Products.vue';
import Categories from '@/views/admin/categories/Categories.vue';
import Blogs from '@/views/admin/blogs/Blogs.vue';
import Components from '@/views/admin/Components.vue';
import Profile from '@/views/admin/Profile.vue';
import Users from '@/views/admin/users/Users.vue';
import Login from '@/views/admin/auth/Login.vue';
import Register from '@/views/admin/auth/Register.vue';
import Default from '@/views/admin/Default.vue';
import Chat from '@/views/admin/Chat.vue';
import EditProduct from '@/views/admin/products/EditProduct.vue';

import store from '../store/index.js';


// Define your routes
const routes = [
  // Admin routes
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', component: Dashboard },
      { path: '/admin/dashboard', component: Dashboard },
      { path: '/admin/products', component: Products },
      { path: '/admin/categories', component: Categories },
      { path: '/admin/blogs', component: Blogs },
      { path: '/admin/components', component: Components },
      { path: '/admin/profile', component: Profile },
      { path: '/admin/users', component: Users },
      { path: '/admin/default', component: Default },
      { path: '/admin/chat', component: Chat},
      { path: '/admin/products/edit/:id', component: EditProduct, name: 'admin-products-edit',},
    ],
  },
  // Auth routes
  {
    path: '/login',
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: '/register',
    component: Register,
    meta: { requiresAuth: false },
  },
  // Default layout routes
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '/', name: 'home', component: HomeView },
      { path: '/about', name: 'about', component: AboutView },
    ],
  },
  // Catch-all route for not found
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },
];

// Create router instance
const history = createWebHistory();
const router = createRouter({
  history,
  routes,
});

// Navigation guard for authentication
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Check if the route requires authentication
    if (store.getters.isAuthenticated) {
      // User is authenticated, allow access
      next();
    } else {
      // User is not authenticated, redirect to login page or handle as needed
      next('/login'); // Redirect to the login page
    }
  } else {
    // Route does not require authentication, allow access
    next();
  }
});

export default router;
