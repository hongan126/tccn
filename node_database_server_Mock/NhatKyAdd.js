var AWS = require("aws-sdk");
var dateTime = require('node-datetime');
var config = require("./ConfigAWS");
config.configAWS();

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "NhatKyThuChi";

var taiKhoan = "hongan126@gmail.com";
var dt = dateTime.create();
var formatted = dt.format('YmdHMS');
var nhatKyId = "20171217"+"_"+formatted;

var loaiThuChi = "Chi";
var soTien = 20000;
var hangMuc = "Điện thoại";
var dienGiai = "mua thẻ nạp";
var nguonTien = "Ví";
var imageUrl = "empty";

var params = {
    TableName: table,
    Item:{
        "taiKhoan": taiKhoan,
        "nhatKyId": nhatKyId,
        "info": {
            "loai": loaiThuChi,
            "soTien": soTien,
            "hangMuc": hangMuc,
            "dienGiai": dienGiai,
            "nguonTien": nguonTien,
            "imageUrl": imageUrl
        }
    }
};

console.log("---BEGIN---\n1. Adding a new Nhat Ky Thu Chi...");
docClient.put(params, function(err, data) {
    if (err) {
        console.error("1. Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("1. Added item: " + nhatKyId, JSON.stringify(data, null, 2));

        var params = {
            TableName: "Accounts",
            Key: {
                "taiKhoan": taiKhoan
            }
        };

        //Cập nhật số tiền còn lại  của tài khoản thu chi
        docClient.get(params, function (err, data) {
            if (err) {
                console.error("2. Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("2. Get Account by taiKhoan succeeded: " + data.Item.taiKhoan);
                data.Item.info.taiKhoanThuChi.forEach(function (item) {
                    if (item.tenTaiKhoan === nguonTien) {
                        if (loaiThuChi === "Chi") {
                            item.soTienConLai -= soTien;
                        }
                        else {
                            item.soTienConLai += soTien;
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

                docClient.update(params, function (err, data) {
                    if (err) {
                        console.error("3. Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                    } else {
                        console.log("3. Update Tai Khoan Thu Chi succeeded:", JSON.stringify(data, null, 2));
                    }
                    console.log("---END---");
                });
            }
        });
    }
});

