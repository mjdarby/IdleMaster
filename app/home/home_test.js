'use strict';

describe('myApp.home module', function() {

  beforeEach(module('myApp.home'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('the button', function(){

    it('should generate money on click', function() {
      var $scope, controller;
      $scope = {};
      var controller = $controller('HomeCtrl', { $scope: $scope });
      $scope.money = 0;

      $scope.moneyPerClick = 1;
      $scope.moneyClick();
      expect($scope.money).toEqual(1);

      $scope.moneyPerClick = 2;
      $scope.moneyClick();
      expect($scope.money).toEqual(3);
    });

  });
});
