import debug from 'debug';
import { CryptoCurrencyValue } from './CryptoCurrencyValue';

const debugLogger = debug('debug:CryptoCurrencyStore');

module.exports.CryptoCurrencyStore = class CryptoCurrencyStore {

  constructor() {
    this.currencyValues = {};
  }

  getAllCurrencyValues () {
    return Promise.resolve({...this.currencyValues});
  }

  getCurrencyValue (currencyId) {
    const value = (currencyId != null) ? this.currencyValues[currencyId] : undefined;
    return Promise.resolve(value);
  }

  setCurrencyValue (value) {
    let setValue = undefined;
    if ((value != null) && (value instanceof CryptoCurrencyValue)) {
      this.currencyValues[value.id] = value;
      setValue = this.currencyValues[value.id];
    }
    debugLogger(`setCurrencyValue for currency ${(setValue !== undefined)?setValue.id:undefined}`, setValue);
    return Promise.resolve(setValue);
  }

  async deleteCurrencyValue (currencyId) {
    const value = await this.getCurrencyValue(currencyId);
    delete this.currencyValues[currencyId];
    debugLogger(`setCurrencyValue for currency ${currencyId}`, value);
    return Promise.resolve(value);
  }
};
