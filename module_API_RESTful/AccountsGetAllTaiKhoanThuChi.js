exports.getData = function (res, taiKhoan) {
    var AWS = require("aws-sdk");
    var config = require("./ConfigAWS");
    config.configAWS(AWS);

    var docClient = new AWS.DynamoDB.DocumentClient();

    var params = {
        TableName: "Accounts",
        Key: {
            "taiKhoan": taiKhoan
        }
    };

    docClient.get(params, function (err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            res.end(JSON.stringify(err, null, 2));
        } else {
            console.log("Get Account by taiKhoan succeeded:");
            console.log(" - List taiKhoanThuChi ban đầu: ", data.Item.taiKhoan + ": ");
            data.Item.info.taiKhoanThuChi.forEach(function (item) {
                console.log("   + " + item.tenTaiKhoan + " - số tiền ban đầu: " + item.soTienBanDau + " - số tiền còn lại: " + item.soTienConLai);
            });
            res.json(data.Item.info.taiKhoanThuChi);
        }
    });
}
