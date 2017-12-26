var http = require('http');
var url = require('url');
var uploadfile = require('./module_CRUD_Table/upload-file-s3');
var fs = require('fs');
var path = require('path')
var multer = require('multer')
var multiparty = require('multiparty');
var login_module = require('./module_CRUD_Table/login_module');
var signup_module = require('./module_CRUD_Table/AccountsAddTaiKhoanDangNhap');
var change_pass_module = require('./module_CRUD_Table/AccountsUpdatePassword');
var api = require('./module_API_RESTful/server-api');

var AWS = require("aws-sdk");
AWS.config.update({
    region: "us-east-2",
    endpoint: "dynamodb.us-east-2.amazonaws.com",
    accessKeyId : "AKIAIROGLNBW44Y4CFHA",
    secretAccessKey : "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"
});

var imageUrl = 'empty';
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads')
    }
});

api.run();

http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var pathname = q.pathname;
    var qsub = q.query;
    //Lấy email từ cookie của client
    var cookie = '';
    var email = '';
    if (req.headers.cookie) {
        cookie = req.headers.cookie.split(/=|;| /);
        for (var i = 0; i < cookie.length; i++) {
            if (cookie[i] === 'email') {
                email = cookie[i + 1];
            }
        }
    }

    if (pathname == "/") {
        if (email) {
            res.writeHead(302, {
                'Location': 'da-ghi'
            });
            return res.end();
        }
        else {
            res.writeHead(302, {
                'Location': 'login'
            });
            return res.end();
        }
    }
    else if (pathname == "/login" && req.method === "GET") {
        if (email) {
            res.writeHead(302, {
                'Location': 'da-ghi'
            });
            return res.end();
        }
        else {
            fs.readFile("./html/login.html", function (err, data) {
                if (err) {
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    return res.end("404 Not Found");
                }
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            });
        }
    }
    else if (pathname == "/login" && req.method === "POST") {
        var form = new multiparty.Form();
        form.parse(req, function (err, fields, files) {
            console.log(fields['email'][0] + " - " + fields['password'][0]);
            login_module.login(res, fields['email'][0], fields['password'][0]);

            // res.writeHead(200, {
            //     'Set-Cookie': 'email=' + fields['email'][0],
            //     'Content-Type': 'text/plain'
            // });
        });
    }
    else if (pathname == "/logout") {
        res.writeHead(302, {
            'Set-Cookie': 'email=' + '',
            'Location': 'login'
        });
        return res.end();
    }
    else if (pathname == "/signup" && req.method === "GET") {
        if (email) {
            res.writeHead(302, {
                'Location': 'da-ghi'
            });
            return res.end();
        }
        else {
            fs.readFile("./html/signup.html", function (err, data) {
                if (err) {
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    return res.end("404 Not Found");
                }
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            });
        }
    }
    else if (pathname == "/signup" && req.method === "POST") {
        if (email) {
            res.writeHead(302, {
                'Location': 'da-ghi'
            });
            return res.end();
        }
        else {
            var form = new multiparty.Form();
            form.parse(req, function (err, fields, files) {
                console.log(fields['email'][0] + " - " + fields['password'][0]);
                signup_module.addAcc(res, fields['email'][0], fields['password'][0]);
            });
        }
    }
    else if (pathname == "/da-ghi") {
        if (!email) {
            res.writeHead(302, {
                'Location': 'login'
            });
            return res.end();
        }
        fs.readFile("./html/da-ghi.html", function (err, data) {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                return res.end("404 Not Found");
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    }
    else if (pathname == "/bao-cao" && req.method === "GET") {
        if (!email) {
            res.writeHead(302, {
                'Location': 'login'
            });
            return res.end();
        }
        fs.readFile("./html/bao-cao.html", function (err, data) {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                return res.end("404 Not Found");
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    }
    else if (pathname == "/ghi-chep" && req.method === "GET") {
        if (!email) {
            res.writeHead(302, {
                'Location': 'login'
            });
            return res.end();
        }
        fs.readFile("./html/ghi-chep.html", function (err, data) {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                return res.end("404 Not Found");
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    }
    else if (pathname == "/ghi-chep" && req.method === "POST") {
        if (!email) {
            res.writeHead(302, {
                'Location': 'login'
            });
            return res.end();
        }

        var upload = multer({
            storage: storage
        }).single('image-file');
        upload(req, res, function (err) {
            // console.log(req);
            // console.log(fields);
            // res.end('done');
            setTimeout(function () {
                uploadfile.s3(req, res, email);
            }, 3000);

        });
    }
    else if (pathname == "/tai-khoan" && req.method === "GET") {
        if (!email) {
            res.writeHead(302, {
                'Location': 'login'
            });
            return res.end();
        }
        fs.readFile("./html/tai-khoan.html", function (err, data) {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                return res.end("404 Not Found");
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    }
    else if (pathname == "/change-pass" && req.method === "GET") {
        if (!email) {
            res.writeHead(302, {
                'Location': 'login'
            });
            return res.end();
        }
        fs.readFile("./html/change-pass.html", function (err, data) {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                return res.end("404 Not Found");
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    }
    else if (pathname == "/change-pass" && req.method === "POST") {
        if (!email) {
            res.writeHead(302, {
                'Location': 'login'
            });
            return res.end();
        }
        else {
            var form = new multiparty.Form();
            form.parse(req, function (err, fields, files) {
                console.log("pass send from client: " + fields['password'][0]);
                change_pass_module.changePass(res, email.toString(), fields['password'][0])
                // res.writeHead(200, {
                //     'Set-Cookie': 'email=' + fields['email'][0],
                //     'Content-Type': 'text/plain'
                // });
            });
        }

        // fs.readFile("./html/change-pass.html", function (err, data) {
        //     if (err) {
        //         res.writeHead(404, {'Content-Type': 'text/html'});
        //         return res.end("404 Not Found");
        //     }
        //     res.writeHead(200, {'Content-Type': 'text/html'});
        //     res.write(data);
        //     return res.end();
        // });
    }



//Begin - Lược bỏ
    else if (pathname == "/hang-muc-chi" && req.method === "GET") {
        fs.readFile("./html/hang-muc-chi.html", function (err, data) {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                return res.end("404 Not Found");
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    }
    else if (pathname == "/hang-muc-thu" && req.method === "GET") {
        fs.readFile("./html/hang-muc-thu.html", function (err, data) {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                return res.end("404 Not Found");
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    }
    else if (pathname == "/thu-chi-dinh-ky" && req.method === "GET") {
        fs.readFile("./html/thu-chi-dinh-ky.html", function (err, data) {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                return res.end("404 Not Found");
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    }
//End - lược bỏ
    else {
        fs.readFile('./' + req.url, function (err, data) {
            if (!err) {
                var dotoffset = req.url.lastIndexOf('.');
                var mimetype = dotoffset == -1
                    ? 'text/plain'
                    : {
                        '.html': 'text/html',
                        '.ico': 'image/x-icon',
                        '.jpg': 'image/jpeg',
                        '.png': 'image/png',
                        '.gif': 'image/gif',
                        '.css': 'text/css',
                        '.js': 'text/javascript'
                    }[req.url.substr(dotoffset)];
                res.setHeader('Content-type', mimetype);
                res.end(data);
                console.log(req.url, mimetype);
            } else {
                console.log('file not found: ' + req.url);
                res.writeHead(404, "Not Found");
                res.end();
            }
        });
    }
}).listen(8081);

// function parseCookies(request) {
//     var list = {},
//         rc = request.headers.cookie;
//
//     rc && rc.split(';').forEach(function (cookie) {
//         var parts = cookie.split('=');
//         list[parts.shift().trim()] = decodeURI(parts.join('='));
//     });
//
//     return list;
// }