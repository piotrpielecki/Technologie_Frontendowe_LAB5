var request = require('request');

function Tests() {
	let host;
	host = "http://127.0.0.1:8088/";

	this.allUsersTest = function () {
		var data = {};
		request({
			url: `${host}allUsers`,
			method: "GET",
			json: true,
			body: data
		}, function (error, response, body) {
			console.log(body);
		});
	};

	this.newsList = function () {
		var data = {};
		request({
			url: `${host}news/list`,
			method: "GET",
			json: true,
			body: data
		}, function (error, response, body) {
			console.log(body);
		});
	};

	this.addNews = function () {
		var data = {
			title: "News title",
			header: "News header",
			content: "News content",
			author: "Jan Kowalski",
			img: "gifs/123.jpg"
		};

		request({
			url: `${host}news/add`,
			method: "POST",
			json: true,
			body: data
		}, function (error, response, body) {
			console.log(body);
		});
	};

	this.modifyNews = function () {
		var data = {
			id: 2,
			title: "News title update",
			header: "News header update",
			content: "News content update",
			img: "gifs/123update.jpg"
		};

		request({
			url: `${host}news/modify`,
			method: "POST",
			json: true,
			body: data
		}, function (error, response, body) {
			console.log(body);
		});
	};

	this.removeNews = function () {
		request({
			url: `${host}news/remove/1`,
			method: "DELETE",
			json: true,
		}, function (error, response, body) {
			console.log(body);
		});
	};

	this.commentsList = function () {
		var data = {};
		request({
			url: `${host}news/commentsList/17`,
			method: "GET",
			json: true,
			body: data
		}, function (error, response, body) {
			console.log(body);
		});
	};

	this.addComment = function () {
		var data = {
			content: "Comment content",
			author: "Jan Kowalski",
			newsId: "0"
		};

		request({
			url: `${host}comments/add`,
			method: "POST",
			json: true,
			body: data
		}, function (error, response, body) {
			console.log(body);
		});
	};

	this.removeComment = function () {
		request({
			url: `${host}comments/remove/1`,
			method: "DELETE",
			json: true,
		}, function (error, response, body) {
			console.log(body);
		});
	};
}

function main() {
	let args = process.argv.slice(2);
	let testName = args[0];

	let tests = new Tests();

	if (typeof tests[testName] === "function") {
		console.log(`Test ${testName}.`);
		tests[testName](args);
	} else {
		throw new Error(`Test ${testName} not found`);
	}
}

main();
