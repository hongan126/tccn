var AWS = require("aws-sdk");
exports.configAWS = function () {

//work with DynamoDB local
//     AWS.config.update({
//         region: "us-west-2",
//         endpoint: "http://localhost:8000"
//     });
//     AWS.config.accessKeyId = "AKIAI3WSYD3SPVLPTSKQ";
//     AWS.config.secretAccessKey = "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";

//work with DynamoDB Online
    AWS.config.update({
        region: "us-east-2",
        endpoint: "dynamodb.us-east-2.amazonaws.com",
        accessKeyId : "AKIAIROGLNBW44Y4CFHA",
        secretAccessKey : "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"
    });
//     AWS.config.update({
//         region: "us-east-2",
//         endpoint: "dynamodb.us-east-2.amazonaws.com"
//     });
//     AWS.config.accessKeyId = "AKIAJBCPGOJHUSX3EIIA";
//     AWS.config.secretAccessKey = "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";
}
