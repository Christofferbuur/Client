$(document).ready(() => {

//reacts on login click
$("#login").on("click", () => {
    $('#loginModal').modal('show');
});

//reacts on sign_up click
$("#sign_up").on("click", () => {
    $('#signupModal').modal('show');
});

    //reacts on click and hides modal
   $("#LoginReturn_button").click(() => {

       $("#username").val("");
       $("#password").val("");
       $('#loginModal').modal('hide');
   });
    //reacts on click and hides modal
    $("#signupReturn_button").click(() => {

        $("#usernameInput").val("");
        $("#passwordInput").val("");
        $("#passwordValidationInput").val("");
        $('#signupModal').modal('hide');

    });

    //for some reason the underneath cannot stand in the upper clickhandler
    //reacts on click
    $("#login_button").click(() => {

        //saves input
        const username = $("#username").val();
        const password = $("#password").val();

        SDK.login(username, password, (err, data) => {
            //verifies that the above input is not empty
            if (!username || !password) {
                window.alert("Brugernavn eller kode er ikke skrevet");
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
                                window.location.href="user.html";
                            }
                        });
                    }
                    ;
                });
            }
        });
    });

    //listener on create button
    $("#create_button").on("click", () => {

        //creates constants with value from user input
        const usernameInput = $("#usernameInput").val();
        const passwordInput = $("#passwordInput").val();
        const passwordValidationInput = $("#passwordValidationInput").val();
        //checks for input
        if(!usernameInput || !passwordInput || !passwordValidationInput) {
            alert("Brugernavn og kodeord er ikke skrevet ind. Prøv igen");
        } else {
            //verifies password match
            if(passwordInput.valueOf() === passwordValidationInput.valueOf()) {
                SDK.signup(usernameInput, passwordInput, (err, data) => {
                    if (err && err.xhr.status == 400) {
                        console.log("Klient fejl");
                    }
                    else if (err) {
                        console.log("Fejl");
                    } else {
                        //clears text-boxes and shows login modal
                        $("#usernameInput").val("");
                        $("#passwordInput").val("");
                        $("#passwordValidationInput").val("");

                        $("#signupModal").hide();
                        $('#loginModal').modal('show');
                    }
                });
            } else {
                alert("kodeordet matcher ikke. Prøv igen");
            }
         }
    });
});
