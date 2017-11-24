$(document).ready(() => {


    //Logger ind
    $("#logoutButton").click(() => {
        //SDK request til serveren om at logge ud
        SDK.logOut(userId, (err, data) => {

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

SDK.loadQuizzes((err, quiz) => {
    if (err) throw err;

    $("#tablehead").append("<thead>\n" +
        "            <th>Quiz Title</th>\n" +
        "            <th>Quiz Description</th>\n" +
        "            <th>Created by</th>\n" +

        "            </thead>")

    var quizzes = JSON.parse(quiz);
    var $quizTableBody = $("#quizTableBody");

        $.each(quizzes, function (i, val) {
    var tr = '<tr>';
    tr += '<td>' + quizzes[i].quizTitle + '</td>';
            tr += '<td>' + quizzes[i].quizDescription +'</td>';
            tr += '<td>' + quizzes[i].createdBy + '</td>';tr += '<td><button class="quizButton btn btn-primary pull-left" data-key="' + (i) + '">Take quiz!</button></td>';
    tr += '</tr>';
    i + 1;
    $quizTableBody.append(tr);
});
    $('button.quizButton').on('click', function () {
        console.log("1")
        var name = $(this).closest("tr").find("td:eq(0)").text();
        console.log("2")

        for (var i = 0; i < quizzes.length; i++) {
            console.log("3")

            if (name === quizzes[i].quizTitle) {
                SDK.Storage.persist("chosenQuiz", quizzes[i]);
                console.log("6")

                window.location.href = "startQuiz.html";

            }
        }
    });

});


});