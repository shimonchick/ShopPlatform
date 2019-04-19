import * as express from 'express'
import * as functions from 'firebase-functions';


const app = express();

app.get('/', (request, response) => {
	const a = request.query['a'];
	const b = request.query['b'];
	const c = a + b;
	response.send(c);
});

export const calculator = funcitons.https.onRequest(app);
