import debug from 'debug';
import { CryptoCurrencyValueUpdater } from '../CryptoCurrencyValueUpdater';
import { get } from 'https';
import { URL } from 'url';
import { CryptoCurrencyValue } from '../CryptoCurrencyValue';

const debugLogger = debug('debug:CointMarketCapApiClient');
//const infoLogger = debug('info:CointMarketCapApiClient');
const warnLogger = debug('warn:CointMarketCapApiClient');
//const errorLogger = debug('error:CointMarketCapApiClient');

const DEFAULT_REQUEST_TIMEOUT = 10 * 1000;

const getConnection = () => {
  return new Promise(
    (resolve, reject) => {
      debugLogger('Sending request...');
      let alreadyEnded = false;
      const timeout = setTimeout(
        () => {
          if (!alreadyEnded) {
            debugLogger('Request Timeout');
            alreadyEnded = true;
            clientRequest.abort();
            reject('request timeout');
          }
        },
        DEFAULT_REQUEST_TIMEOUT
      );
      const requestUrl = new URL('https://api.coinmarketcap.com/v1/ticker/');
      const clientRequest = get(
        requestUrl,
        (clientResponse) => {
          if (!alreadyEnded) {
            debugLogger('Request Response');
            alreadyEnded = true;
            clearTimeout(timeout);
            resolve(clientResponse);
          }
        }
      ).on('error',
        (error) => {
          debugLogger(`equest failed => ${error}`);

          if (!alreadyEnded) {
            debugLogger('Request Timeout');
            alreadyEnded = true;
            clearTimeout(timeout);
            reject(error);
          }
        }
      );
    }
  );
}

const getData = (response) => {
  return new Promise(
    (resolve, reject) => {
      response.setEncoding('utf8');

      let rawData = '';
      response.on('data', (chunk) => { rawData += chunk; });
      response.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData);
          resolve(parsedData);
        } catch (exp) {
          reject(`Unable toparse response data => ${exp.message}`);
        }
      });
    }
  );
}

module.exports.CoinMarketCapApiClient = class CoinMarketCapApiClient extends CryptoCurrencyValueUpdater {
  constructor() {
    super();
  }

  async requestUpdate () {
    let response = await getConnection();
    const { statusCode } = response;
    const contentType = response.headers['content-type'];

    if ((statusCode === 200) && (contentType == 'application/json')) {
      const data = await getData(response);
      if (Array.isArray(data)) {
        const currencyValues = [];
        data.forEach(
          (input) => {
            const value = new CryptoCurrencyValue(
              {
                id:                  `${input.id}`, // string
                name:                `${input.name}`, // string
                symbol:              `${input.symbol}`, // string
                rank:                Number.parseInt(input.rank), // string of integer
                price_usd:           Number.parseFloat(input.price_usd), // string of float
                price_btc:           Number.parseFloat(input.price_btc), // string of float
                volume_24h_usd:      Number.parseFloat(input['24h_volume_usd']), // string of float
                market_cap_usd:      Number.parseFloat(input.market_cap_usd), // string of float
                available_supply:    Number.parseFloat(input.available_supply), // string of float
                total_supply:        Number.parseFloat(input.total_supply), // string of float
                max_supply:          (input.max_supply != null) ? Number.parseFloat(input.max_supply) : undefined, // string of float || null
                percent_change_1h:   Number.parseFloat(input.percent_change_1h), // string of float
                percent_change_24h:  Number.parseFloat(input.percent_change_24h), // string of float
                percent_change_7d:   Number.parseFloat(input.percent_change_7d), // string of float
                last_updated:        new Date(input.last_updated * 1000) // Unix time in seconds
              }
            );
            currencyValues.push(value);
          }
        );

        debugLogger(`Returned ${currencyValues.length} values`);
        return currencyValues;
      }
    } else {
      warnLogger(`Corrupt message response from server SC:${statusCode} CT:${contentType}`, response);
      response.resume();
      throw new Error('corrupt response from server');
    }
  }


};
