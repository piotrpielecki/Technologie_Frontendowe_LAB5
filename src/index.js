var ajaxService = new AjaxService;
let sessionStorage = window.sessionStorage;

function init() {
    document.getElementById("loginBtn").addEventListener("click", signIn);
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
        if (window.location.pathname == "/Technologie_Frontendowe_LAB5/src/index.html") {
            showNews();
        }
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
        }
    });
    showNews();
}

function showNews() {
    ajaxService.get({
        url: `http://127.0.0.1:8088/news/list`,
        success: function (response) {
            response.forEach(element => {
                document.getElementById("content").innerHTML += '<div class="card float-left" style="width: 18rem; margin: 2rem;"><img class="card-img-top" src="'+element.img+'" alt="Card image cap"><div class="card-body"><h5 class="card-title">'+element.title+'</h5><h6 class="card-subtitle mb-2 text-muted">'+element.author+'</h6><p class="card-text">'+element.content+'</p><form action="news_show.html"><input type="hidden" value="'+element.id+'"></input><submit class="btn btn-primary">Pokaż newsa</submit></form></div></div>';
            });
        }
    });
}

function showMessage(message) {
    document.getElementById("message").textContent = message;
}

document.addEventListener("DOMContentLoaded", init);

function add(A, B) {
    ajaxService.post({
        url: "http://127.0.0.1:8088/",
        data: {
            
        },
        success: function (response) {
            console.log("success");
        }
    });
}

jQuery(function () {
    $("#submit").click(function () {

    });
})