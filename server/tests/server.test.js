import {
  ClientError,
  Informational,
  Redirection,
  ServerError,
  Success,
} from '../utils/httpStatusCodes';
import {
  deputies,
  populateDeputies,
  populateSenators,
  senators,
} from './seeds';

import { ObjectID } from 'mongodb';
import expect from 'expect';
import request from 'supertest';
import server from './../server';

describe('Server', () => {
  it('should validate server test configuration', () => {
    expect(true).toBeTruthy()
  });

  describe('GET /api/deputies', () => {
    beforeEach(populateDeputies);

    it('should return all deputies', (done) => {
      request(server)
        .get('/api/deputies')
        .expect(Success.OK)
        .end((error, response) => {
          if (error) {
            return done(error);
          }
          expect(response.body).toEqual(deputies);
          done();
        });
    });
  });

  describe('GET /api/deputies/:_id', () => {
    it('should return the required deputy by _id', (done) => {
      request(server)
        .get(`/api/deputies/${deputies[1]._id}`)
        .expect(Success.OK)
        .end((error, response) => {
          if (error) {
            return done(error);
          }
          expect(response.body.name).toBe(deputies[1].name);
          done();
        });
    });

    it('should return NOT FOUND if deputy is not found', (done) => {
      let validButInexistentId = new ObjectID();
      request(server)
        .get(`/api/deputies/${validButInexistentId}`)
        .expect(ClientError.NotFound)
        .end(done);
    })

    it('should return BAD REQUEST if invalid _id is provided', (done) => {
      let invalidId = 'abc123';

      request(server)
        .get(`/api/deputies/${invalidId}`)
        .expect(ClientError.BadRequest)
        .end(done);
    })
  });

  describe('Senators', () => {
    beforeEach(populateSenators);

    describe('GET /api/senators', () => {
      it('should return all senators', (done) => {
        request(server)
          .get('/api/senators')
          .expect(Success.OK)
          .end((error, response) => {
            if (error) {
              return done(error);
            }
            expect(response.body).toEqual(senators);
            done();
          });
      });
    });

    describe('GET /api/senators/:_id', () => {
      it('should return the required senator by _id', (done) => {
        request(server)
          .get(`/api/senators/${senators[1]._id}`)
          .expect(Success.OK)
          .end((error, response) => {
            if (error) {
              return done(error);
            }
            expect(response.body.name).toBe(senators[1].name);
            done();
          });
      });

      it('should return NOT FOUND if senator is not found', (done) => {
        let validButInexistentId = new ObjectID();

        request(server)
          .get(`/api/senators/${validButInexistentId}`)
          .expect(ClientError.NotFound)
          .end(done);
      })

      it('should return BAD REQUEST if invalid _id is provided', (done) => {
        let invalidId = 'abc123';

        request(server)
          .get(`/api/senators/${invalidId}`)
          .expect(ClientError.BadRequest)
          .end(done);
      })
    });
  });
});
