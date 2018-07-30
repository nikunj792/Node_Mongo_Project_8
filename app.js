const express = require('express');
const route = require('./routes/route');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const isUndefined = require('lodash/isUndefined');
const app = express();

mongoose.Promise = global.Promise;
//Running only when Running Test command.
console.log('Environment Variable is ', process.env.NODE_ENV);

if(isUndefined(process.env.NODE_ENV)){
    mongoose.connect('mongodb://localhost/muber');
}
//This MiddleWare for giving the body in the POST Request.
//app.use is used to register any middleware.
app.use(bodyParser.json());
//For Routing the different Request.
route(app);
//This MiddleWare for Handling any issue in Response.
app.use((err, req, res, next)=>{
    res.status(422).send({ error: err.message });
});

module.exports = app;


//Watch for Incomin grequest fo method GET.
// to the route http://localhost:3000/api.