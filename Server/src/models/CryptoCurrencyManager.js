import debug from 'debug';

//const debugLogger = debug('debug:CryptoCurrencyManager');
const infoLogger = debug('info:CryptoCurrencyManager');
const warnLogger = debug('warn:CryptoCurrencyManager');
//const errorLogger = debug('error:CryptoCurrencyManager');

const DEFAULT_UPDATE_INTERVAL = (60 * 1000);

module.exports.CryptoCurrencyManager = class CryptoCurrencyManager {

  constructor({ updater, updateInterval, currencyStore }) {
    this.updater        = updater;
    this.updateInterval = updateInterval || DEFAULT_UPDATE_INTERVAL;
    this.updating       = undefined;
    this.updateHandler  = undefined;
    this.currencyStore  = currencyStore;

    infoLogger(`[${this.id}] Instance Created`);
    // Schedule updae immediately
    setTimeout(
      () => {
        this.update();
      },
      0
    );

  }

  startUpdating () {
    if (this.updateHandler !== undefined) return;
    // Schedule update at configured interval
    this.updateHandler = setInterval(
      () => {
        this.update();
      },
      this.updateInterval
    );
  }

  stopUpdating () {
    if (this.updateHandler !== undefined) {
      clearInterval(this.updateHandler);
    }
  }

  /**
   * Updates the values in the Store
   */
  async update () {
    // Only have one update running at a time
    if (this.updating) await this.updating;

    const updatePromise = this.updater.requestUpdate();
    this.updating = updatePromise;
    return await updatePromise
      .then(
        (values) => {
          values.forEach(
            (currencyValue) => {
              // don't wait for the promise to complete
              this.currencyStore.setCurrencyValue(currencyValue)
                .catch(
                  (error) => {
                    warnLogger(`Set Currency failed for currency ${currencyValue.id} => ${error}`);
                  }
                );
            }
          );
          if (this.updating === updatePromise) delete this.updating;
          return values;
        }
      )
      .catch(
        (error) => {
          warnLogger(`Update failed => ${error}`);
          if (this.updating === updatePromise) delete this.updating;
        }
      );
  }
};
