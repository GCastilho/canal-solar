import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';
const proxy = require('express-http-proxy');

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

express()
	.use(
		proxy('https://canalsolar.com.br', {
			filter: req => req.path.includes('index.php')
			|| req.path.includes('/images')
			|| req.path.includes('/templates')
			|| req.path.includes('/plugins')
			|| req.path.includes('/components')
			|| req.path.includes('/media')
		}),
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
