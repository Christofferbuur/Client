
    const SDK = {

    serverURL: "http://localhost:8080/api",

    request: (options, callback) => {

        let headers = {};
        if (options.headers) {
            Object.keys(options.headers).forEach((h) => {
                headers[h] = (typeof options.headers[h] === 'object') ? JSON.stringify(options.headers[h]) : options.headers[h];
            });
        }

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


//Taget direkte fra Jesper
    Storage:
        {
            prefix: "DøkQuizSDK",
            persist:
                (key, value) => {
                    window.localStorage.setItem(SDK.Storage.prefix + key, (typeof value === 'object') ? JSON.stringify(value) : value)
                },
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
            remove: (key) => {
                window.localStorage.removeItem(SDK.Storage.prefix + key);
            }

        },

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
//bruges i login

    currentUser: () => {
        const loadedUser = SDK.Storage.load("myUser");
        return loadedUser.currentUser;
    },

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

        loadOptions: (questionId, cb) => {
            SDK.request({
                method: "GET",
                url: "/option/" + questionId,
                headers: {
                    authorization: SDK.Storage.load("Token")
                },
            }, (err, option) => {
                if (err) return cb(err);
                cb(null, option)
            });
        },




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

