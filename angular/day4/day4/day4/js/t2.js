/**
 * Created by Administrator on 2017/5/31.
 */
var myApp=angular.module('myApp',[]);
myApp.controller('MyCtrl',function ($scope) {
   //要的数据和交互逻辑
    $scope.inputData={
        input1:'',
        input2:''
    }
    //获得焦点
    $scope.focusGained=function (input) {
        $scope.inputData[input]='';
    }
    //失去焦点  读text的值赋值给inputData
    $scope.focusLost=function (event,input) {
        //console.log(event.target) ;  event对象就是js的事件对象 event.target 事件源 表单text
        var jq=angular.element(event.target);//把原生的dom对象转换jq lite对象
        var value=jq.val();
        $scope.inputData[input]=value.toUpperCase();

    }



});