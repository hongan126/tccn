exports.getData = function (res, taiKhoan) {
    var AWS = require("aws-sdk");
    var config = require("./ConfigAWS");
    config.configAWS(AWS);


    var docClient = new AWS.DynamoDB.DocumentClient();

    console.log("Querying: Nhat ky thue cua tai khoan");

    var params = {
        TableName: "NhatKyThuChi",
        ProjectionExpression: "#tk, nhatKyId, info.loai, info.soTien, info.hangMuc, info.dienGiai, info.nguonTien, info.imageUrl",
        KeyConditionExpression: "#tk = :tktk",
        ExpressionAttributeNames: {
            "#tk": "taiKhoan"
        },
        ExpressionAttributeValues: {
            ":tktk": taiKhoan
        },
        ScanIndexForward: false,
    };

    docClient.query(params, function (err, data) {
        if (err) {
            console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
            res.end(JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded. All NhatKyThuChi by taiKhoan-username.");
            var bc = {tongChi: 0, tongThu: 0};
            var i = 0;
            data.Items.forEach(function (item) {
                if (item.info.loai === 'Chi') {
                    bc.tongChi += item.info.soTien;
                }
                else {
                    bc.tongThu += item.info.soTien;
                }
            });
            res.json(bc);
        }
    });
}