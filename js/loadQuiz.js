$(document).ready(() => {
    SDK.loadCourses((err, course) => {
        var courses = JSON.parse(course);
        console.log(courses);
    });
});


