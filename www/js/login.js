$(document).ready(() => {
    if(Cookies.get('token') != undefined)
        window.location.href = '/main.html';
    if(localStorage.getItem("api")!= null && sessionStorage.getItem("isOnline") == null){
        let api = atob(localStorage.getItem("api"));
        $.ajax({
            url: api+"api/ping",
            type: "GET",
            success: ()=>{
                $("#loginServer").val(api);
                sessionStorage.setItem("isOnline","true");
            }
        });
    }
    else
        $("#loginServer").val(window.location.protocol+"//"+window.location.hostname + ":8443/");

    $('#loginForm').on('submit',(event)=> {
        event.preventDefault();
        var data = {
            email: $('#loginEmail').val(),
            password: $('#loginPassword').val()
        };
        $.ajax({
            url: $("#loginServer").val() + 'api/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: (response) => {
                if(window.location.protocol == "http:")
                    Cookies.set('token',response.token, {expires: 7});
                else
                    Cookies.set('token',response.token, {expires: 7});
                localStorage.setItem("api", btoa($("#loginServer").val()));
                sessionStorage.removeItem("isOnline");
                localStorage.setItem("login", btoa($("#loginEmail").val()));
                window.location.href = '/main.html';
            },
            error: (error) => {
                console.log(error);
                $("#error-message").css("display","block");
                let reason = (error.statusText == "Unauthorized")?"Zły email lub hasło":"Serwer po tym adresem niedostępny (może zmień z https na http)"
                $("#error-message").html(reason)
            }
        });
    });
});
function validationOfPassword(password){
    const patern = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;
    return patern.test(password);
}