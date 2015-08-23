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

  // Stuff to buy
  $scope.items = {}
  $scope.newItem = function(shortName, longName, countText, baseCost, fans) {
    $scope.items[shortName] = {'ShortName': shortName, 'LongName': longName,
                               'BaseCost': baseCost, 'Cost': baseCost,
                               'Count': 0, 'Fans': fans, 'CountText': countText,
                               'Revealed': false};
  };
  $scope.newItem("AkibaMeet", "Akiba Meet And Greet!", "Hands shaken", 10, 1);
  $scope.newItem("NewAlbum", "Release a new album", "Records sold", 80, 15);
  $scope.newItem("NewCM", "Shoot a commercial", "Products endorsed", 200, 20);
  $scope.newItem("PerformConcert", "Perform a concert", "Glowsticks lit", 300, 1000);

  // Game loop functions
  $scope.revealItem = function() {
    for (var itemName in $scope.items) {
      var item = $scope.items[itemName];
      if (!item.Revealed && $scope.money > item.Cost / 2) {
        item.Revealed = true;
      }
    }
  };

  // Game loop
  $scope.gameLoop = function() {

    $scope.moneyToAddThisLoop += $scope.moneyPerSecond / $scope.frameRate;

    var numToAdd = Math.floor($scope.moneyToAddThisLoop);
    $scope.moneyToAddThisLoop -= numToAdd;
    $scope.money += numToAdd;

    $scope.revealItem();
  };

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
        chosenItem['Count'] += 1;
        chosenItem['Cost'] = Math.floor(chosenItem['BaseCost'] *
                                        Math.pow(1.125, chosenItem['Count']));
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
