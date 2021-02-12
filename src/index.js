var ajaxService = new AjaxService;
let sessionStorage = window.sessionStorage;

function init() {
    if (document.getElementById("loginBtn")) {
        document.getElementById("loginBtn").addEventListener("click", signIn);
    }
    document.getElementById("logOutBtn").addEventListener("click", logout);
 
    ajaxService = new AjaxService();
    checkLogin();
}

function checkLogin() {
    let logged_user = JSON.parse(sessionStorage.getItem("user"));
    if (logged_user !== null) {
        document.getElementById("loginPanel").style.display = "none";
        document.getElementById("appPanel").style.display = "block";
        document.getElementById("logOutBtn").style.display = "block";
        document.getElementById("header").innerHTML = "Lista newsów";
        showNewsList();
    }
}

function signIn() {
    ajaxService.post({
        url: "http://127.0.0.1:8088/auth/login",
        data: {
            login: document.getElementById("login").value,
            password: document.getElementById("password").value
        },
        success: function (response) {
            if (response.logged === true) {
                showUserDetails(response.user);
            } else {
                showMessage(response.message);
            }
        }
    });
}

function logout() {
    sessionStorage.removeItem("user");
    document.getElementById("loginPanel").style.display = "block";
    document.getElementById("appPanel").style.display = "none";
    document.getElementById("header").innerHTML = "Logowanie";
    document.getElementById("addNewNewsBtn").style.display = "none";
}

function showUserDetails(login) {
    ajaxService.get({
        url: `http://127.0.0.1:8088/userDetails/${login}`,
        data: {
            login: login
        },
        success: function (response) {
            sessionStorage.setItem("user", JSON.stringify(response));
            document.getElementById("loginPanel").style.display = "none";
            document.getElementById("appPanel").style.display = "block";
            document.getElementById("logOutBtn").style.display = "block";
            document.getElementById("header").innerHTML = "Lista newsów";
            document.getElementById("addNewNewsBtn").style.display = "block";
        }
    });
    showNewsList();
}

function showNewsList() {
    ajaxService.get({
        url: `http://127.0.0.1:8088/news/list`,
        success: function (response) {
            response.forEach(news => {
                document.getElementById("content").innerHTML += '<div class="row" id="news-'+news.id+'">'+
                        '<div class="col-2">'+
                            '<img src="'+news.img+'">'+
                        '</div>'+
                        '<div class="col-8">'+
                            '<h5>'+news.title+'</h5>'+
                            '<h6>'+news.header + ' - ' + news.author+'</h6><br>'+
                            '<span>'+news.content+'</span>'+
                        '</div>'+
                        '<div class="col-2">'+
                            '<a href="#" class="btn btn-warning" data-toggle="modal" data-target="#newsEditModal-'+news.id+'">Edytuj newsa</a>'+
                            '<a href="#" class="btn btn-danger" data-toggle="modal" data-target="#newsModal-'+news.id+'">Usuń newsa</a>'+
                        '</div>'+
                        '<div style="display:none;" class="col-12" id="news-'+news.id+'-comments"></div>'+
                    '</div>'+

                    
                    '<div class="modal fade" id="newsModal-'+news.id+'" tabindex="-1" aria-labelledby="newsModalLabel-'+news.id+'" aria-hidden="true">'+
                        '<div class="modal-dialog">'+
                            '<div class="modal-content">'+
                                '<div class="modal-header">'+
                                '<h3 class="modal-title" id="newsModalLabel-'+news.id+'">Usuwanie...</h3>'+
                                '<button type="button" class="btn-close" data-dismiss="modal" aria-label="Close">X</button>'+
                                '</div>'+
                                '<div class="modal-body">'+
                                    '<span>Czy jesteś pewny że chcesz usunąć tego newsa?</span>'+
                                '</div>'+
                                '<div class="modal-footer">'+
                                    '<button type="button" class="btn btn-default" data-dismiss="modal">Anuluj</button>'+
                                    '<button type="button" news-id="'+news.id+'" class="btn btn-danger deleteCloseModal">Usuń</button>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+


                    '<div class="modal fade" id="newsEditModal-'+news.id+'" tabindex="-1" aria-labelledby="newsEditModalLabel-'+news.id+'" aria-hidden="true">'+
                        '<div class="modal-dialog">'+
                            '<div class="modal-content">'+
                                '<div class="modal-header">'+
                                '<h3 class="modal-title" id="newsEditModalLabel-'+news.id+'">Edytowanie newsa - '+news.title+'</h3>'+
                                '<button type="button" class="btn-close" data-dismiss="modal" aria-label="Close">X</button>'+
                                '</div>'+
                                '<div class="modal-body">'+
                                    '<form>'+
                                    '<div class="form-group">'+
                                        '<label for="title"><strong>Tytuł</strong></label>'+
                                        '<input type="text" class="form-control" placeholder="Podaj tytuł" name="title-'+news.id+'" value="'+news.title+'" required>'+
                                    '</div>'+
                                    '<div class="form-group">'+
                                        '<label for="header"><strong>Header</strong></label>'+
                                        '<input type="text" class="form-control" placeholder="Podaj header" name="header-'+news.id+'" value="'+news.header+'" required>'+
                                    '</div>'+
                                    '<div class="form-group">'+
                                        '<label for="content"><strong>Treść</strong></label>'+
                                        '<input type="text" class="form-control" placeholder="Podaj treść" name="content-'+news.id+'" value="'+news.content+'" required> '+
                                    '</div>'+
                                    '<div class="form-group">'+
                                    '<label for="author"><strong>Autor</strong></label>'+
                                        '<input type="text" class="form-control" placeholder="Podaj autora" name="author-'+news.id+'" value="'+news.author+'" required> '+
                                    '</div>'+
                                    '<div class="form-group">'+
                                        '<label for="img"><strong>Zdjęcie</strong></label>'+
                                        '<input type="text" class="form-control" placeholder="Podaj ścieżkę do zdjęcia(np. gifs/nazwa.jpg)" name="img-'+news.id+'" value="'+news.img+'" > '+
                                    '</div>'+
                                '</form>'+
                                '</div>'+
                                '<div class="modal-footer">'+
                                    '<button type="button" class="btn btn-default" data-dismiss="modal">Anuluj</button>'+
                                    '<button type="button" news-id="'+news.id+'" class="btn btn-warning editCloseModal">Edytuj</button>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'
                    ;
                    getCommentsForNews(news);
            });
        }
    });

}

function getCommentsForNews(news) {
    ajaxService.get({
        url: `http://127.0.0.1:8088/news/commentsList/${news.id}`,
        success: function (response) {
            response.forEach(comment => {
                document.getElementById('news-'+news.id+'-comments').style.display = "block";
                document.getElementById('news-'+news.id+'-comments').innerHTML += '<div class="col-10 comment" id="news-'+news.id+'-comment-'+comment.id+'">'+
                '<h5>Author: '+comment.author+'</h5>'+
                '<span>'+
                comment.content+
                '</span>'+
                '</div>';
            });
        }
    });
}

function deleteNews(news) {
    ajaxService.delete({
        url: `http://127.0.0.1:8088/news/remove/${news}`,
        success: function (response) {
            console.log('Usunięto newsa: '+news);
        }
    });
}

function addNews(payload) {
    ajaxService.post({
        url: "http://127.0.0.1:8088/news/add",
        data: {
            "title": payload.title,
            "header": payload.header,
            "content": payload.content,
            "author": payload.author,
            "img": payload.img
        },
        success: function (response) {
            if (response.message === 'News created.') {
                location.reload();
            }
        }
    });
}

function editNews(payload) {
    ajaxService.post({
        url: "http://127.0.0.1:8088/news/modifyNews",
        data: {
            "id": payload.id,
            "title": payload.title,
            "header": payload.header,
            "content": payload.content,
            "author": payload.author,
            "img": payload.img
        },
        success: function (response) {
            if (response.message === 'News updated.') {
                location.reload();
            }
        }
    });
}

function showMessage(message) {
    document.getElementById("message").textContent = message;
}

document.addEventListener("DOMContentLoaded", init);

$(function () {
    $('.deleteCloseModal').on('click', function (event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        let news_id = event.target.getAttribute("news-id");
        deleteNews(news_id);
        location.reload();
    });
    $('.editCloseModal').on('click', function (event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        console.log(event);
        //let news_id = event.target.getAttribute("news-id");
        // let title = $('input[name="title'+news_id+'"]').val();
        // let header = $('input[name="header'+news_id+'"]').val();
        // let content = $('input[name="content'+news_id+'"]').val();
        // let author = $('input[name="author'+news_id+'"]').val();
        // let img = $('input[name="img'+news_id+'"]').val();
        // console.log(title);
        // console.log(header);
        // console.log(content);
        // console.log(author);
        // console.log(img);
        // let payload = {
        //     "id": news_id,
        //     "title": title,
        //     "header": header,
        //     "content": content,
        //     "author": author,
        //     "img": img
        // };
        // if (img === '') {
        //     payload.img = 'gifs/n.png';
        // }
        //editNews(payload);
        //location.reload();
    });

    $('#newsAdd').on('click', function (event) {
        let title = $('input[name="title"]').val();
        let header = $('input[name="header"]').val();
        let content = $('input[name="content"]').val();
        let author = $('input[name="author"]').val();
        let img = $('input[name="img"]').val();
        if (title !== '' && header !== '' && content !== '' && author !== '') {
            let payload = {
                "title": title,
                "header": header,
                "content": content,
                "author": author,
                "img": img
            };
            if (img === '') {
                payload.img = 'gifs/n.png';
            }

            addNews(payload);
        }
    });
});