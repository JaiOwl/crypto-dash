import request from 'supertest';
import { CryptoCurrencyStore } from '../../src/models/CryptoCurrencyStore';

jest.mock('../../src/models/CryptoCurrencyStore',
  function () {
    return {
      CryptoCurrencyStore: function () {
        return {
          getAllCurrencyValues: function () {
            return {
              a: { id: 'a' },
              b: { id: 'b' },
              c: { id: 'c' },
              bitcoin: { id: 'bitcoin' }
            };
          }
        }
      }
    }
  }
);

import app from '../../src/app.js';

describe('GET /api/currency/values',
  () => {
    it('should return a collection of currency values',
      async () => {
        await request(app)
          .get('/api/currency/values')
          .set('Accept', 'application/json')
          .expect(200)
          .then(
            (response) => {
              expect(response.body).not.toBeNull();
              expect(response.body).not.toBeUndefined();
              expect(Object.keys(response.body).length).toEqual(4);
            }
          );
      }
    );
  }
);


describe('GET /api/currency/:id/value',
  () => {
    it('should return the given currency value',
      async () => {
        await request(app)
          .get('/api/currency/bitcoin/value')
          .set('Accept', 'application/json')
          .expect(200)
          .then(
            (response) => {
              expect(response.body).not.toBeNull();
              expect(response.body).not.toBeUndefined();
              expect(response.body.id).toEqual('bitcoin');
            }
          );
      }
    );

    it('should fail for non existing currency value',
      async () => {
        await request(app)
          .get('/api/currency/fakebob/value')
          .set('Accept', 'application/json')
          .expect(404);
      }
    );
  }
);
