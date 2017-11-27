
$(document).ready(() => {
/*
    SDK.startQuiz((err, question) => {
        let questions = JSON.parse(question);
        console.log(questions.questionId);

        $("#submit").click(() => {
            console.log("hey")
            var amountCorrect = 0;
            for (var i = 0; i <= questions.length; i++) {
                var radios = document.getElementsByName('group' + i);

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
            alert("Antal korrekte svar: " + amountCorrect);
        }
        });
    });
    */
});
