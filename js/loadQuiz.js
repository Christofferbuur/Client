$(document).ready(() => {


    /*
    $(document).ready(() => {
        SDK.loadQuizzes((err, quiz) => {
            var quiz = JSON.parse(quiz.decrypt());
            console.log(quiz);
        });
    });
    */


SDK.loadQuizzes((err, quiz) => {
    if (err) throw err;

    $("#tablehead").append("<thead>\n" +
        "            <th>Quiz Title</th>\n" +
        "            <th>Quiz Description</th>\n" +
        "            <th>Created by</th>\n" +

        "            </thead>")

    const course = SDK.Storage.load("chosenCourse")
    var quizzes = JSON.parse(quiz);
    var $quizTableBody = $("#quizTableBody");

        $.each(quizzes, function (i, val) {
    var tr = '<tr>';
    tr += '<td>' + quizzes[i].quizDescription + '</td>';
            tr += '<td>' + quizzes[i].quizTitle +'</td>';

            tr += '<td>' + quizzes[i].createdBy + '</td>';tr += '<td><button class="quizButton btn btn-primary pull-left" data-key="' + (i) + '">Take quiz!</button></td>';
    tr += '</tr>';
    i + 1;
    $quizTableBody.append(tr);
});
});


});