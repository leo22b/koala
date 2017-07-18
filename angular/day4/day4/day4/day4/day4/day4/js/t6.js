/**
 * Created by Administrator on 2017/5/31.
 */
var myApp=angular.module('myApp',[]);
myApp.controller('MyCtrl',function ($scope) {
    $scope.isError=false;
    $scope.isWarning=false;
    $scope.messageText="test ng-class";
    $scope.showError=function () {
        $scope.messageText='use error';
        $scope.isError=true;
        $scope.isWarning=false;

    }

    $scope.showWarning=function () {
        $scope.messageText='use warning'
        $scope.isError=false;
        $scope.isWarning=true;

    }
});