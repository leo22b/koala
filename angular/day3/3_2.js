 var seavice2=angular.module("service2",["service"]);
 seavice2.factory('factoryService2', function(factoryService) {   	 
			  return{
                   name2:"zhangsan",
                   run2: function(a, b) {
					     factoryService.run()
					  },
				   say2:function(){
				   	  console.log("hello")
				   }	  

			  };
		});