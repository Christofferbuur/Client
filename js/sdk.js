const SDK = {

    //server URL
    serverURL: "http://localhost:8080/api",

    request: (options, callback) => {

        let headers = {};
        if (options.headers) {
            Object.keys(options.headers).forEach((h) => {
                headers[h] = (typeof options.headers[h] === 'object') ? JSON.stringify(options.headers[h]) : options.headers[h];
            });
        }
        //Asynchronous call to server
        $.ajax({
            url: SDK.serverURL + options.url,
            method: options.method,
            headers: headers,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(SDK.encrypt(JSON.stringify(options.data))),
            success: (data, status, xhr) => {
                callback(null, SDK.decrypt(data), status, xhr);
            },
            error: (xhr, status, errorThrown) => {
                callback({xhr: xhr, status: status, error: errorThrown});
            }
        });

    },

    //request for signup
    signup: (username, password, callback) => {
        SDK.request({
            data: {
                username: username,
                password: password
            },
            url: "/user/signup",
            method: "POST"
        }, (err, data) => {
            if (err) return callback(err);

            callback(null, data);
        });
    },

    //request for login
    login: (username, password, callback) => {
        SDK.request({
            data:
                {
                    username: username,
                    password: password
                }, url: "/user/login",
            method: "POST"
        }, (err, data) => {
            if (err) return callback(err);
            console.log(data)

            SDK.Storage.persist("Token", data);

            callback(null, data);
        });
    },


//Storage function
    Storage:
        {
            prefix: "DøkQuizSDK",
            //saving in local storage
            persist:
                (key, value) => {
                    window.localStorage.setItem(SDK.Storage.prefix + key, (typeof value === 'object') ? JSON.stringify(value) : value)
                },

            //method for loading data fra local storage
            load:
                (key) => {
                    const val = window.localStorage.getItem(SDK.Storage.prefix + key);
                    try {
                        return JSON.parse(val);
                    }
                    catch (e) {
                        return val;
                    }
                },
            //method for removing data from local storage
            remove: (key) => {
                window.localStorage.removeItem(SDK.Storage.prefix + key);
            }

        },

    //request to load current user
    loadCurrentUser: (callback) => {
        SDK.request({
            method: "GET",
            url: "/user/myuser",
            headers: {
                authorization: SDK.Storage.load("Token"),
            },
        }, (err, user) => {
            if (err) return callback(err);

            SDK.Storage.persist("myUser", user);

            callback(null, user);
        });

    },

//method to return current user
    currentUser: () => {
        const loadedUser = SDK.Storage.load("myUser");
        return loadedUser.currentUser;
    },

    //request to logout
    logOut: (userId, cb) => {
        SDK.request({
            method: "POST",
            url: "/user/logout",
            data: userId,
        }, (err, data) => {
            if (err) return cb(err);

            cb(null, data);
        });

    },

    //method to load quizzes
    loadQuizzes: (cb) => {
        const chosenCourse = SDK.Storage.load("chosenCourse");
        const courseId = chosenCourse.courseId;

        SDK.request({
            method: "GET",
            url: "/quiz/" + courseId,
            headers: {
                authorization: SDK.Storage.load("Token"),
            },
        }, (err, quiz) => {
            if (err) return cb(err);
            cb(null, quiz)
        });
    },
//method to load courses
    loadCourses: (cb) => {
        SDK.request({
            method: "GET",
            url: "/course",
            headers: {
                authorization: SDK.Storage.load("Token"),
            },
        }, (err, course) => {
            if (err) return cb(err);
            cb(null, course)

        });
    },

    //loading options
    loadOptions: (questionId, cb) => {
        SDK.request({
            method: "GET",
            url: "/option/" + questionId,
            headers: {
                authorization: SDK.Storage.load("Token")
            },
        }, (err, option) => {
            if (err) return cb(err);
            cb(null, option);
        });
    },

//create a quiz
    createQuiz: (createdBy, quizTitle, quizDescription, courseId, questionCount, cb) => {
        SDK.request({
            data: {
                createdBy: createdBy,
                quizTitle: quizTitle,
                quizDescription: quizDescription,
                courseId: courseId,
                questionCount: questionCount,
            },
            url: "/quiz/",
            method: "POST",
            headers: {
                authorization: SDK.Storage.load("Token"),
            }
        }, (err, data) => {
            if (err) return cb(err);
            cb(null, data);
        });
    },

    //delete a quiz
    deleteQuiz: (cb) => {
        const chosenQuiz = SDK.Storage.load("chosenQuiz")
        const quizId = chosenQuiz.quizId;
        console.log(quizId);
        SDK.request({
            method: "DELETE",
            url: "/quiz/" + quizId,
            headers: {
                authorization: SDK.Storage.load("Token")
            },
        }, (err, data) => {
            if (err) return cb(err);
            cb(null, data)
        });

    },
//method to start a quiz
    startQuiz: (cb) => {
        const chosenQuiz = SDK.Storage.load("chosenQuiz");
        const quizId = chosenQuiz.quizId;

        SDK.request({
            method: "GET",
            url: "/question/" + quizId,
            headers: {
                authorization: SDK.Storage.load("Token"),
            },
        }, (err, quiz) => {
            if (err) return cb(err);
            cb(null, quiz)
        });
    },

    //create a question
    createQuestion: (question, quizId, callback) => {
        console.log(question);
        console.log(quizId);

        SDK.request({
            data: {
                question: question,
                questionToQuizId: quizId
            },
            method: "POST",
            url: "/question",
            headers: {
                authorization: SDK.Storage.load("Token"),
            }
        }, (err, data) => {
            if (err) return callback(err);
            callback(null, data);
        })
    },

    //method for creating a option
    createOption: (option, optionToQuestionId, isCorrect, cb) => {
        SDK.request({
            data: {
                option: option,
                optionToQuestionId: optionToQuestionId,
                isCorrect: isCorrect
            },
            method: "POST",
            url: "/option",
            headers: {
                authorization: SDK.Storage.load("Token"),
            }
        }, (err, data) => {
            if (err) return cb(err);
            cb(null, data);
        })
    },


//encrypts data to server
    encrypt: (encrypt) => {
        if (encrypt !== undefined && encrypt.length !== 0) {
            const key = ['L', 'Y', 'N'];
            let isEncrypted = "";
            for (let i = 0; i < encrypt.length; i++) {
                isEncrypted += (String.fromCharCode((encrypt.charAt(i)).charCodeAt(0) ^ (key[i % key.length]).charCodeAt(0)))
            }
            return isEncrypted;
        } else {
            return encrypt;
        }
    },
//decrypts data from server
    decrypt: (decrypt) => {
        if (decrypt !== undefined && decrypt.length !== 0) {
            const key = ['L', 'Y', 'N'];
            let isDecrypted = "";
            for (let i = 0; i < decrypt.length; i++) {
                isDecrypted += (String.fromCharCode((decrypt.charAt(i)).charCodeAt(0) ^ (key[i % key.length]).charCodeAt(0)))
            }
            return isDecrypted;
        } else {
            return decrypt;
        }
    },
};

