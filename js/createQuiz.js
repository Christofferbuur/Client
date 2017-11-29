$(document).ready(() => {


    var $selectCourse = $("#selectCourse");

    SDK.loadCourses((err, courseToChoose) => {
        if (err) throw err;

        var courses = JSON.parse(courseToChoose);


        $.each(courses, function (i) {
            var option = '<option>';
            option += '<a href="#">' + courses[i].courseTitle + '</a>';
            option += '</option>';
            $selectCourse.append(option);

        });

        $("#create_button").on("click", () => {
            const username = SDK.currentUser().username;
            var courses = JSON.parse(courseToChoose);

            var selectCourse = $("#selectCourse").val();

            for(k = 0; k < courses.length; k++) {
                if(selectCourse == courses[k].courseTitle) {
                    var courseId = courses[k].courseId;
                }
            }
            const createdBy = username;
            const quizTitle = $("#quizTitle").val();
            const quizDescription = $("#quizDescription").val();
            const questionCount = 1;

            SDK.createQuiz(createdBy, quizTitle, quizDescription, courseId, questionCount, (err, data) => {

                $('#questionModal').modal('show');
                var createdQuiz = JSON.parse(data);
                const quizId = createdQuiz.quizId;

                var i = 1;
                $(".modal-title").html(`<h1>${i}. Question</h1>`);


                $("#addQuestionBtn").click(() => {
                    const createdQuestion = $("#question").val();

                    if(!createdQuestion) {
                        alert("Information is missing. Please try again");
                    }else {
                        console.log(createdQuestion);
                        SDK.createQuestion(createdQuestion, quizId, (err, data) => {
                            if (err && err.xhr.status === 400) {
                                console.log("client fail")
                            }
                             else {
                                $("#question").val("");

                                const newQuestion = JSON.parse(data);
                                const optionToQuestionId = newQuestion.questionId;
                                const correct = $("#correct").val();
                                const wrong1 = $("#wrong1").val();
                                const wrong2 = $("#wrong2").val();
                                const wrong3 = $("#wrong3").val();

                                if (!correct || !wrong1 || !wrong2 || !wrong3) {
                                    alert("Information is missing. Please try again");
                                } else {

                                    $(".modal-title").html(`<h1>${++i}. question</h1>`);

                                    var isCorrect = 1;
                                    SDK.createOption(correct, optionToQuestionId, isCorrect, (err, data) => {
                                        console.log("1")

                                        console.log(data);
                                        if (err && err.xhr.status === 400) {
                                            console.log("client fail")
                                        }
                                        else if (err) {
                                            console.log("Error")
                                        } else {
                                            $("#correct").val("")

                                            SDK.createOption(wrong1, optionToQuestionId, isCorrect = 0, (err, data) => {
                                                console.log("2")

                                                if (err && err.xhr.status === 400) {
                                                    console.log("client fail")
                                                }
                                                else if (err) {
                                                    console.log("Error")
                                                } else {
                                                    $("#wrong1").val("");

                                                    SDK.createOption(wrong2, optionToQuestionId, isCorrect = 0, (err, data) => {
                                                        console.log("3")

                                                        if (err && err.xhr.status === 400) {
                                                            console.log("client fail")
                                                        }
                                                        else if (err) {
                                                            console.log("Error")
                                                        } else {
                                                            $("#wrong2").val("");

                                                            SDK.createOption(wrong3, optionToQuestionId, isCorrect = 0, (err, data) => {
                                                                console.log("4")

                                                                if (err && err.xhr.status === 400) {
                                                                    console.log("client fail")
                                                                }
                                                                else if (err) {
                                                                    console.log("Error")
                                                                } else {
                                                                    $("#wrong3").val("");
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            }
                        });
                    }
                });
                $("#saveQuizBtn").click(() => {
                    if (window.confirm("Is this quiz done?")) {
                        window.location.href = "admin.html"
                    }
            });
        });
    });
});
    $("#return_button").on("click", () => {
        window.location.href = "user.html";
    });





});
/*

    var courseToChoose = JSON.parse(courseToChoose);
    var courseLength = courseToChoose.length;
var i = 0;
        for (var k = 0; k < courseLength; k++) {

        }

            $(".table").append(`<p><input type="radio" name="option${question.questionId}"<br>  ${options[k].option} </p>`);
        }
        loadOptions(question);
        $(".table").append(`<h2>${question}</h2>`);

    });

        }
    }



*/

