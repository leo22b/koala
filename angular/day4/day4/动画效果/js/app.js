/**
 * Created by Robin on 2017/4/7.
 */
var mobileStoreApp = angular.module('mobileStoreApp',[
    //使用动画特效 需要注册动画模块
    'ngRoute','ngAnimate','mobileStoreCtrls'
    ,'mobileStoreFilters',
    'mobileStoreServices','mobileStoreDirectives'
]);

mobileStoreApp.config(function ($routeProvider) {

    $routeProvider.when('/hello',{
        templateUrl:'tpls/hello.html',
        controller:'HelloCtrl'
    }).when('/list',{
        templateUrl:'tpls/mobileList.html',
        controller:'MobileListCtrl'
    }).otherwise({
        redirectTo: '/hello'

    });

});
