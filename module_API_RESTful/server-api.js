exports.run = function () {
    var express = require('express');
    var app = express();
    var fs = require("fs");
    var bodyParser = require('body-parser');
// parse application/json
    var cors = require('cors');
    app.use(cors());
    app.use(bodyParser.json());

    var nhatKyGetAllByUsername = require('./NhatKyGetAllByUsername');
    var nhatKyGetById = require('./NhatKyGetById');
    var nhatKyRemoveItem = require('./NhatKyRemoveItem');
    var nhatKyAddItem = require('./NhatKyAdd');
    var accGetAllTkThuChi = require('./AccountsGetAllTaiKhoanThuChi');
    var accDeleteTkThuChi = require('./AccountsRemoveTaiKhoanThuChi');
    var accAddTkThuChi = require('./AccountsAddTaiKhoanThuChi');
    var baoCao = require('./BaoCao');

//Nhật ký đã ghi
    app.get("/nhat-ky-thu-chi/:email", cors(), function (req, res) {
        var taiKhoan = req.params.email;
        nhatKyGetAllByUsername.getData(res, taiKhoan);
    });

    app.get("/nhat-ky-thu-chi/:email/:id", cors(), function (req, res) {
        var taiKhoan = req.params.email;
        var id = req.params.id;
        nhatKyGetById.getData(res, taiKhoan, id);
    });

    app.delete("/nhat-ky-thu-chi/remove/:email/:id", cors(), function (req, res) {
        var taiKhoan = req.params.email;
        var id = req.params.id;
        nhatKyRemoveItem.removeData(res, taiKhoan, id);
    });

    app.post('/nhat-ky-thu-chi/add', cors(), function (req, res) {
        var data = req.body;
        console.log(req.body);
        nhatKyAddItem.addData(res, data);
    });

//Tài khoản thu chi
    app.get("/tai-khoan-thu-chi/:email", cors(), function (req, res) {
        var taiKhoan = req.params.email;
        accGetAllTkThuChi.getData(res, taiKhoan);
    });

    app.delete("/tai-khoan-thu-chi/remove/:email/:tenTaiKhoan", cors(), function (req, res) {
        var taiKhoan = req.params.email;
        var tenTaiKhoan = req.params.tenTaiKhoan;
        accDeleteTkThuChi.removeData(res, taiKhoan, tenTaiKhoan);
    });

    app.post('/tai-khoan-thu-chi/add', cors(), function (req, res) {
        var data = req.body;
        console.log(req.body);
        accAddTkThuChi.addData(res, data);
    });

    app.get("/bao-cao/:email", cors(), function (req, res) {
        var taiKhoan = req.params.email;
        baoCao.getData(res, taiKhoan);
    });

// app.get('/:id', function (req, res) {
//     // First read existing users.
//     fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
//         var users = JSON.parse( data );
//         var user = users["user" + req.params.id]
//         console.log( user );
//         res.end( JSON.stringify(user));
//     });
// })
//
// app.post('/addUser', function (req, res) {
//     // First read existing users.
//     fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
//         data = JSON.parse( data );
//         data["user4"] = user["user4"];
//         console.log( data );
//         res.end( JSON.stringify(data));
//     });
// })
//
// app.delete('/deleteUser/:id', function (req, res) {
//
//     // First read existing users.
//     fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
//         data = JSON.parse( data );
//         delete data["user" + req.params.id];
//
//         console.log( data );
//         res.end( JSON.stringify(data));
//     });
// })

    var server = app.listen(8088, function () {

        var host = server.address().address
        var port = server.address().port
        console.log("Example app listening at http://%s:%s", host, port)

    });
}