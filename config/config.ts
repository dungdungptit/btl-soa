import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 220,
    ...defaultSettings,
  },
  routes: [
    {
      path: '/user',
      layout: false,
      routes: [
        {
          path: '/user/login',
          layout: false,
          name: 'login',
          // component: './auth',
          component: './User/Login',
        },

        {
          path: '/user',
          redirect: '/user/login',
        },
        {
          name: 'register',
          layout: false,
          path: '/user/register',
          component: './User/Register',
        },
        {
          component: '404',
        },
      ],
    },
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: 'Trang chủ',
      path: '/home',
      component: './Home',
    },
    {
      name: 'Sản phẩm',
      path: '/products',
      component: './Products',
    },
    {
      name: 'Chi tiết sản phẩm',
      path: '/products/:id',
      component: './Products/components/ProductItem.tsx',
    },
    {
      name: 'Giới thiệu',
      path: '/about',
      component: './Abouts',
    },
    {
      name: 'Liên hệ',
      path: '/contact',
      component: './Contact',
    },
    {
      name: 'Giỏ hàng',
      path: '/cart',
      component: './Cart',
    },
    {
      name: 'Wishlist',
      path: '/wishlist',
      component: './Wishlist',
    },
    {
      component: '404',
    },
  ],
  npmClient: 'yarn',
});

