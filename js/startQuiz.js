$(document).ready(() => {

    const chosenQuiz = SDK.Storage.load("chosenQuiz");

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
                    let options = JSON.parse(option);
                    //randomize options
                    options = shuffle(options);

                    $(".table").append(`<h2>${question}</h2>`);
                    var optionLength = options.length;

                    for (var k = 0; k < optionLength; k++) {
                        //Use the option to find the questionId
                        let optionsToQId= options[k].optionToQuestionId;
                        //Use the questionId as a group unique group for radiobuttons, so grouping is possible
                        //For every question there will be added unique radiobuttons
                        $(".table").append(`<fieldset id="group${optionsToQId}"><p><input type="radio" name="group${optionsToQId}" class="answer-radio" value="${options[k].isCorrect}"> ${options[k].option} </p></fieldset>`);
                    }
                });

            }
            i++;
        }
        // husk at ændre
        $("#submit").click(() => {

            let Answers = 0;
            let correctAnswers = 0;

            $(".answer-radio").each(function () {
                if ($(this).is(":checked")) {
                    Answers++;
                    if ($(this).val() == 1) {
                        correctAnswers++;
                    }
                }
            });

            //Shows modal and score
            $('#submitModal').modal('show');
            $("#result").append(`<p>You got <b>${correctAnswers}</b> out of <b>${Answers}</b> questions correct.</p>`);

            $("#closeBtn").on("click", () => {
                $("#result").html("");
                $('#submitModal').modal('hide');
            });

            //Listener on resultBtn
            $("#resultBtn").on("click", () => {
                $('#resultModal').modal('show');
                //appends question to resultDIV
                questions.forEach((question) => {
                    $('#resultDIV').append(`<div id=res${question.questionId}><p><b>${question.question}</b></p></div>`);
                    //appends correct option to question
                    SDK.loadOptions(question.questionId, (err, data) => {
                        var options = JSON.parse(data);
                        for(let i = 0; i < options.length; i++) {
                            if(options[i].isCorrect==1) {
                                $(`#res${question.questionId}`).append(`<p>Correct answer: ${options[i].option} </p>`);
                            }
                        }
                    });
                });

                //closes the modal
                $("#closeResBtn").on("click", () => {
                    $("#resultDIV").html("");
                    $('#resultModal').modal('hide');
                });
            });

        });

    });
    //Function shuffles array options
    //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

});



