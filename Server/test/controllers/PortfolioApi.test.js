import request from 'supertest';
import { PortfolioStore } from '../../src/models/Porfolio/PortfolioStore';

jest.mock('../../src/models/Porfolio/PortfolioStore',
  function () {
    return {
      PortfolioStore: function () {
        return {
          getAllPortfolios: function () {
            return {
              a: { id: 'a', name: 'A', transactions: [] },
              b: { id: 'b', name: 'B', transactions: [] },
              c: { id: 'c', name: 'C', transactions: [] },
              d: { id: 'd', name: 'D', transactions: [] }
            };
          },
          getPortfolio: function(id) {
            return (id != 'fakebob') ? { id: id, name: `Test ${id}`, transactions: [] } : undefined;
          },
          setPortfolio: function(value) {
            return value;
          },
          generatePortfolioId: function() {
            return `21`;
          },
          generatePortfolioTransactionId: function(portfolio) {
            return `${portfolio.id}.32`;
          }
        }
      }
    }
  }
);

import app from '../../src/app.js';

describe('GET /api/portfolios',
  () => {
    it('should return a collection of portfolios',
      async () => {
        await request(app)
          .get('/api/portfolios')
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


describe('GET /api/portfolio/:id',
  () => {
    it('should return the given portfolio',
      async () => {
        await request(app)
          .get('/api/portfolio/b')
          .set('Accept', 'application/json')
          .expect(200)
          .then(
            (response) => {
              expect(response.body).not.toBeNull();
              expect(response.body).not.toBeUndefined();
              expect(response.body.id).toEqual('b');
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

describe('PATCH /api/portfolio/:id',
  () => {
    it('should update the given portfolio',
      async () => {
        await request(app)
          .patch('/api/portfolio/b')
          .set('Accept', 'application/json')
          .send({name: 'new b'})
          .expect(200)
          .then(
            (response) => {
              expect(response.body).not.toBeNull();
              expect(response.body).not.toBeUndefined();
              expect(response.body.id).toEqual('b');
              expect(response.body.name).toEqual('new b');
            }
          );
      }
    );

    it('should fail for non existing portfolio',
      async () => {
        await request(app)
          .patch('/api/portfolio/fakebob')
          .set('Accept', 'application/json')
          .send({name: 'new b'})
          .expect(404);
      }
    );

    it('should fail for no portfolio name',
      async () => {
        await request(app)
          .patch('/api/portfolio/b')
          .set('Accept', 'application/json')
          .send({})
          .expect(422);
      }
    );
  }
);

describe('PUT /api/portfolio',
  () => {
    it('should create the given portfolio',
      async () => {
        await request(app)
          .put('/api/portfolio')
          .set('Accept', 'application/json')
          .send({name: 'new b'})
          .expect(200)
          .then(
            (response) => {
              expect(response.body).not.toBeNull();
              expect(response.body).not.toBeUndefined();
              expect(response.body.id).toEqual('21');
              expect(response.body.name).toEqual('new b');
            }
          );
      }
    );

    it('should fail for no portfolio name',
      async () => {
        await request(app)
          .put('/api/portfolio')
          .set('Accept', 'application/json')
          .send({})
          .expect(422);
      }
    );
  }
);

describe('PUT /api/portfolio/:id/transaction',
  () => {
    it('should add the transaction to the given portfolio',
      async () => {
        await request(app)
          .put('/api/portfolio/b/transaction')
          .set('Accept', 'application/json')
          .send(
            {
              name: 'new b',
              transactionType: 'SELL',
              cryptoCurrencyId: 'ABC',
              numberOfUnits: 52.34,
              transactionValue: 9999.2426253,
              transactionCost: 12098.32,
              transactionDate: new Date()
            }
          )
          .expect(200)
          .then(
            (response) => {
              expect(response.body).not.toBeNull();
              expect(response.body).not.toBeUndefined();
              expect(response.body.id).toEqual('b');
              expect(response.body.name).toEqual('Test b');
              expect(response.body.transactions.length).toEqual(1);
              expect(response.body.transactions[0].id).toEqual('b.32');
              expect(response.body.transactions[0].portfolioId).toEqual('b');
              expect(response.body.transactions[0].transactionType).toEqual('SELL');
              expect(response.body.transactions[0].cryptoCurrencyId).toEqual('ABC');
              expect(response.body.transactions[0].numberOfUnits).toEqual(52.34);
              expect(response.body.transactions[0].transactionValue).toEqual(9999.2426253);
              expect(response.body.transactions[0].transactionCost).toEqual(12098.32);
            }
          );
      }
    );

    it('should fail for non existing portfolio',
      async () => {
        await request(app)
          .put('/api/portfolio/fakebob/transaction')
          .set('Accept', 'application/json')
          .send({name: 'new b'})
          .expect(404);
      }
    );
  }
);