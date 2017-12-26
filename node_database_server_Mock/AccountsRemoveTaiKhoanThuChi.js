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

var tenTaiKhoanThuChi = "ATM Vietcombank";

console.log("---BEGIN---");
docClient.get(params, function (err, data) {
    if (err) {
        console.error("1. Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("1. Get Account by taiKhoan succeeded: " + data.Item.taiKhoan);
        var i = 0;
        data.Item.info.taiKhoanThuChi.forEach(function (item) {
            if (item.tenTaiKhoan === tenTaiKhoanThuChi) {
                data.Item.info.taiKhoanThuChi.splice(i, 1);
            }
            i++;
        });

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

        console.log("2. Remove Tai khoản thu chi...");
        docClient.update(params, function (err, data) {
            if (err) {
                console.error("2. Unable to remove item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("2. Remove TaiKhoanThuChi succeeded:", JSON.stringify(data, null, 2));

                //Lấy tất cả nhật ký, và xóa nhật ký có nguồn tiền là "tenTaiKhoanThuChi"
                var params = {
                    TableName: "NhatKyThuChi",
                    ProjectionExpression: "#tk, nhatKyId, info.nguonTien",
                    KeyConditionExpression: "#tk = :val",
                    ExpressionAttributeNames: {
                        "#tk": "taiKhoan"
                    },
                    ExpressionAttributeValues: {
                        ":val": taiKhoan
                    },
                    ScanIndexForward: false,
                };

                docClient.query(params, function (err, data) {
                    if (err) {
                        console.log("3. Unable to query. Error:", JSON.stringify(err, null, 2));
                    } else {
                        console.log("3. Lấy tất cả nhật ký cua taiKhoan");
                        data.Items.forEach(function (item) {
                            if (item.info.nguonTien === tenTaiKhoanThuChi) {
                                //Xóa nhật ký
                                var params = {
                                    TableName: "NhatKyThuChi",
                                    Key: {
                                        "taiKhoan": item.taiKhoan,
                                        "nhatKyId": item.nhatKyId
                                    }
                                };
                                docClient.delete(params, function (err, data) {
                                    if (err) {
                                        console.error("4. Unable to delete NhatKy item. Error JSON:", JSON.stringify(err, null, 2));
                                    }
                                    else {
                                        console.log("5. Deleted NhatKy: nhatKyId=" + item.nhatKyId + " :", JSON.stringify(data, null, 2));
                                    }
                                });
                            }
                        });
                    }
                    console.log("---END---");
                });
            }
        });
    }
});