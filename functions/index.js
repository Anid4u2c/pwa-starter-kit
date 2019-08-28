const functions = require('firebase-functions');
const prpl = require('prpl-server');
const express = require('express');
const rendertron = require('rendertron-middleware');

const app = express();

const rendertronMiddleware = rendertron.makeMiddleware({
    proxyUrl: 'https://render-tron.appspot.com/render',
    injectShadyDom: true,
});

app.use((req, res, next) => {
    //SEE:  https://gist.github.com/Dabolus/314bd939959ebe68f57f1dcebe120a7e#gistcomment-2883514
    req.headers['host'] = `${process.env.GCLOUD_PROJECT}.firebaseapp.com`;
return rendertronMiddleware(req, res, next);
});

app.get('/*', prpl.makeHandler('./build', require('./build/polymer.json')));

exports.app = functions.https.onRequest(app);