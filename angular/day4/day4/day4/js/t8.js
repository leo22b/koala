/**
 * Created by Administrator on 2017/5/31.
 */
var myApp = angular.module('myApp', ['ui.router']);
myApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/state1');
    $stateProvider.state('state1', {
        url: '/state1',
        templateUrl: 'template/state1.html'
    })
    .state('state1.list', {
        url: '/list',
        templateUrl: 'template/state1.list.html',
        controller: function ($scope) {
            $scope.items = ['rose', 'jack', 'karl'];
        }
    })
    .state('state2.list', {
        url: '/list',
        templateUrl: 'template/state2.list.html',
        controller: function ($scope) {
            $scope.items = ['apple', 'pear', 'pine'];
        }
    })
    .state('state2', {
        url: '/state2',
        templateUrl: 'template/state2.html',

    });


    //$stateProvider.state('state2',{});
})