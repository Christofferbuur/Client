$(document).ready(() => {

const name = SDK.currentUser().username;
//Greetings to user
    $(".welcomeHeader").html(`<h1 align="center">Brugernavn: ${name}</h1>`);

    // if-loop manages createQuiz option
    const user = SDK.currentUser();
    console.log(user.type)

    if (user.type === 2) {
        $('#createQuiz').hide();
        $('#printAllQuizzes').hide();
    }
});
