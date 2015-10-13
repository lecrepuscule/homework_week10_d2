angular.module("doughnutApp", []).controller("DoughnutsController", DoughnutsController);

DoughnutsController.$inject=["$http"]

function DoughnutsController($http){
  var vm = this;

  vm.all = [];
  vm.freshDoughnut = {};

  vm.getDoughnuts = function(){
    $http
    .get("http://api.doughnuts.ga/doughnuts")
    .then(function(response){
      console.log(response);
      vm.all = response.data;
    })
  }

  vm.bakeDoughnut = function(){
    $http
    .post("http://api.doughnuts.ga/doughnuts", vm.freshDoughnut)
    .then(function(response){
      console.log(response);
      vm.all.push(response.data);
      vm.freshDoughnut = {};
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