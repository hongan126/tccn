RUN cả 2 file: server-api, server-web

Folder:
+ module_API_RESTful: chứa code truy vấn DB, truyền vào response để trả về cho AJAX
+ html_scripts/ajax: chứa code ajax cho các trang html
+ module_CRUD_Table: code đăng nhập không thông qua Ajax
+ node_database_server_Mock: chứa code mồi DB, và code truy vấn trực tiếp tới DB

HTTP Status Code
1xx: Information (Thông tin): Khi nhận được những mã như vậy tức là request đã được server tiếp nhận và quá trình xử lý request đang được tiếp tục.
2xx: Success (Thành công): Khi nhận được những mã như vậy tức là request đã được server tiếp nhận, hiểu và xử lý thành công
3xx: Redirection (Chuyển hướng): Mã trạng thái này cho biết client cần có thêm action để hoàn thành request
4xx: Client Error (Lỗi Client): Nó nghĩa là request chứa cú pháp không chính xác hoặc không được thực hiện.
5xx: Server Error (Lỗi Server): Nó nghĩa là Server thất bại với việc thực hiện một request nhìn như có vẻ khả thi.