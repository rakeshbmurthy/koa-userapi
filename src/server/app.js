import koa from 'koa';
import convert from 'koa-convert';
import body from 'koa-better-body';
import mongoose from 'mongoose';
import es6Promise from 'es6-promise';
import passport from 'koa-passport';
import authApi from './routes/auth';
import api from './routes/users';

mongoose.Promise = es6Promise.Promise;
try {
    mongoose.connect('mongodb://localhost/userApi2'); //- starting a db connection
}catch(err) {
    mongoose.createConnection('mongodb://localhost/userApi2'); //- starting a db connection
}

const app = new koa(); //- initialize app

//- Middlewares

app.use(convert(body({
    multipart: true,
})));

require('./service/passport');
app.use(convert(passport.initialize()));
app.use(api.middleware());
app.use(authApi.middleware());

export default app;
