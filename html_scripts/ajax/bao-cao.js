var user = readCookie("email");
Number.prototype.format = function (n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

$(document).ready(function () {
    // alert("Open");
    $("#email").html(user);
    // alert(user);
    getBaoCao();
});

function getBaoCao() {
    $("#tableBody").html("");
    $.ajax({
        type: 'GET',
        url: 'http://ec2-18-218-15-7.us-east-2.compute.amazonaws.com:8088/bao-cao/' + user.toString(),
        dataType: 'json',
        success: function (data) {
            // alert("success");
            var rows = "<tr>" +
                "<td>Từ trước đến nay</td>" +
                "<td>" + data.tongThu.format() + " đ</td>" +
                "<td>" + data.tongChi.format() + " đ</td>" +
                "</tr>";
            $("#tableBody").append(rows);
        },
        error: function (x, y, z) {
            alert("Có lỗi xảy ra! Vui lòng thử lại. " + x + "\n" + y + "\n" + z);
        }
    });
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