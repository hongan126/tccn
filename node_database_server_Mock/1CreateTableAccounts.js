var AWS = require("aws-sdk");
var config = require("./ConfigAWS");
config.configAWS();

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "Accounts",
    KeySchema: [
        { AttributeName: "taiKhoan", KeyType: "HASH"}
    ],
    AttributeDefinitions: [
        { AttributeName: "taiKhoan", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table Accounts. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table Accounts. Table description JSON:", JSON.stringify(data, null, 2));
    }
});