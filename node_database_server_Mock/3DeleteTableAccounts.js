var AWS = require("aws-sdk");
var config = require("./ConfigAWS");
config.configAWS();

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "Accounts"
};

dynamodb.deleteTable(params, function(err, data) {
    if (err) {
        console.error("Unable to delete table Accounts. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Deleted table Accounts. Table description JSON:", JSON.stringify(data, null, 2));
    }
});