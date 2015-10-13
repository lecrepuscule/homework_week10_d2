angular.module("doughnutApp", []).controller("DoughnutsController", DoughnutsController);

DoughnutsController.$inject=["$http"]

function DoughnutsController($http){
  var vm = this;

  vm.all = [];

  vm.getDoughnuts = function(){
    $http
    .get("http://api.doughnuts.ga/doughnuts")
    .then(function(response){
      console.log(response);
      vm.all = response.data;
    })
  }

  vm.eatDoughnut = function(id){
    $http
    .delete("http://api.doughnuts.ga/doughnuts/" + id)
    .then(function(response){
      console.log(response);
      if (response.status === 200){
        vm.all = vm.all.filter(function(doughnut){
          return doughnut.id !== id;
        });
      };
    });
  };

  vm.getDoughnuts();

};