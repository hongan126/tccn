exports.getData = function (res, taikhoan) {
    var AWS = require("aws-sdk");
    var config = require("./ConfigAWS");
    config.configAWS();

    var docClient = new AWS.DynamoDB.DocumentClient();

    console.log("Querying: Nhat ky thue cua tai khoan " + taikhoan);

    var params = {
        TableName: "NhatKyThuChi",
        ProjectionExpression: "#tk, nhatKyId, info.loai, info.soTien, info.hangMuc, info.dienGiai, info.nguonTien, info.imageUrl",
        KeyConditionExpression: "#tk = :tktk",
        ExpressionAttributeNames: {
            "#tk": "taiKhoan"
        },
        ExpressionAttributeValues: {
            ":tktk": taikhoan
        },
        ScanIndexForward: false,
    };

    docClient.query(params, function (err, data) {
        if (err) {
            console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
            res.end(JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded. All NhatKyThuChi by taiKhoan-username.");
            data.Items.forEach(function (item) {
                console.log(" -", item.taiKhoan + ": "
                    + item.nhatKyId.substring(6, 8) + "/"
                    + item.nhatKyId.substring(4, 6) + "/"
                    + item.nhatKyId.substring(0, 4) + " -" + item.nhatKyId + "- "
                    + ", " + item.info.loai
                    + ", " + item.info.soTien
                    + ", " + item.info.hangMuc
                    + ", " + item.info.dienGiai
                    + ", " + item.info.nguonTien
                    + ", " + item.info.imageUrl);
            });
            // res.json({"success" : "Updated Successfully", "status" : 200, "data": data.Items});
            // var response = {
            //     success : data.Items
            // }

            // res.end(JSON.stringify(data.Items));
            res.json(data.Items);
            // res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
}