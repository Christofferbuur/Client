
//sets current users Id
const userId = SDK.currentUser().userId;

//reaction to click
$("#logoutButton").click(() => {
   // window.location.href = "index.html";
    //SDK request log out
    SDK.logOut(userId, (err, data) => {

        if(err && err.xhr.status === 401) {
            console.log("Error")
        } else {
//changes window and clears local storage
           window.location.href = "index.html";
            SDK.Storage.remove("myUser")
            SDK.Storage.remove("User")
            SDK.Storage.remove("Token")
            SDK.Storage.remove("chosenCourse")
            SDK.Storage.remove("chosenQuiz")


        }
    });

});

