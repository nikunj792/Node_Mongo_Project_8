const assert = require('assert');
const request = require('supertest');
const app = require('../app');

// SuperTest module will help to make 
//fake http call.
describe('The Express App',()=>{

    it('Method GET to /api',(done)=>{
        request(app)
        .get('/api')
        .end((err, response)=>{
            assert(response.body.key === 'Hello');
            done();
        });
    });
});