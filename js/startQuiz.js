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
    var i = 0;
    SDK.startQuiz((err, question) => {
        var $table = $(".table");
        if (err) throw err;

        var questions = JSON.parse(question);
        while (i < questions.length) {

            var question = (questions[i].question);
            loadOptions(question);

            function loadOptions(question) {
                SDK.loadOptions(questions[i].questionId, (err, option) => {
                    let z = 0;
                    let options = JSON.parse(option);
                    $(".table").append(`<h2>${question}</h2>`);
                    var optionLength = options.length;
                    for (var k = 0; k < optionLength; k++) {
                        //Use the option to find the questionId
                        let optionsToQId= options[k].optionToQuestionId;
                        //Use the questionId as a group unique group for radiobuttons, so grouping is possible
                        //For every question there will be added unique radiobuttons
                        $(".table").append(`<fieldset id="group${optionsToQId}"><p><input type="radio" name="group${optionsToQId}"<br>  ${options[k].option} </p></fieldset>`);
                    }
                });
                i++;
                $("#submit").click(() => {
                    console.log("hey");
                    var amountCorrect = 0;
                    for (var i = 0; i <= questions.length; i++) {
                        var radios = document.getElementsByName('group' + i);
                        console.log(radios);


                        SDK.loadOptions(questions[i].questionId, (err, data) => {
                            var options = JSON.parse(data);

                            for (var j = 0; j < radios.length; j++) {

                                var radio = radios[j];
                                if (radio.value === options.isCorrect  && radio.checked) {
                                    amountCorrect++;
                                    //Kan ikek få fat på options.isCorrect.
                                }
                            }
                        });
                        console.log("Antal korrekte svar: " + amountCorrect);
                    }
                });
            }
        }
    });
});


