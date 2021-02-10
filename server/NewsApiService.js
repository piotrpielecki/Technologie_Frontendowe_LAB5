/**
 * NEWS API
 * @author Szymon Białas
 */

function NewsApiService() {

	let lastId = 0;
	let lastCId = 0;

	let newsList = [
		{ id: lastId, title: "The first news", header: "This is header!", content: "News news news news news...", img: "gifs/n.png", author: "Jan Kowalski" }
	];

	let commentsList = [
		{id: lastCId, content: "This is comment example", author: "John Brix", newsId: lastId}
	];

	this.getNewsList = function () {
		return newsList;
	};

	this.validateNews = function (news) {
		if (typeof news.title !== "string") {
			throw new Error("No news title.");
		}
		if (typeof news.header !== "string") {
			throw new Error("No news header.");
		}
		if (typeof news.content !== "string") {
			throw new Error("No news content.");
		}
		if (typeof news.author !== "string") {
			throw new Error("No news author.");
		}
	};

	this.validateComment = function (news) {
		if (typeof news.content !== "string") {
			throw new Error("No news content.");
		}
		if (typeof news.author !== "string") {
			throw new Error("No news author.");
		}
	};

	this.getNewsById = function (id) {
		let result = null;
		newsList.forEach(function (o) {
			if (o.id == id) {
				result = o;
			}
		});
		if (!result) {
			throw new Error("News not found.");
		}
		return result;
	};

	this.getCommentById = function (id) {
		let result = null;
		commentsList.forEach(function (o) {
			if (o.id == id) {
				result = o;
			}
		});
		if (!result) {
			throw new Error("Comment not found.");
		}
		return result;
	};

	this.addNews = function (news) {
		this.validateNews(news);
		let nextId = lastId + 1;
		newsList.push(news);
		news.id = nextId;
		lastId = nextId;
		return { id: nextId, message: "News created."};
	};

	this.modifyNews = function (news) {
		news.id = parseInt(news.id, 10);
		let data = this.getNewsById(news.id);
		data.title = news.title;
		data.header = news.header;
		data.content = news.content;
		data.img = news.img;
		return { id: news.id, message: "News updated."};
	};

	this.removeNews = function (id) {
		id = parseInt(id, 10);
		let data = this.getNewsById(id);
		newsList = newsList.filter(function(news) {
			return news.id != id;
		});
		return {id: data.id, message: "News removed."};
	};

	this.getNewsComments = function (id) { 
		id = parseInt(id, 10);
		let result = [];
		commentsList.forEach(function (o) {
			if (o.newsId == id) {
				result.push(o);
			}
		});
		return result;
	};

	this.addComment = function (comment) { 
		this.validateComment(comment);

		let newsId = parseInt(comment.newsId, 10);
		let data = this.getNewsById(newsId);

		let nextId = lastCId + 1;
		commentsList.push(comment);
		comment.id = nextId;
		comment.newsId = data.id;
		lastCId = nextId;
		return { id: nextId, message: "Comment created."};
	};

	this.removeComment = function (id) { 
		id = parseInt(id, 10);
		let data = this.getCommentById(id);
		commentsList = commentsList.filter(function(comment) {
			return comment.id != id;
		});
		return {id: data.id, message: "Comment removed."};
	};
}

module.exports.NewsApiService = NewsApiService;