import { CryptoCurrencyValue } from "../../../src/models/CryptoCurrencyValue";
import { CoinMarketCapApiClient } from "../../../src/models/CoinMarketCapApi/CoinMarketCapApiClient";

describe('CoinMarketCapApiClient requestUpdate',
  () => {
    it('should return values',
      async () => {
        const iut = new CoinMarketCapApiClient();
        const values = await iut.requestUpdate();

        expect(values).not.toBeUndefined();
        expect(values).not.toBeNull();
        expect(values.length).toBeGreaterThan(0);
        values.forEach(
          (element) => {
            expect((element instanceof CryptoCurrencyValue)).toBe(true);
          }
        );
      }
    );
  }
);
