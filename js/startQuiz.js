$(document).ready(() => {


    //Logger ind
    $("#logoutButton").click(() => {
        //SDK request til serveren om at logge ud
        SDK.logOut(userId, (err, data) => {

            if (err && err.xhr.status === 401) {
                console.log("Error")
            } else {
                //Token bliver fjernet fra db, samtidig med at man nulstiller localstorage.
                //Skifter samtidig vindue
                window.location.href = "index.html";
                SDK.Storage.remove("myUser")
                SDK.Storage.remove("User")
                SDK.Storage.remove("Token")
            }
        });

    });


    const chosenQuiz = SDK.Storage.load("chosenQuiz");

    $(".header").html(`<h1 align="center">${chosenQuiz.quizTitle}</h1>`);

    $(".header").html(`<h2 align="center">${chosenQuiz.quizDescription}</h2>`);


  //  SDK.startQuiz((err, question) => {
   //     const questions = JSON.parse(question);


    SDK.startQuiz((err, question) => {
        if (err) throw err;

        var questions = JSON.parse(question);
        var $quizTableBody = $("#questionTableBody");

        $.each(questions, function (i, val) {
            var tr = '<tr>';
            tr += '<td>' + questions[i].question + '</td>';
            tr += '</tr>';
            $quizTableBody.append(tr);
        });
    });

});

