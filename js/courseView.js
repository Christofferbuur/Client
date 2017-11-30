$(document).ready(() => {

//Request to load courses
SDK.loadCourses((err, course) => {
    if (err) throw err;
    var courses = JSON.parse(course);

//saves html element in vaiable
    var $courseTableBody = $("#courseTableBody");

//for each loop prints all courses
    $.each(courses, function (i) {
        var tr = '<tr>';
        tr += '<td >' + courses[i].courseTitle + '</td>';
        tr += '<td> <button class="courseButton btn btn-primary pull-left" data-key="' + (i + 1) + '">Se quiz</button></td>';
        tr += '</tr>';
        //appends table to courseTableBody
        $courseTableBody.append(tr);
    });

    $('button.courseButton').on('click', function () {

        //defines variable, name, as the row closest, and takes the text from row 0
        var name = $(this).closest("tr").find("td:eq(0)").text();
        window.location.href = "loadQuiz.html";

        //for-loop persists the chosen course
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