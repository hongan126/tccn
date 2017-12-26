var optionsThu = "<option value=\"Lương\">Lương</option>\n" +
    "<option value=\"Được cho/tặng\">Được cho/tặng</option>\n" +
    "<option value=\"Thưởng\">Thưởng</option>\n" +
    "<option value=\"Tiền lãi\">Tiền lãi</option>\n" +
    "<option value=\"Khác\">Khác</option>";
var optionsChi = "<option value=\"Ăn uống\">Ăn uống</option>\n" +
    "<option value=\"Dịch vụ sinh hoạt\">Dịch vụ sinh hoạt</option>\n" +
    "<option value=\"Đi lại\">Đi lại</option>\n" +
    "<option value=\"Phát triển bản thân\">Phát triển bản thân</option>\n" +
    "<option value=\"Nhà cửa\">Nhà cửa</option>\n" +
    "<option value=\"Trang phục\">Trang phục</option>\n" +
    "<option value=\"Hưởng thụ\">Hưởng thụ</option>\n" +
    "<option value=\"Hiếu hỉ\">Hiếu hỉ</option>\n" +
    "<option value=\"Sức khỏe\">Sức khỏe</option>\n" +
    "<option value=\"Con cái\">Con cái</option>";
var user = readCookie("email");

$(document).ready(function () {

    $("#email").html(user);

    $('input:radio[name="KieuGhiChep"]').filter('[value=Chi]').prop('checked', true);
    $("#MucThuChi").html(optionsChi);

    $(".rdoThuOrChi").click(function () {
        if($(this).val()=="Thu"){
            // alert("Thu tiền");
            $("#MucThuChi").html(optionsThu);
        }
        else{
            // alert("Chi tiền");
            $("#MucThuChi").html(optionsChi);
        }
    });

    getAllTaiKhoanThuChi();
});

function getAllTaiKhoanThuChi() {
    $("#TaiKhoan").html("");
    $.ajax({
        type: 'GET',
        url: 'http://ec2-18-218-15-7.us-east-2.compute.amazonaws.com:8088/tai-khoan-thu-chi/' + user.toString(),
        dataType: 'json',
        success: function (data) {
            // alert("success");
            $.each(data, function (i, item) {
                var option = "<option value=\""+item.tenTaiKhoan+"\">"+item.tenTaiKhoan+"</option>";
                $("#TaiKhoan").append(option);
            });
        },
        error: function (x, y, z) {
            alert("Error! Lấy tài khoản thu chi. Vui lòng thử lại. " + x + "\n" + y + "\n" + z);
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