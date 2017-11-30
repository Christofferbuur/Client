$(document).ready(() => {

    //SDK.User.loadNav();


//.click er et clickevent der er sat på login_button når der sker et event
    $("#return_button").click(() => {

        window.location.href = "index.html";

    });
//reacts on click
    $("#login_button").click(() => {
//saves input
        const username = $("#username").val();
        const password = $("#password").val();

        SDK.login(username, password, (err, data) => {
            //verifies that the above input is not empty
            if (!username || !password) {
                window.alert("Brugernavn eller kode er ikke skrevet. Prøv igen");
            } else {
                //Request to log in
                SDK.login(username, password, (err, data) => {
                    if (err && err.xhr.status === 401) {
                        window.alert("Forkert brugernavn eller kode");
                    } else if (err) {
                        window.alert('Error')
                    
                    } else {
                        //request to current user
                        SDK.loadCurrentUser((err, data) => {
                            if (err && err.xhr.status === 401) {
                                window.alert("Error")
                            } else if (data == null) {
                                window.alert("Forkert brugernavn eller kode");
                            } else {
                                //constant for user object to verify type
                                const user = SDK.currentUser();

                                if (user.type == 2) {
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

