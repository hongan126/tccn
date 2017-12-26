var AWS = require("aws-sdk");
var fs = require('fs');
var config = require("./ConfigAWS");
config.configAWS();

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing Account into DynamoDB. Please wait.");

var allMovies = JSON.parse(fs.readFileSync('account.json', 'utf8'));
allMovies.forEach(function(acc) {
    var params = {
        TableName: "Accounts",
        Item: {
            "taiKhoan":  acc.taiKhoan,
            "info":  acc.info
        }
    };

    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add account", acc.taiKhoan, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("PutItem succeeded:", acc.taiKhoan);
        }
    });
});