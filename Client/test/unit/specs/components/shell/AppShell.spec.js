import { shallow } from '@vue/test-utils';
import AppShell from '@/components/shell/AppShell';

describe('AppShell.vue',
  () => {
    it('should render correct contents',
      () => {
        const iut = shallow(AppShell,
          {
            stubs: ['router-link', 'router-view']
          }
        );
        expect(iut.element.querySelector('div .h2').textContent)
          .toEqual('AppShell Page');
      }
    );
  }
);
