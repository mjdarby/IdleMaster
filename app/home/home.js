'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope', '$interval', function($scope, $interval) {
  // Constants
  $scope.frameRate = 30; // 30 loops per second

  // Variables
  $scope.fans = 0;
  $scope.money = 0;
  $scope.moneyPerClick = 1;
  $scope.moneyPerSecond = 0;
  $scope.moneyToAddThisLoop = 0;

  // Game loop
  $scope.gameLoop = function() {
    $scope.moneyToAddThisLoop += $scope.moneyPerSecond / $scope.frameRate;
    if ($scope.moneyToAddThisLoop > 0) {
      var numToAdd = Math.floor($scope.moneyToAddThisLoop);
      $scope.moneyToAddThisLoop -= numToAdd;
      $scope.money += numToAdd;
    }
  };

  // Stuff to buy
  $scope.items = {}
  $scope.newItem = function(shortName, longName, baseCost, fans) {
    $scope.items[shortName] = {'ShortName': shortName, 'LongName': longName, 'BaseCost': baseCost, 'Cost': baseCost, 'Count': 0, 'Fans': fans};
  };
  $scope.newItem('AkibaMeet', 'Akiba Meet And Greet!', 1, 1);
  $scope.newItem('NewAlbum', 'Release a new album', 10, 15);

  // Player actions
  $scope.moneyClick = function() {
    $scope.money += $scope.moneyPerClick;
  };

  $scope.spendMoney = function(item) {
    if (item in $scope.items) {
      var chosenItem = $scope.items[item];
      if ($scope.money >= chosenItem['Cost']) {
        // Update stats
        $scope.money -= chosenItem['Cost'];
        $scope.fans += chosenItem['Fans'];

        // Update item stats
        chosenItem['Cost'] = chosenItem['BaseCost'] * (chosenItem['Count'] + 1);
        chosenItem['Count'] += 1;
      }
    }
  };

  // Watchers
  $scope.$watch('fans', function(newValue, oldValue) {
    $scope.moneyPerSecond = newValue * 0.1;
    $scope.moneyPerSecond = $scope.moneyPerSecond.toFixed(1);
  });

  // Start up that game!
  $interval($scope.gameLoop, 1000 / $scope.frameRate);
}]);
