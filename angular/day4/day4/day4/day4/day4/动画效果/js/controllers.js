/**
 * Created by Robin on 2017/4/7.
 */
var mobileStoreCtrls = angular.module ('mobileStoreCtrls',[]);
mobileStoreCtrls.controller('HelloCtrl',['$scope',
    function ($scope) {
        $scope.hello={
            text:'welcome '
        };
        $scope.pageClass="hello";
    }
]);
mobileStoreCtrls.controller('MobileListCtrl',['$scope',
    function ($scope) {
        $scope.mobiles=[
            {title:'360手机 F4S 全网通 3GB+32GB 流光金 移动定制版 移动联通电信4G手',price:'¥948.00'},
            {title:'荣耀 V8 4GB+32GB 铂光金 移动联通4G手机 双卡双待双通',price:'¥1999.00'},
            {title:'OPPO R9s 全网通4G+64G 双卡双待手机 玫瑰金',price:'¥2799.00'},
        ]
        $scope.pageClass="list"; // 在样式表文件中找  .list  类选择器
    }

]);