/**
 * Created by Administrator on 2017/5/31.
 */
angular.module('myApp', []).
controller('myController', function($scope) {
    $scope.storedString = '';
    $scope.keyInfo = {};
    $scope.keyStrokes = [];
    $scope.keyState = 'Not Pressed';
    $scope.keyPressed = function(event){
        if (event.keyCode == 13){ //回车
            var element = angular.element(event.target);
            $scope.storedString = element.val();
            element.val('');
            $scope.keyInfo.keyCode = event.keyCode;
            $scope.keyStrokes = [];
            $scope.keyState = 'Enter Pressed';
        } else {
            $scope.keyInfo.keyCode = event.keyCode;
            $scope.keyStrokes.push(event.keyCode);
            $scope.keyState = 'Not Pressed';
        }
    };
});