/**
 * Created by Administrator on 2017/5/31.
 */
var myApp=angular.module('myApp',[]);
myApp.controller('MyCtrl',function ($scope) {
    $scope.color='red';
    $scope.setGreen=function () {
        $scope.color='green';
    }
});