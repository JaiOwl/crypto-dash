import { mount } from '@vue/test-utils';
import PortfolioPage from '@/components/portfolio/PortfolioPage';

describe('PortfolioPage.vue',
  () => {
    it('should render correct contents',
      () => {
        const iut = mount(PortfolioPage,
          {
            propsData: {
              portfolioId: '1234'
            }
          }
        );
        expect(iut.element.querySelector('div .h2').textContent)
          .toEqual('Portfolio Page - 1234');
      }
    );
  }
);
