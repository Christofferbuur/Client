

    //SDK.User.loadNav();


//.click er et clickevent der er sat på login_button når der sker et event
    $("#return_button").click(() => {

        window.location.href = "index.html";

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

