$(document).ready(() => {
  /*  SDK.loadCourses((err, course) => {
        var courses = JSON.parse(course);
        console.log(courses);
    });*/


SDK.loadCourses((err, course) => {
    if (err) throw err;
    var courses = JSON.parse(course);

//saves html element in vaiable
    var $courseTableBody = $("#courseTableBody");

    $.each(courses, function (i) {
        var tr = '<tr>';
        tr += '<td >' + courses[i].courseTitle + '</td>';
        tr += '<td> <button class="courseButton btn btn-primary pull-left" data-key="' + (i + 1) + '">Se quiz</button></td>';
        tr += '</tr>';
        $courseTableBody.append(tr);

    });

    $('button.courseButton').on('click', function () {

       //definerer variabel name som den row der er tættest på, this, og tager teksten fra row 0
        var name = $(this).closest("tr").find("td:eq(0)").text();
        window.location.href = "loadQuiz.html";

        for (var i = 0; i < courses.length; i++) {
            if (name === courses[i].courseTitle) {
                SDK.Storage.persist("chosenCourse", courses[i])
            }
        }
    });
});
// if loop manages createQuiz option
    const user = SDK.currentUser();
    console.log(user.type)

    if (user.type === 2) {
        $('#createQuiz').hide();
    }

});