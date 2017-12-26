exports.getData = function (res, taiKhoan, nhatKyId) {
    var AWS = require("aws-sdk");
    var config = require("./ConfigAWS");
    config.configAWS();

    var docClient = new AWS.DynamoDB.DocumentClient();

    var params = {
        TableName: "NhatKyThuChi",
        Key: {
            "taiKhoan": taiKhoan,
            "nhatKyId": nhatKyId
        }
    };

    docClient.get(params, function (err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            res.end(JSON.stringify(err, null, 2));
        } else {
            console.log("Get Nhat Ky by ID succeeded:");
            if (JSON.stringify(data, null, 2) !== "{}") {
                console.log(" -", data.Item.taiKhoan + ": "
                    + data.Item.nhatKyId.substring(6, 8) + "/"
                    + data.Item.nhatKyId.substring(4, 6) + "/"
                    + data.Item.nhatKyId.substring(0, 4)
                    + ", " + data.Item.info.loai
                    + ", " + data.Item.info.soTien
                    + ", " + data.Item.info.hangMuc
                    + ", " + data.Item.info.dienGiai
                    + ", " + data.Item.info.nguonTien
                    + ", " + data.Item.info.imageUrl);
                res.end(JSON.stringify(data.Item, null, 2));
            }
            else {
                var err = { "error" : "Không tồn tại"};
                console.log("Không tồn tại!");
                res.end(JSON.stringify(err, null, 2));
            }
        }
    });

// var docClient = new AWS.DynamoDB.DocumentClient();
//
// console.log("Querying: Nhat ky thue cua tai khoan hongan126@gmail.com, id =20170203_20170204180560");
//
// var params = {
//     TableName : "NhatKyThuChi",
//     ProjectionExpression:"#tk, nhatKyId, info.loai, info.soTien, info.hangMuc, info.dienGiai, info.nguonTien, info.imageUrl",
//     KeyConditionExpression: "#tk = :tktk and nhatKyId= :id",
//     ExpressionAttributeNames:{
//         "#tk": "taiKhoan"
//     },
//     ExpressionAttributeValues: {
//         ":tktk": "hongan126@gmail.com",
//         ":id": "20170203_20170204180560"
//     },
//     ScanIndexForward: false,
// };
//
// docClient.query(params, function(err, data) {
//     if (err) {
//         console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
//     } else {
//         console.log("Query succeeded.");
//         data.Items.forEach(function(item) {
//             console.log(" -", item.taiKhoan + ": "
//                 + item.nhatKyId.substring(6, 8)+"/"
//                 + item.nhatKyId.substring(4, 6)+"/"
//                 + item.nhatKyId.substring(0, 4)
//                 + ", " + item.info.loai
//                 + ", " + item.info.soTien
//                 + ", " + item.info.hangMuc
//                 + ", " + item.info.dienGiai
//                 + ", " + item.info.nguonTien
//                 + ", " + item.info.imageUrl);
//         });
//     }
// });
}