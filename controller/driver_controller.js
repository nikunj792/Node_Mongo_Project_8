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
    }
};