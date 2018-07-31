const assert = require('assert');
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Driver = mongoose.model('driver')

// SuperTest module will help to make 
//fake http call.
describe('Driver Controller',()=>{

    it('Test POST Call in Driver Controller to create a new Driver',(done)=>{
        Driver.count()
            .then(count =>{
                request(app)
                    .post('/api/drivers')
                    .send({ email :'test@test.com'})
                    .end(()=>{
                        Driver.count()
                            .then(newCount =>{                            
                                assert(count+1 === newCount);
                                done();
                            });
                });
            });      
    });

    it('Test PUt Call in Driver Collection to update the existing Driver',(done)=>{
        const driver = new Driver({ email: 't@gmail.com', driving: false});
        driver.save()
        .then(()=>{
            request(app)
            .put('/app/drivers/'+driver._id)
            .send({driving: true})
            .end(()=>{
                Driver.findOne({email:'t@gmail.com'})
                .then(driver=>{
                    assert(driver.driving === true);
                    done();
                });
            });
            done();
        });
    });

    it('Test Delete Call in Driver Collection to delete the existing Driver',(done)=>{
        const driver = new Driver({email:'1111@4543.com', driving: true});
        driver.save()
        .then(()=>{
            request(app)
            .delete('/api/drivers/'+ driver._id)
            .end(()=>{
                Driver.findOne({email: '1111@4543.com'})
                    .then(driver=>{
                        assert(driver ===null);
                        done();
                    })
            });
        });
        done();
    });

    it('Get to /api/drivers in a location',(done)=>{
        const driver1 = new Driver({
            email: 'test1@gmail.com',
            geometry:{type: 'Point', coordinate: [-122, 47]}
        });
        const driver2 = new Driver({
            email: 'test2@gmail.com',
            geometry:{type: 'Point', coordinate: [-80, 25]}
        });

        Promise.all([driver1, driver2])
        .then(driver=>{
            request(app)
                .get('/api/drivers?lng=-80&lat=25')
                .end((err, response)=>{
                    console.log('sdasdassa', response);
                    done();
                })
        });
        done();
    })
});