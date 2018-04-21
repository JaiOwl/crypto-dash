import { shallow, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';

import AppNavBar from '@/components/shell/AppNavBar';

Vue.use(BootstrapVue);

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(BootstrapVue);

describe('AppNavBar.vue',
  () => {
    it('should have a brand title of Cryto-Dash',
      () => {
        const iut = shallow(AppNavBar,
          {
            stubs: ['router-link', 'router-view'],
            mocks: {
              $store: {
                state: {
                  route: {
                    path: '/'
                  }
                }
              }
            },
            localVue
          }
        );
        expect(iut.element.querySelector('.navbar-brand b').textContent)
          .toEqual(' Crypto-Dash');
      }
    );

    it('dashboard link should be active when on dashboard',
      () => {
        const iut = shallow(AppNavBar,
          {
            stubs: ['router-link', 'router-view'],
            mocks: {
              $store: {
                state: {
                  route: {
                    path: '/dashboard'
                  }
                }
              }
            },
            localVue
          }
        );
        expect(iut.element.querySelector('.nav-item.active').textContent)
          .toEqual(' Dashboard');
      }
    );

    it('dashboard link should be inactive when not on dashboard',
      () => {
        const iut = shallow(AppNavBar,
          {
            stubs: ['router-link', 'router-view'],
            mocks: {
              $store: {
                state: {
                  route: {
                    path: '/portfolios'
                  }
                }
              }
            },
            localVue
          }
        );
        expect(iut.element.querySelector('.nav-item.active').textContent)
          .not.toEqual(' Dashboard');
      }
    );
  }
);
