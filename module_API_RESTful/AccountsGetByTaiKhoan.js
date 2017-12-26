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

docClient.get(params, function(err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Get Account by taiKhoan succeeded:");
        if(JSON.stringify(data, null, 2) !== "{}") {
            console.log(" -", data.Item.taiKhoan + ": ");
            data.Item.info.taiKhoanThuChi.forEach(function (item) {
                console.log(item.tenTaiKhoan + " - ban đầu: " + item.soTienBanDau + " - còn lại: " + item.soTienConLai);
            });
        }
        else{
            console.log("Data trống!")
        }
    }
});