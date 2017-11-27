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

            console.log(selectCourse);

            for(k = 0; k < courses.length; k++) {
                if(selectCourse == courses[k].courseTitle) {
                    var courseId = courses[k].courseId;
                    console.log(courseId);
                }
            }
            const createdBy = username;
            const quizTitle = $("#quizTitle").val();
            //window.location.href = "user.html";
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
