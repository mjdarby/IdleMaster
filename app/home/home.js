'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope', '$interval', function($scope, $interval) {
  // Variables
  $scope.fans = 0;
  $scope.money = 0;
  $scope.moneyPerClick = 1;
  $scope.gameLoop = function() {
    $scope.fans += 1;
  };
  $scope.moneyClick = function() {
    $scope.money += $scope.moneyPerClick;
  };
  $interval($scope.gameLoop, 30);
}]);
