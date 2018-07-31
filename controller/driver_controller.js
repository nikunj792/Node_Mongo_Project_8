const Driver = require('../models/driver');

module.exports = {
    greeting (req,res){
        res.send({key:'Hello'});
    },
    create(req, res, next){ 
        const props = req.body;
        Driver.create(props)
            .then(driver => res.send(driver))
            .catch(next);
        
    },
    edit(req, res, next){
       const driverId = req.params.id;
       const props = req.body;
       Driver.findByIdAndUpdate({_id: driverId},props)
            .then(()=> Diver.findById({_id: driverId}))
            .then((driver)=> res.send(driver))
            .catch(next);
    },
    delete(req, res, next){
        const driverId = req.params.id;
        Driver.findByIdAndRemove({_id: driverId})
            .then((driver)=> res.status(204).send(driver))
            .catch(next);
    },
    index(req, res, next){
        const {lng, lat } = req.query;
        Driver.geoNear(
            { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
            {spherical : true, maxDistance: 200000 }
        ).then((drivers)=>res.send(drivers))
        .catch(next);

    }
};