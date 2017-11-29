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

//funktionen findes ikke i SDK Arh Jeg slettede den jo .. 2 sek men wtf. Der stod den ikek blev brugt haha Eller vent.
SDK.loadCourses((err, course) => {
    if (err) throw err;
    var courses = JSON.parse(course);

    //gemmer html elementet # pga defineret ved id som courseTableBody
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