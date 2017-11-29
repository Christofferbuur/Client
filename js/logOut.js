
const userId = SDK.currentUser().userId;

//Logger ind
$("#logoutButton").click(() => {
   // window.location.href = "index.html";
    //SDK request til serveren om at logge ud
    SDK.logOut(userId, (err, data) => {

        if(err && err.xhr.status === 401) {
            console.log("Error")
        } else {
            //Token bliver fjernet fra db, samtidig med at man nulstiller localstorage.
            //Skifter samtidig vindue
            window.location.href = "index.html";
            SDK.Storage.remove("myUser")
            SDK.Storage.remove("User")
            SDK.Storage.remove("Token")
            SDK.Storage.remove("chosenCourse")
            SDK.Storage.remove("chosenQuiz")


        }
    });

});

