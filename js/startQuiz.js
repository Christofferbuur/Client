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

    //$(".header").html(`<h1 align="center">${chosenQuiz.quizTitle}</h1>`);

    // $(".header").html(`<h2 align="center">${chosenQuiz.quizDescription}</h2>`);


    //  SDK.startQuiz((err, question) => {
    //     const questions = JSON.parse(question);
    i = 0;
    SDK.startQuiz((err, question) => {
        var $table = $(".table");
        if (err) throw err;

        var questions = JSON.parse(question);
        while (i < questions.length) {
            var question = (questions[i].question);

            loadOptions(question);

            function loadOptions(question) {
                SDK.loadOptions(questions[i].questionId, (err, data) => {
                    $(".table").append(`<h2 align="center">${question}</h2>`);

                    var options = JSON.parse(data);
                    var optionLenght = options.length;

                    for (var k = 0; k < optionLenght; k++) {
                        $(".table").append(`<h3>${options[k].option}</h3>`);
                    }
                });
                i++;
            }
        }
    });
});


