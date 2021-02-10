const express = require('express');
var cors = require('cors');
const app = express();
const api = require('./NewsApiService');
app.use(express.json());
app.use(cors());
const port = 8088;

let users = {
	admin: {password: "123456", name: "Admin", surname: "Admin"},
	jan: {password: "jan1234", name: "Jan", surname: "Kowalski"},
	anna: {password: "anna1234", name: "Anna", surname: "Nowak"}
};

let newsApiService = new api.NewsApiService();

app.post('/auth/login', cors(), (request, response) => {
	response.header("Access-Control-Allow-Origin", "*");
	let login = request.body.login;
	let password = request.body.password;
	
	if (!users[login]) {
		response.json({logged: false, message: `User not exists ${login}.`});
		return null;
	} else {
		if (users[login].password != password) {
			response.json({logged: false, message: `Password is not valid.`});
		} else {
			response.json({logged: true, message: `User login success ${login}.`});
		}
	}
});

app.get('/userDetails/:login', cors(), function (request, response) {
	response.header("Access-Control-Allow-Origin", "*");
	let login = request.params.login;
	let data = users[login];
	response.status(200).send(data);
});

app.get('/allUsers', cors(), function (request, response) {
	response.header("Access-Control-Allow-Origin", "*");
	response.status(200).send(users);
});

app.get('/news/list', cors(), function (request, response) {
	response.header("Access-Control-Allow-Origin", "*");
	let res = newsApiService.getNewsList();
	console.log(`RESPONCE getNewsList ${JSON.stringify(res)};`);
	response.status(200).send(res);
});

app.post('/news/add', cors(), function (request, response) {
	console.log(`REQUEST addNews ${JSON.stringify(request.body)};`);
	response.header("Access-Control-Allow-Origin", "*");
	let res = newsApiService.addNews(request.body);
	console.log(`RESPONCE addNews ${JSON.stringify(res)};`);
	response.status(200).send(res);
});

app.post('/news/modify', cors(), function (request, response) {
	console.log(`REQUEST modifyNews ${JSON.stringify(request.body)};`);
	response.header("Access-Control-Allow-Origin", "*");
	let res = newsApiService.modifyNews(request.body);
	console.log(`RESPONCE modifyNews ${JSON.stringify(res)};`);
	response.status(200).send(res);
});

app.delete('/news/remove/:id', cors(), function (request, response) {
	response.header("Access-Control-Allow-Origin", "*");
	console.log(`REQUEST removeNews ${request.params.id};`);

	let res = newsApiService.removeNews(request.params.id);
	console.log(`RESPONCE removeNews ${JSON.stringify(res)};`);
	response.status(200).send(res);
});

app.get('/news/commentsList/:id', cors(), function (request, response) {
	response.header("Access-Control-Allow-Origin", "*");
	console.log(`REQUEST commentsList ${request.params.id};`);

	let res = newsApiService.getNewsComments(request.params.id);
	console.log(`RESPONCE getNewsComments ${JSON.stringify(res)};`);
	response.status(200).send(res);
});

app.post('/comments/add', cors(), function (request, response) {
	console.log(`REQUEST addComment ${JSON.stringify(request.body)};`);
	response.header("Access-Control-Allow-Origin", "*");
	let res = newsApiService.addComment(request.body);
	console.log(`RESPONCE addComment ${JSON.stringify(res)};`);
	response.status(200).send(res);
});

app.delete('/comments/remove/:id', cors(), function (request, response) {
	response.header("Access-Control-Allow-Origin", "*");
	console.log(`REQUEST removeComment ${request.params.id};`);
	let res = newsApiService.removeComment(request.params.id);
	console.log(`RESPONCE removeComment ${JSON.stringify(res)};`);
	response.status(200).send(res);
});

app.listen(port, () => console.log(`NewsAPI server is working on port ${port}!`));