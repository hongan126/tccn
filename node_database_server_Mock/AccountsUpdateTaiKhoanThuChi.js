var AWS = require("aws-sdk");
var config = require("./ConfigAWS");
config.configAWS();

var docClient = new AWS.DynamoDB.DocumentClient();

var taiKhoan = "hongan126@gmail.com";
var params = {
    TableName: "Accounts",
    Key: {
        "taiKhoan": taiKhoan
    }
};

var tenTaiKhoanThuChi = "Ví";
var soTienThuChi = 9;
var loaiThuChi = "Thu"

console.log("---BEGIN---");
docClient.get(params, function (err, data) {
    if (err) {
        console.error("1. Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("1. Get Accuont by taiKhoan succeeded: " + data.Item.taiKhoan);
        data.Item.info.taiKhoanThuChi.forEach(function (item) {
            if (item.tenTaiKhoan === tenTaiKhoanThuChi) {
                if (loaiThuChi === "Chi") {
                    item.soTienConLai -= soTienThuChi;
                }
                else {
                    item.soTienConLai += soTienThuChi;
                }
            }
        })

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

        console.log("2. Updating the item...");
        docClient.update(params, function (err, data) {
            if (err) {
                console.error("2. Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("2. Update Add TaiKhoan ThuChi succeeded:", JSON.stringify(data, null, 2));
            }
            console.log("---END---");
        });
    }
});