exports.changePass = function (res, taiKhoan, newPass) {
    var AWS = require("aws-sdk");
    var config = require("../module_API_RESTful/ConfigAWS");
    config.configAWS(AWS);

    var docClient = new AWS.DynamoDB.DocumentClient()

    // var taiKhoan = "hongan126@gmail.com";
    // var newPass = "87654321";

    var params = {
        TableName: "Accounts",
        Key: {
            "taiKhoan": taiKhoan
        },
        UpdateExpression: "set info.matKhau = :valPass",
        ExpressionAttributeValues: {
            ":valPass": newPass
        },
        ReturnValues: "UPDATED_NEW"
    };

    docClient.update(params, function (err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
            res.writeHead(502, {
                'error': 'Lỗi server',
                'Location': 'change-pass'
            });
            return res.end();
        } else {
            console.log("Update Mat Khau succeeded: " + taiKhoan, JSON.stringify(data, null, 2));
            res.writeHead(302, {
                'Set-Cookie': 'email=' + '',
                'Location': 'login'
            });
            return res.end();
        }
    });
}