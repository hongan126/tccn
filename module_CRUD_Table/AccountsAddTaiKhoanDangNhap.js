exports.addAcc = function (res, taiKhoan, matKhau) {
    var AWS = require("aws-sdk");
    var dateTime = require('node-datetime');

    var config = require("../module_API_RESTful/ConfigAWS");
    config.configAWS();

    var docClient = new AWS.DynamoDB.DocumentClient();

    var table = "Accounts";

    var taiKhoanThuChi = [
        {
            "soTienBanDau": 0,
            "soTienConLai": 0,
            "tenTaiKhoan": "Ví"
        },
        {
            "soTienBanDau": 0,
            "soTienConLai": 0,
            "tenTaiKhoan": "ATM"
        }
    ];

    var params = {
        TableName: table,
        Item: {
            "taiKhoan": taiKhoan,
            "info": {
                "matKhau": matKhau,
                "taiKhoanThuChi": taiKhoanThuChi
            }
        }
    };

    console.log("Adding a new Accounts...");
    docClient.put(params, function (err, data) {
        if (err) {
            console.error("Unable to add Account. Error JSON:", JSON.stringify(err, null, 2));
            res.end(JSON.stringify(err, null, 2));
        } else {
            console.log("Added:" + taiKhoan, JSON.stringify(data, null, 2));
            res.writeHead(302, {
                'Location': 'login'
            });
            return res.end();
        }
    });
}