var AWS = require("aws-sdk");
var config = require("./ConfigAWS");
config.configAWS();

var docClient = new AWS.DynamoDB.DocumentClient();

var taiKhoan = "hongan126@gmail.com";
var params = {
    TableName: "Accounts",
    Key:{
        "taiKhoan": taiKhoan
    }
};

console.log("---BEGIN---");
docClient.get(params, function(err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Get Account by taiKhoan succeeded:");
        console.log(" - List taiKhoanThuChi ban đầu: ", data.Item.taiKhoan + ": ");
        console.log(JSON.stringify(data, null, 2));
        data.Item.info.taiKhoanThuChi.forEach(function (item) {
            console.log("   + " + item.tenTaiKhoan + " - số tiền ban đầu: " + item.soTienBanDau + " - số tiền còn lại: " + item.soTienConLai);
        })
    }
});
