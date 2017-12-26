exports.addData = function (res, data) {
    var AWS = require("aws-sdk");
    var config = require("./ConfigAWS");
    config.configAWS();

    var docClient = new AWS.DynamoDB.DocumentClient();

    var taiKhoan = data.taiKhoan;
    var params = {
        TableName: "Accounts",
        Key: {
            "taiKhoan": taiKhoan
        }
    };

    var tenTaiKhoanThuChi = data.tenTaiKhoan;
    var soTienBanDau = data.soTienBanDau;

    console.log("---BEGIN---");
    docClient.get(params, function (err, data) {
        if (err) {
            console.error("1. Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("1. Get Accuont by taiKhoan succeeded:");
            console.log(" - List taiKhoanThuChi ban đầu: ", data.Item.taiKhoan + ": ");
            data.Item.info.taiKhoanThuChi.forEach(function (item) {
                console.log("   + " + item.tenTaiKhoan + " - số tiền ban đầu: " + item.soTienBanDau + " - số tiền còn lại: " + item.soTienConLai);
            })
            var newTkThuChi = {
                "soTienBanDau": soTienBanDau,
                "soTienConLai": soTienBanDau,
                "tenTaiKhoan": tenTaiKhoanThuChi
            };

            //Them tai khoan thu chi vao list taiKhoanThuChi của Accounts
            data.Item.info.taiKhoanThuChi.push(newTkThuChi);

            var params = {
                TableName: "Accounts",
                Key: {
                    "taiKhoan": taiKhoan
                },
                UpdateExpression: "set info.taiKhoanThuChi = :val",
                ExpressionAttributeValues: {
                    ":val": data.Item.info.taiKhoanThuChi
                },
                ReturnValues: "UPDATED_NEW"
            };

            docClient.update(params, function (err, data) {
                if (err) {
                    console.error("2. Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                    res.end(JSON.stringify(err, null, 2));
                } else {
                    console.log("2. Update Add TaiKhoan ThuChi succeeded:", JSON.stringify(data, null, 2));
                    res.json(data);
                }
                console.log("---END---");
            });
        }
    });
}