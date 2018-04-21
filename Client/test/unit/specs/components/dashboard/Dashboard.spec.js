import { mount } from '@vue/test-utils';
import DashboardPage from '@/components/dashboard/DashboardPage';

describe('DashboardPage.vue',
  () => {
    it('should render correct contents',
      () => {
        const iut = mount(DashboardPage);
        expect(iut.element.querySelector('div .h2').textContent)
          .toEqual('Dashboard Page');
      }
    );
  }
);
