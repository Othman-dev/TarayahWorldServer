const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const sendGrid = require('@sendgrid/mail');

const app = express();

const apiKey = process.env.SENDGRID_API_KEY

app.use(bodyParser.json());

app.use(cors());

app.use((req, res, next) => {
		res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Change later to only allow our server
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
		next();
});

app.get('/api', (req, res, next) => {
		res.send('API Status: Running')
});

app.post('/api/email', (req, res, next) => {

		sendGrid.setApiKey(apiKey);
		const msg = {
		to: 'stellaireperso@gmail.com',
		from: req.body.email,
		subject: req.body.subject,
		text: req.body.content + '\n' + req.body.name,
		};

		sendGrid.send(msg)
				.then(result => {
						console.log(res)
						res.status(200).json({
								success: true
						});
				})
				.catch(err => {
						res.status(401).json({
								success: false
						});
				});
});

//just for test
app.listen(3030, '0.0.0.0');
