$(document).ready(() => {

    //SDK.User.loadNav();


//.click er et clickevent der er sat på login_button når der sker et event
    $("#return_button").click(() => {

        window.location.href = "index.html";

    });

    $("#login_button").click(() => {

        const username = $("#username").val();
        const password = $("#password").val();

        //Du logger ind to gange, hvorfor databasen får tokens, kæmpe fejl.
        //1
        SDK.login(username, password, (err, data) => {
            debugger
            if (!username || !password) {
                window.alert("Brugernavn eller kode er ikke skrevet. Prøv igen");
            } else {
                //2
                SDK.login(username, password, (err, data) => {
                    if (err && err.xhr.status === 401) {
                        window.alert("Forkert brugernavn eller kode");
                    } else if (err) {
                        window.alert('Error')
                    
                    } else {
                        SDK.loadCurrentUser((err, data) => {
                            if (err && err.xhr.status === 401) {
                                window.alert("Error")
                            } else if (data == null) {
                                window.alert("Forkert brugernavn eller kode");
                            } else {
                                const user = SDK.currentUser();
                                console.log(user.type)

                                if (user.type == 2) {
                                    console.log("User")
                                 window.location.href="user.html";

                                } else {
                                    window.location.href="admin.html";
                                }
                            }
                        });
                    }
                    ;


                });

            }
        });
    });
});
/*const username = $("#inputUsername").val();
const password = $("#inputPassword").val();

SDK.User.login(email, password, (err, data) => {
    if (err && err.xhr.status === 401) {
        $(".form-group").addClass("has-error");
    }
    else if (err) {
        console.log("BAd stuff happened")
    } else {
        window.location.href = "my-page.html";
    }
});*/

