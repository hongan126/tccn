var AWS = require("aws-sdk");
var config = require("./ConfigAWS");
config.configAWS();

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Querying for account hongan126@gmail.com");

var params = {
    TableName : "Accounts",
    ProjectionExpression:"#tk, info.matKhau",
    KeyConditionExpression: "#tk = :taik",
    ExpressionAttributeNames:{
        "#tk": "taiKhoan"
    },
    ExpressionAttributeValues: {
        ":taik": "hongan126@gmail.com"
    }
};

docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query Accounts succeeded.");
        data.Items.forEach(function(item) {
            console.log(" -", item.taiKhoan + ": " + item.info.matKhau);
        });
    }
});