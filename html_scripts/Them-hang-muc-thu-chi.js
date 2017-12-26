$(document).ready(function() {
    $('a.btn-primary').click(function() {
        //lấy giá trị thuộc tính href - chính là phần tử "#add-box"
        var addBox = $(this).attr('href');
 
        //cho hiện hộp đăng nhập trong 300ms
        $(addBox).fadeIn(300);
 
        // thêm phần tử id="over" vào sau body
        $('body').append('<div id="over"></div>');
        $('#over').fadeIn(300);
 
        return false;
 });
 
 // khi click đóng hộp thoại
 $(document).on('click', "a.close, #over", function() {
       $('#over, .add-thu-chi').fadeOut(300 , function() {
           $('#over').remove();
       });
      return false;
 });
});