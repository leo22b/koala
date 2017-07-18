/**
 * Created by Administrator on 2017/5/31.
 */
var userInfoModule = angular.module('myApp', []);
userInfoModule.controller('UserInfoCtrl', ['$scope',
    function($scope) {
        //userInfo的数据 属性
        $scope.userInfo = {
            email: "253445528@qq.com",
            password: "253445528",
            autoLogin: true
        };
        //方法  打印输出
        $scope.getFormData = function() {
            console.log($scope.userInfo);
        };
        //方法  改变userInfo
        $scope.setFormData = function() {
            $scope.userInfo = {
                email: 'rose@126.com',
                password: 'jack',
                autoLogin: false
            }
        };
        //方法 重置userInfo
        $scope.resetForm = function() {
            $scope.userInfo = {
                email: "1111111@qq.com",
                password: "111111",
                autoLogin: true
            };
        }
    }
])
