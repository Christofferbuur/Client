const SDK = {
  //forbindelse til databasen
    serverURL: "http://localhost:8080/api",
    request: (options, cb) => {

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
            data: JSON.stringify(options.data),
            success: (data, status, xhr) => {
                cb(null, data, status, xhr);
            },
            error: (xhr, status, errorThrown) => {
                cb({xhr: xhr, status: status, error: errorThrown});
            }
        });



    login: (email, password, cb) => {
      //  SDK.request({
            console.log("Kalder funktion sdk")

        }
           data: {
                username: username,
                password: password
            },

            url: "/users/login?include=user",
            method: "POST"
        }, (err, data) => {

            //On login-error
            if (err) return cb(err);

            SDK.Storage.persist("tokenId", data.id);
            SDK.Storage.persist("userId", data.userId);
            SDK.Storage.persist("user", data.user);

            cb(null, data);

        });
