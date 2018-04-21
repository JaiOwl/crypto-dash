import Vue from 'vue';
import Router from 'vue-router';
import AppShell from '@/components/shell/AppShell';
import Dashboard from '@/components/dashboard/DashboardPage';
import Portfolio from '@/components/portfolio/PortfolioPage';
import Portfolios from '@/components/portfolios/PortfoliosPage';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'AppShell',
      component: AppShell,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'portfolios/:portfolioId',
          name: 'Portfolio',
          component: Portfolio,
          props: true
        },
        {
          path: 'portfolios',
          name: 'Portfolios',
          component: Portfolios
        },
        {
          path: '',
          name: 'Home',
          redirect: '/dashboard'
        },
        {
          // Default error catch route to dashboard page
          path: '*',
          name: '404',
          redirect: '/dashboard'
        }
      ]
    }
  ]
});
