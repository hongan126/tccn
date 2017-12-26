var AWS = require("aws-sdk");
var config = require("./ConfigAWS");
config.configAWS();

var docClient = new AWS.DynamoDB.DocumentClient()

var taiKhoan = "hongan126@gmail.com";
var newPass = "87654321";

// Increment an atomic counter

var params = {
    TableName:"Accounts",
    Key:{
        "taiKhoan": taiKhoan
    },
    UpdateExpression: "set info.matKhau = :valPass",
    ExpressionAttributeValues:{
        ":valPass": newPass
    },
    ReturnValues:"UPDATED_NEW"
};

docClient.update(params, function(err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Update Mat Khau succeeded: " + taiKhoan, JSON.stringify(data, null, 2));
    }
});