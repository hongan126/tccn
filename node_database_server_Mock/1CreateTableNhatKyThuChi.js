var AWS = require("aws-sdk");
var config = require("./ConfigAWS");
config.configAWS();
var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "NhatKyThuChi",
    KeySchema: [
        { AttributeName: "taiKhoan", KeyType: "HASH"},  //Partition key
        { AttributeName: "nhatKyId", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [
        { AttributeName: "taiKhoan", AttributeType: "S" },
        { AttributeName: "nhatKyId", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table NhatKyThuChi. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table NhatKyThuChi. Table description JSON:", JSON.stringify(data, null, 2));
    }
});