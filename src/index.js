var ajaxService = new AjaxService;
let sessionStorage = window.sessionStorage;

function init() {
    document.getElementById("loginBtn").addEventListener("click", signIn);
    ajaxService = new AjaxService();
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
            document.getElementById("userDetails").textContent = `${response.name} ${response.surname}`;
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