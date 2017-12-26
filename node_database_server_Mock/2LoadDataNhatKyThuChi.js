var AWS = require("aws-sdk");
var fs = require('fs');
var config = require("./ConfigAWS");
config.configAWS();

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing Nhat Ky Thu Chi into DynamoDB. Please wait.");

var allMovies = JSON.parse(fs.readFileSync('nhatKyThuChi.json', 'utf8'));
allMovies.forEach(function(nhatky) {
    var params = {
        TableName: "NhatKyThuChi",
        Item: {
            "taiKhoan":  nhatky.taiKhoan,
            "nhatKyId": nhatky.nhatKyId,
            "info":  nhatky.info
        }
    };

    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add nhat ky thi chi", nhatky.taiKhoan, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("PutItem succeeded:", nhatky.nhatKyId);
        }
    });
});