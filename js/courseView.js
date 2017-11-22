$(document).ready(() => {
  /*  SDK.loadCourses((err, course) => {
        var courses = JSON.parse(course);
        console.log(courses);
    });*/

    //Logger ind
    $("#logoutButton").click(() => {
        //SDK request til serveren om at logge ud
        SDK.logOut(SDK.Storage.currentUser(userID), (err, data) => {

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


SDK.loadCourses((err, course) => {
    if (err) throw err;
console.log("1")
    var courses = JSON.parse(course);

    console.log("2")

    //gemmer html elementet # pga defineret ved id som courseTableBody
    var $courseTableBody = $("#courseTableBody");
    console.log("3")

    $.each(courses, function (i) {
        var tr = '<tr>';
        tr += '<td >' + courses[i].courseTitle + '</td>';
        tr += '<td> <button class="courseButton btn btn-primary pull-left" data-key="' + (i + 1) + '">Se quiz</button></td>';
        tr += '</tr>';
        $courseTableBody.append(tr);
        console.log("4")

    });

    $('button.courseButton').on('click', function () {
        console.log("5")

       //definerer variabel name som den row der er tættest på, this, og tager teksten fra row 0
        var name = $(this).closest("tr").find("td:eq(0)").text();
        window.location.href = "loadQuiz.html";
        console.log("6")

        for (var i = 0; i < courses.length; i++) {
            if (name === courses[i].courseTitle) {
                SDK.Storage.persist("chosenCourse", courses[i])
            }
        }

    });


});

});