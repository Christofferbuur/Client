$(document).ready(() => {


    var $selectCourse = $("#selectCourse");
//request to load courses
    SDK.loadCourses((err, courseToChoose) => {
        if (err) throw err;

        var courses = JSON.parse(courseToChoose);


        $.each(courses, function (i) {
            var option = '<option>';
            option += '<a href="#">' + courses[i].courseTitle + '</a>';
            option += '</option>';
            $selectCourse.append(option);

        });

        //listener to create button
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

            //request to create quiz
            SDK.createQuiz(createdBy, quizTitle, quizDescription, courseId, questionCount, (err, data) => {

                $('#questionModal').modal('show');
                var createdQuiz = JSON.parse(data);
                const quizId = createdQuiz.quizId;

                var i = 1;
                $(".modal-title").html(`<h1>${i}. Spørgsmål</h1>`);


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
                                const correctOption1 = $("#correctOption").val();
                                const wrongOption1 = $("#wrongOption1").val();
                                const wrongOption2 = $("#wrongOption2").val();
                                const wrongOption3 = $("#wrongOption3").val();

                                //checks for data
                                if (!correctOption1 || !wrongOption1 || !wrongOption2 || !wrongOption3) {
                                    alert("Information mangler");
                                } else {
                                    //header on modal
                                    $(".modal-title").html(`<h1>${++i}. spørgsmål</h1>`);

                                    var isCorrect = 1;
                                    SDK.createOption(correctOption1, optionToQuestionId, isCorrect, (err, data) => {
                                        if (err && err.xhr.status === 400) {
                                            console.log("client fail")
                                        }
                                        else if (err) {
                                            console.log("Error")
                                        } else {
                                            $("#correctOption").val("");
                                            //Request to create option
                                            SDK.createOption(wrongOption1, optionToQuestionId, isCorrect = 0, (err, data) => {

                                                if (err && err.xhr.status === 400) {
                                                    console.log("client fail")
                                                }
                                                else if (err) {
                                                    console.log("Error")
                                                } else {
                                                    $("#wrongOption1").val("");

                                                    SDK.createOption(wrongOption2, optionToQuestionId, isCorrect = 0, (err, data) => {

                                                        if (err && err.xhr.status === 400) {
                                                            console.log("client fail")
                                                        }
                                                        else if (err) {
                                                            console.log("Error")
                                                        } else {
                                                            $("#wrongOption2").val("");

                                                            SDK.createOption(wrongOption3, optionToQuestionId, isCorrect = 0, (err, data) => {

                                                                if (err && err.xhr.status === 400) {
                                                                    console.log("client fail")
                                                                }
                                                                else if (err) {
                                                                    console.log("Error")
                                                                } else {
                                                                    $("#wrongOption3").val("");
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
                //listener on save button
                $("#saveQuizBtn").click(() => {
                        window.location.href = "user.html"
            });
        });
    });
});
    //listener on return button
    $("#return_button").on("click", () => {
        window.location.href = "user.html";
    });
});


