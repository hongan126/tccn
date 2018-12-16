var user = readCookie("email");
Number.prototype.format = function(n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

$(document).ready(function () {
    $("#email").html(user);
    getAllTaiKhoanThuChi();
    $("#addTaiKhoan").click(function () {
        $.ajax({
            type: "post",
            url: 'http://ec2-18-217-168-84.us-east-2.compute.amazonaws.com:8088/tai-khoan-thu-chi/add',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                "taiKhoan": user.toString(),
                "tenTaiKhoan" : $("#name").val(),
                "soTienBanDau": parseInt($("#SoTien").val())
            })
        });
        location.reload();
    });
});

function getAllTaiKhoanThuChi() {
    $("#tbodyTaiKhoan").html("");
    $.ajax({
        type: 'GET',
        url: 'http://ec2-18-217-168-84.us-east-2.compute.amazonaws.com:8088/tai-khoan-thu-chi/' + user.toString(),
        dataType: 'json',
        success: function (data) {
            // alert("success");
            $.each(data, function (i, item) {
                var row = "<tr>" +
                    "<td>"+item.tenTaiKhoan+"</td>" +
                    "<td>Còn: "+item.soTienConLai.format()+" đ</td>" +
                    "<td>" +
                    "    <a href=\"#\" onClick='deleteTaiKhoan(\"" + item.tenTaiKhoan + "\");' class='btn btn-warning'>Xóa</a>" +
                    "</td>" +
                    "</tr>";
                $("#tbodyTaiKhoan").append(row);
            });
        },
        error: function (x, y, z) {
            alert("Error! Lấy tài khoản thu chi. Vui lòng thử lại. " + x + "\n" + y + "\n" + z);
        }
    });
}

function deleteTaiKhoan(tk) {
    var r = confirm("Lưu ý: Ghi chép của "+tk+" sẽ bị XÓA. Bạn chắc chắn muốn xóa?");
    if (r == true) {
        $.ajax({
            type: 'DELETE',
            url: 'http://ec2-18-217-168-84.us-east-2.compute.amazonaws.com:8088/tai-khoan-thu-chi/remove/' + user.toString() + '/' + tk.toString(),
            success: function (data) {
                // alert("Đã xóa!");
                location.reload();
            },
            error: function (x, y, z) {
                alert("Có lỗi xảy ra! Vui lòng thử lại. " + x + "\n" + y + "\n" + z);
            }
        });
    } else {
        // "You pressed Cancel!";
    }
}

function readCookie(name) {
    var i, c, ca, nameEQ = name + "=";
    ca = document.cookie.split(';');
    for (i = 0; i < ca.length; i++) {
        c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return '';
}

