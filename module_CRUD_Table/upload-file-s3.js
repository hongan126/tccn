var _ = require('underscore'),
    AWS = require('aws-sdk'),
    fs = require('fs'),
    path = require('path'),
    flow = require('flow');

var finalFilename = '';
var bucketName = 'my-images-bucket'; //Bucket Name
var nhatKy = require('./NhatKyAdd');

configPath = path.join(__dirname, '.', "config.json");

AWS.config.loadFromPath(configPath);

exports.s3 = function (req, res, email) {
    if (!req.file) {
        var ngayThuChi = req.body.ngay.replace("-", "").replace("-", "");
        var loaiThuChi = req.body.KieuGhiChep;
        var soTien = req.body.SoTien;
        var hangMuc = req.body.MucThuChi;
        var dienGiai = req.body.DienGiai;
        var nguonTien = req.body.TaiKhoan;
        nhatKy.addData(res, email, ngayThuChi, loaiThuChi, soTien, hangMuc, dienGiai, nguonTien, 'empty');
    }
    else {
        var s3 = new AWS.S3({region: 'us-east-2'}),
            file = req.file,
            result = {
                error: 0,
                uploaded: []
            };

        flow.exec(
            function () { // Read temp File
                fs.readFile(file.path, this);
            },
            function (err, data) { // Upload file to S3
                finalFilename = Date.now() + "_" + file.originalname; //Thêm date ở đầu để tránh bị trùng tên file khi up.
                s3.putObject({
                    Bucket: bucketName, //Bucket Name
                    Key: finalFilename.toString(), //Upload File Name, Default the original name
                    Body: data,
                    ACL: 'public-read' //Cho phép đọc file từ link
                }, this);
            },
            function (err, data) { //Upload Callback
                if (err) {
                    console.error('Error : ' + err);
                    result.error++;
                }
                result.uploaded.push(data.ETag);
                this();
            },
            function () {
                var fileurl = "https://s3.us-east-2.amazonaws.com/my-images-bucket/" + finalFilename;
                // res.end("<html> <head> <title>Result</title> </head> <body> <p>File URL:"+fileurl+"</p>"+
                //            "<br/> <br/> <img src='"+fileurl+"' </body> </html>"
                // );
                var ngayThuChi = req.body.ngay.replace("-", "").replace("-", "");
                var loaiThuChi = req.body.KieuGhiChep;
                var soTien = req.body.SoTien;
                var hangMuc = req.body.MucThuChi;
                var dienGiai = req.body.DienGiai;
                var nguonTien = req.body.TaiKhoan;
                nhatKy.addData(res, email, ngayThuChi, loaiThuChi, soTien, hangMuc, dienGiai, nguonTien, fileurl);
            });



        // var s3 = new AWS.S3({region: 'us-east-2'});
        // var file = req.file;
        // fs.readFile(file.path, function (err, data) {
        //     if (err) { throw err; }
        //     finalFilename = Date.now() + "_" + file.originalname;
        //     params = {Bucket: bucketName, Key: finalFilename, Body: data };
        //     s3.putObject(params, function(err, data) {
        //         if (err) {
        //             console.log(err);
        //         } else {
        //             console.log("Successfully uploaded data to myBucket/myKey");
        //             var fileurl = "https://s3.us-east-2.amazonaws.com/my-images-bucket/" + finalFilename;
        //             // res.end("<html> <head> <title>Result</title> </head> <body> <p>File URL:"+fileurl+"</p>"+
        //             //            "<br/> <br/> <img src='"+fileurl+"' </body> </html>"
        //             // );
        //             var ngayThuChi = req.body.ngay.replace("-", "").replace("-", "");
        //             var loaiThuChi = req.body.KieuGhiChep;
        //             var soTien = req.body.SoTien;
        //             var hangMuc = req.body.MucThuChi;
        //             var dienGiai = req.body.DienGiai;
        //             var nguonTien = req.body.TaiKhoan;
        //             nhatKy.addData(res, email, ngayThuChi, loaiThuChi, soTien, hangMuc, dienGiai, nguonTien, fileurl);
        //         }
        //     });
        // });
    }
};
