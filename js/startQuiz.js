$(document).ready(() => {

    const chosenQuiz = SDK.Storage.load("chosenQuiz");

    var i = 0;
    SDK.startQuiz((err, question) => {
        var $table = $(".table");
        if (err) throw err;

        //creates question json object
        var questions = JSON.parse(question);
        //while loop run along the length of questions
        while (i < questions.length) {

            var question = (questions[i].question);
            //loads options to specific question
            loadOptions(question);

            function loadOptions(question) {
                //request to load options
                SDK.loadOptions(questions[i].questionId, (err, option) => {
                    let options = JSON.parse(option);
                    //randomize options
                    options = shuffle(options);

                    $(".table").append(`<h2>${question}</h2>`);
                    var optionLength = options.length;
                    //loads all options
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

            var answers = 0;
            var correctAnswers = 0;

            //answer radio declared earlier
            $(".answer-radio").each(function () {
                //checks if option is chosen
                if ($(this).is(":checked")) {

                    answers++;
                    if ($(this).val() == 1) {
                        correctAnswers++;
                        console.log("11111")
                    }
                }
            });

            //calculates score
            var score = ((answers / correctAnswers) * 100);
            //program crash if divided by 0
            if ( correctAnswers > 0){
                $("#resultPercent").append(`<p><b>${score} % korrekt</b> </p>`);
            }

            //Shows modal and score
            $('#submitModal').modal('show');
            $("#result").append(`<p> Du fik <b>${correctAnswers}</b> af <b>${answers}</b> svar korrekt.</p>`);

            $("#closeBtn").on("click", () => {
                $("#result").html("");
                $("#resultPercent").html("");

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

    // if-loop manages createQuiz option
    const user = SDK.currentUser();
    console.log(user.type)

    if (user.type === 2) {
        $('#createQuiz').hide();
        $('#printAllQuizzes').hide();
    }
});



