$(document).ready(() => {

    //request to load quizzes
SDK.loadQuizzes((err, quiz) => {
    if (err) throw err;

    $("#tablehead").append("<thead>\n" +
        "            <th>Quiz titel</th>\n" +
        "            <th>Quiz beskrivelse</th>\n" +
        "            <th>Oprettet af</th>\n" +
        "            <th></th>\n" +
        "            <th></th>\n" +

        "            </thead>")

    var quizzes = JSON.parse(quiz);
    var $quizTableBody = $("#quizTableBody");

    //current user
    const user = SDK.currentUser();
    const userType = user.type;
    // if loop manages currentuser
//includes delete button and appends to HTML
    if (userType === 1) {
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

    //deletes quiz the 0 value name of the table
    $('button.deleteButton').on('click', function () {
        var name = $(this).closest("tr").find("td:eq(0)").text();

        for (var i = 0; i < quizzes.length; i++) {
            if (name === quizzes[i].quizTitle) {
                SDK.Storage.persist("chosenQuiz", quizzes[i]);
                console.log(quizzes[i]);
            }
        };
        //request to delete quiz
        SDK.deleteQuiz((err, data) => {
            location.reload();
        })
    });
});


});