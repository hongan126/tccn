var user = readCookie("email");
Number.prototype.format = function(n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

$(document).ready(function () {
    // alert("Open");
    $("#email").html(user);
    // alert(user);
    getAllNhatKyThuChi();
});

function getAllNhatKyThuChi() {
    $("#tableBody").html("");
    $.ajax({
        type: 'GET',
        url: 'http://ec2-18-218-13-61.us-east-2.compute.amazonaws.com:8088/nhat-ky-thu-chi/' + user.toString(),
        dataType: 'json',
        success: function (data) {
            // alert("success");
            var content = "Chi tiêu: ";
            $.each(data, function (i, item) {
                if(item.info.loai==="Chi"){
                    content = "Chi tiêu: ";
                }else{
                    content = "Thu tiền: ";
                }
                var rows = "<tr>\n" +
                    "<td>" + item.nhatKyId.substring(6, 8) + "/"
                    + item.nhatKyId.substring(4, 6) + "/"
                    + item.nhatKyId.substring(0, 4) + "</td>" +
                    "<td>"+content + item.info.dienGiai + "</td>" +
                    "<td style='text-align: right;'>" + item.info.soTien.format() + " đ</td>" +
                    "<td>" + item.info.nguonTien + "</td>" +
                    "<td><a href=\"#\" class=\"btn btn-info\">Sửa</a>" +
                    "<a href=\"#\" onClick='deleteItem(\"" + item.nhatKyId + "\");' class='btn btn-warning'>Xóa</a>" +
                    "</td>" +
                    "</tr>";
                $("#tableBody").append(rows);
            });
        },
        error: function (x, y, z) {
            alert("Có lỗi xảy ra! Vui lòng thử lại. " + x + "\n" + y + "\n" + z);
        }
    });
}

function deleteItem(id) {
    var r = confirm("Bạn thật sự muốn xóa!");
    if (r == true) {
        // alert('http://ec2-18-218-13-61.us-east-2.compute.amazonaws.com:8088/nhat-ky-thu-chi/remove/' + $("#email").html() + '/' + id.toString())
        $.ajax({
            type: 'DELETE',
            url: 'http://ec2-18-218-13-61.us-east-2.compute.amazonaws.com:8088/nhat-ky-thu-chi/remove/' + user.toString() + '/' + id.toString(),
            success: function (data) {
                // alert("Đã xóa!");
                location.reload();
            },
            error: function (x, y, z) {
                alert("Có lỗi xảy ra! Vui lòng thử lại. " + x + "\n" + y + "\n" + z);
            }
        });
    } else {
        //You pressed Cancel!;
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