var AWS = require("aws-sdk");
var config = require("./ConfigAWS");
config.configAWS();

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "NhatKyThuChi";

var taiKhoan = "hongan126@gmail.com";
var nhatKyId = "20170225_20170203180560";
var nguonTien, soTien, loaiThuChi;

var params1 = {
    TableName: table,
    Key: {
        "taiKhoan": taiKhoan,
        "nhatKyId": nhatKyId
    }
};

console.log("---BEGIN---");
//1. Get Nhat Ky Thu Chi muốn xóa
docClient.get(params1, function (err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("1. Get Nhat Ky by ID succeeded:");
        console.log(" -", data.Item.taiKhoan + ": "
            + data.Item.nhatKyId.substring(6, 8) + "/"
            + data.Item.nhatKyId.substring(4, 6) + "/"
            + data.Item.nhatKyId.substring(0, 4)
            + ", " + data.Item.info.loai
            + ", " + data.Item.info.soTien
            + ", " + data.Item.info.hangMuc
            + ", " + data.Item.info.dienGiai
            + ", " + data.Item.info.nguonTien
            + ", " + data.Item.info.imageUrl);
        nguonTien = data.Item.info.nguonTien;
        soTien = data.Item.info.soTien;
        loaiThuChi = data.Item.info.loai;

// 2. Lấy tài Khoản, chứa danh sách tài khoản thu chi
        var params2 = {
            TableName: "Accounts",
            Key: {
                "taiKhoan": taiKhoan
            }
        };
        docClient.get(params2, function (err, data) {
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

//3. Cập nhật tài khoản thu chi trong bảng Accounts
                var params3 = {
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
                docClient.update(params3, function (err, data) {
                    if (err) {
                        console.error("3. Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                    } else {
                        console.log("3. Update Tai Khoan Thu Chi succeeded:", JSON.stringify(data, null, 2));

//4. Delete nhật ký thu chi
                        docClient.delete(params1, function (err, data) {
                            if (err) {
                                console.error("4. Unable to delete NhatKy item. Error JSON:", JSON.stringify(err, null, 2));
                            }
                            else {
                                console.log("4. Delete NhatKy Item succeeded:", JSON.stringify(data, null, 2));
                                console.log(data);
                            }
                            console.log("---END---");
                        });
                    }
                });
            }
        });
    }
});

