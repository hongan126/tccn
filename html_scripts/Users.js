var util = require('util');
var Sequelize = require('sequelize');
var sequelize = undefined;
var User = undefined;
// tạo bảng
module.exports.connect = function (params, callback ) {
    sequelize = new Sequelize(params.dbname,
        params.username,
        params.password,
        params.params);
        User = sequelize.define('User', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                unique: true
            },
            username: {
                type: Sequelize.STRING,
                unique: true
            },
            password: Sequelize.STRING
        });
        User.sync().then(function () {
            callback()
        }).error(function (err) {
            callback(err)
        });
}