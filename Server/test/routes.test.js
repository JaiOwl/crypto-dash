import request from 'supertest';
import app from '../src/app.js';
import packageJson from './../package.json';

describe('GET /', 
  () => {
    it('should render properly', 
      async () => {
        await request(app).get('/').expect(200);
      }
    );
  }
);

describe('GET /api/version', 
  () => {
    it('should return the service name and version', 
      async () => {
        await request(app)
          .get('/api/version')
          .set('Accept', 'application/json')
          .expect(200)
          .then(
            (response) => {
              expect(response.body).not.toBeNull();
              expect(response.body).not.toBeUndefined();
              expect(response.body.service).toEqual(`${packageJson.name}`);
              expect(response.body.version).toEqual(`${packageJson.version}`);
            }
          );
      }
    );
  }
);

describe('GET /404', 
  () => {
    it('should return 404 for non-existent URLs', 
      async () => {
        await request(app).get('/404').expect(404);
        await request(app).get('/notfound').expect(404);
      }
    );
  }
);
