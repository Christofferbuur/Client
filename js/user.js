$(document).ready(() => {

//Logger ind
    $("#logoutButton").click(() => {
        //SDK request to server logging out
        SDK.logOut(userId, (err, data) => {

            if (err && err.xhr.status === 401) {
                console.log("Error")
            } else {
                //storage is cleared
                window.location.href = "index.html";
                SDK.Storage.remove("myUser")
                SDK.Storage.remove("User")
                SDK.Storage.remove("Token")
            }
        });
    });

const name = SDK.currentUser().username;
//Greetings to user
    $(".welcomeHeader").html(`<h1 align="center">Brugernavn: ${name}</h1>`);

    // if-loop manages createQuiz option
    const user = SDK.currentUser();
    console.log(user.type)

    if (user.type === 2) {
        $('#createQuiz').hide();
    }
});
