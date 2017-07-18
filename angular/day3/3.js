 

 var seavice=angular.module("service",[]);
 seavice.factory('factoryService', function($log) {   	 
			  return{
                   name:"zhangsan",
                   run: function(a, b) {
					     alert("heelo")
					     $log.log("hello world")
					  },
				   say:function(){
				   	  console.log("hello")
				   }	  

			  };
		});