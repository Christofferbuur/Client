$(document).ready(() => {


    $("#logoutButton").click(() => {
        //SDK request til server to log out
        SDK.logOut(userId, (err, data) => {

            if (err && err.xhr.status === 401) {
                console.log("Error")
            } else {
                //clearing local storage
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

    const user = SDK.currentUser();
    console.log(user.type)
    // if loop manages currentuser
//includes delete button and appends to HTML
    if (user.type === 1) {
        $.each(quizzes, function (i, val) {
            var tr = '<tr>';
            tr += '<td>' + quizzes[i].quizTitle + '</td>';
            tr += '<td>' + quizzes[i].quizDescription +'</td>';
            tr += '<td>' + quizzes[i].createdBy + '</td>';
            tr += '<td><button class="quizButton btn btn-primary pull-left" data-key="' + (i) + '">Start quiz</button></td>';
            tr += '<td><button class="deleteButton btn btn-primary pull-left" data-key="' + (i) + '">Slet</button></td>';

            tr += '</tr>';
            i + 1;
            $quizTableBody.append(tr);
        });
        //Regular user does not have acces to delete button and appends to HTML
    }else {
        $.each(quizzes, function (i, val) {
            var tr = '<tr>';
            tr += '<td>' + quizzes[i].quizTitle + '</td>';
            tr += '<td>' + quizzes[i].quizDescription +'</td>';
            tr += '<td>' + quizzes[i].createdBy + '</td>';
            tr += '<td><button class="quizButton btn btn-primary pull-left" data-key="' + (i) + '">Start quiz</button></td>';

            tr += '</tr>';
            i + 1;
            $quizTableBody.append(tr);
        });
    }



//Takes the 0 value of the table, saves as name
    $('button.quizButton').on('click', function () {
        var name = $(this).closest("tr").find("td:eq(0)").text();

        for (var i = 0; i < quizzes.length; i++) {

            if (name === quizzes[i].quizTitle) {
                SDK.Storage.persist("chosenQuiz", quizzes[i]);

                window.location.href = "startQuiz.html";

            }
        }
    });

    //deletes the 0 value of the table
    $('button.deleteButton').on('click', function () {
        var name = $(this).closest("tr").find("td:eq(0)").text();

        for (var i = 0; i < quizzes.length; i++) {
            if (name === quizzes[i].quizTitle) {
                SDK.Storage.persist("chosenQuiz", quizzes[i]);
                console.log(quizzes[i]);
            }
        };
        SDK.deleteQuiz((err, data) => {
            location.reload();
        })
    });
});


});