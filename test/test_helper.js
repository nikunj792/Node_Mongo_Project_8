const mongoose = require('mongoose');

before((done)=>{
mongoose.connect('mongodb://localhost/muber_test');
mongoose.connection
.once('open',()=>{
    console.log('connection is successfyl');
    done();})
.on('error', err=>{
    done();
    });
});

beforeEach((done)=>{
    // const {drivers} = mongoose.connection.collections;
    mongoose.connection.collections.drivers.drop()
            .then(()=> drivers.ensureIndex({'geometry.coordinates': '2dsphere'}))
            .then(()=> done())
            .catch(()=>done());
});