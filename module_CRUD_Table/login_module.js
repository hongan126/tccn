exports.login = function (res, username, password) {
    var AWS = require("aws-sdk");
    var fs = require('fs');
    var cookies = require("../html_scripts/cookies");

    AWS.config.update({
        region: "us-east-2",
        endpoint: "dynamodb.us-east-2.amazonaws.com",
        accessKeyId : "AKIAIROGLNBW44Y4CFHA",
        secretAccessKey : "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"
    });

    var docClient = new AWS.DynamoDB.DocumentClient();

    var params = {
        TableName: "Accounts",
        ProjectionExpression: "#tk, info.matKhau",
        KeyConditionExpression: "#tk = :taik",
        ExpressionAttributeNames: {
            "#tk": "taiKhoan"
        },
        ExpressionAttributeValues: {
            ":taik": username
        }
    };

    docClient.query(params, function (err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded.");
            data.Items.forEach(function (item) {
                console.log(" -", item.taiKhoan + ": " + item.info.matKhau);
                if (password == item.info.matKhau) {
                    // res.writeHead(200, {'Content-Type': 'text/html'});
                    // res.write("Đăng nhập thành công tài khoản: " + username.toString());
                    // return res.end();
                    res.writeHead(301,
                        {
                            Location: 'http://localhost:8081/da-ghi',
                            'Set-Cookie': 'email=' + username,
                            'Content-Type': 'text/html'
                        }
                    );
                    res.end();
                }
                else {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write("Sai tài khoản hoặc mật khẩu!");
                    return res.end();
                }
            });

        }
    });
}