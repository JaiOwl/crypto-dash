import { CryptoCurrencyStore } from "../../src/models/CryptoCurrencyStore";
import { CryptoCurrencyValue } from "../../src/models/CryptoCurrencyValue";


describe('CryptoCurrencyStore Get/Set/Delete Actions',
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

    it('should return undefined if not in store',
      async () => {
        const iut = new CryptoCurrencyStore();

        expect(await iut.getCurrencyValue('a')).toBeUndefined();
      }
    );

    it('should return the value set',
      async () => {
        const iut = new CryptoCurrencyStore();

        const input = createTestCurrency('a');
        expect(await iut.getCurrencyValue('a')).toBeUndefined();
        expect(await iut.setCurrencyValue(input)).toBe(input);
        expect(await iut.getCurrencyValue('a')).toBe(input);
      }
    );

    it('should not set on null',
      async () => {
        const iut = new CryptoCurrencyStore();

        expect(await iut.getCurrencyValue(null)).toBeUndefined();
      }
    );

    it('should not update if not CryptoCurrencyValue instance',
      async () => {
        const iut = new CryptoCurrencyStore();

        const input = createTestCurrency('a');
        expect(await iut.getCurrencyValue('a')).toBeUndefined();
        expect(await iut.setCurrencyValue(input)).toBe(input);
        expect(await iut.getCurrencyValue('a')).toBe(input);
        expect(await iut.setCurrencyValue({ id: 'a' })).toBeUndefined();
        expect(await iut.getCurrencyValue('a')).toBe(input);
      }
    );

    it('should update the value set',
      async () => {
        const iut = new CryptoCurrencyStore();

        const input = createTestCurrency('a');
        expect(await iut.getCurrencyValue('a')).toBeUndefined();
        expect(await iut.setCurrencyValue(input)).toBe(input);
        expect(await iut.getCurrencyValue('a')).toBe(input);
        const inputUpdate = createTestCurrency('a');
        expect(await iut.setCurrencyValue(inputUpdate)).toBe(inputUpdate);
        expect(await iut.getCurrencyValue('a')).not.toBe(input);
        expect(await iut.getCurrencyValue('a')).toBe(inputUpdate);
      }
    );

    it('should delete the value set',
      async () => {
        const iut = new CryptoCurrencyStore();

        const input = createTestCurrency('a');
        expect(await iut.getCurrencyValue('a')).toBeUndefined();
        expect(await iut.setCurrencyValue(input)).toBe(input);
        expect(await iut.getCurrencyValue('a')).toBe(input);
        expect(await iut.deleteCurrencyValue('a')).toBe(input);
        expect(await iut.getCurrencyValue('a')).toBeUndefined();
      }
    );

    it('should return all the set values',
      async () => {
        const iut = new CryptoCurrencyStore();

        const input1 = createTestCurrency('a');
        const input2 = createTestCurrency('b');
        const input3 = createTestCurrency('c');
        const input4 = createTestCurrency('d');
        expect(await iut.setCurrencyValue(input1)).toBe(input1);
        expect(await iut.setCurrencyValue(input2)).toBe(input2);
        expect(await iut.setCurrencyValue(input3)).toBe(input3);
        expect(await iut.setCurrencyValue(input4)).toBe(input4);

        expect(await iut.getAllCurrencyValues()).toEqual(
          {
            a: input1,
            b: input2,
            c: input3,
            d: input4
          }
        );
      }
    );
  }
);
