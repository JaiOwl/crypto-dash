import { CryptoCurrencyStore } from '../../src/models/CryptoCurrencyStore';
import { CryptoCurrencyValue } from '../../src/models/CryptoCurrencyValue';
import { CryptoCurrencyManager } from '../../src/models/CryptoCurrencyManager';
import { CryptoCurrencyValueUpdater } from '../../src/models/CryptoCurrencyValueUpdater';

describe('CryptoCurrencyManager Update Actions',
  () => {
    function createTestCurrency (id) {
      return new CryptoCurrencyValue(
        {
          available_supply: 1234.0,
          id: id,
          last_updated: new Date(),
          market_cap_usd: 1234567890.0,
          max_supply: 234567890.0,
          name: 'test',
          percent_change_1h: 1.2,
          percent_change_24h: -2.4,
          percent_change_7d: 0.1,
          price_btc: 0.01,
          price_usd: 1.01,
          rank: 1,
          symbol: 'TST',
          total_supply: 3456789.0,
          volume_24h_usd: 456789.1
        }
      );
    }

    it('should update store',
      async () => {
        const store = jest.genMockFromModule('../../src/models/CryptoCurrencyStore').CryptoCurrencyStore;
        store.setCurrencyValue = jest.fn((input) => {return Promise.resolve(input);})
        const updater = jest.genMockFromModule('../../src/models/CryptoCurrencyValueUpdater').CryptoCurrencyValueUpdater;
        const inputData = [
          createTestCurrency('a'),
          createTestCurrency('b'),
          createTestCurrency('c'),
          createTestCurrency('d')
        ];
        updater.requestUpdate = jest.fn(() => {return Promise.resolve(inputData);})

        const iut = new CryptoCurrencyManager({
          updater: updater,
          updateInterval: 100000000,
          currencyStore: store
        })

        expect(await iut.update()).toEqual(inputData);
        expect(updater.requestUpdate).toHaveBeenCalledTimes(1);
        expect(store.setCurrencyValue).toHaveBeenCalledTimes(4);
      }
    );
  }
);
