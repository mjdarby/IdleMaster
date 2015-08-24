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

  // Stuff to buy with money
  $scope.items = {};
  $scope.newItem = function(shortName, longName, countText, baseCost, fans) {
    $scope.items[shortName] = {'ShortName': shortName, 'LongName': longName,
                               'BaseCost': baseCost, 'Cost': baseCost,
                               'Count': 0, 'Fans': fans, 'CountText': countText,
                               'Revealed': false};
  };
  $scope.newItem("AkibaMeet", "Akiba Meet And Greet!", "Hands shaken", 10, 2);
  $scope.newItem("NewAlbum", "Release a new album", "Records sold", 80, 10);
  $scope.newItem("NewCM", "Shoot a commercial", "Products endorsed", 200, 25);
  $scope.newItem("PerformConcert", "Perform a concert", "Glowsticks lit", 1000, 110);

  // Stuff to upgrade
  $scope.upgrades = {};
  $scope.newUpgrade = function(shortName, longName, description, cost, func) {
    $scope.upgrades[shortName] = {'ShortName': shortName, 'LongName': longName,
                                  'Description': description, 'Cost': cost,
                                  'Function': func, 'Revealed': true};
  };
  var doubleFans = function() {
    $scope.fans *= 2;
  };
  $scope.newUpgrade("TestUpgrade", "Super Cool Upgrade", "Not For Distribution",
                   10, false);

  // Stuff to achieve
  $scope.achievements = {};

  // Game loop functions
  $scope.revealItem = function() {
    for (var itemName in $scope.items) {
      var item = $scope.items[itemName];
      if (!item.Revealed && $scope.money > item.Cost / 2) {
        item.Revealed = true;
      }
    }
  };

  $scope.addMoney = function() {
    $scope.moneyToAddThisLoop += $scope.moneyPerSecond / $scope.frameRate;
    var numToAdd = Math.floor($scope.moneyToAddThisLoop);
    $scope.moneyToAddThisLoop -= numToAdd;
    $scope.money += numToAdd;
  }

  // Game loop
  $scope.gameLoop = function() {
    $scope.addMoney();
    $scope.revealItem();
  };

  // Player actions
  $scope.moneyClick = function() {
    $scope.money += $scope.moneyPerClick;
  };

  $scope.spendMoney = function(item) {
    // Items
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

    // Upgrades
    if (item in $scope.upgrades) {
      var chosenUpgrade = $scope.upgrades[item];
      if ($scope.money >= chosenUpgrade['Cost']) {
        // Update stats
        $scope.money -= chosenUpgrade['Cost'];

        // Award upgrade and perform function if necessary
        chosenUpgrade['Purchased'] = true;
        chosenUpgrade['Revealed'] = false;
        if (chosenUpgrade['Function']) {
          chosenUpgrade['Function']();
        }
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
