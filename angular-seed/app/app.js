'use strict';

// Declare app level module which depends on views, and components

(function() {

	var myApp = angular.module('myApp', [
	  'ngRoute'
	]);

	myApp.directive('ngEnter', function () {
		return function (scope, element, attrs) {
			element.bind("keydown keypress", function (event) {
				if(event.which === 13) {
					scope.$apply(function () {
						scope.$eval(attrs.ngEnter);
					});
					event.preventDefault();
				}
			});
		};
	});

	myApp.controller('SimpleController', function($scope) {
		// $scope.visible = false;
		var storedProduct;

		$scope.products = [
			{ item: "Heads and Shoulders", productnum: 1921432321, price: 3.42, quantity: 2 },
			{ item: "Cabbage", productnum: 58291032321, price: 2.58, quantity: 3 },
			{ item: "Salmon", productnum: 192143268493, price: 6.98, quantity: 1 },
			{ item: "Hot Cheetos", productnum: 15860923493, price: 4.26, quantity: 1 },
			{ item: "Toilet Paper", productnum: 564738934122, price: 3.95, quantity: 4 },
			{ item: "Printer Paper", productnum: 583413231, price: 6.43, quantity: 2 }
		];

		for (var i = 0; i < localStorage.length; i++){
  		var storedProduct = JSON.parse(localStorage.getItem(localStorage.key(i)));
  		$scope.products.push(storedProduct);
		}

		$scope.getTotal = function() {
			var total = 0;
			for (var i = 0; i < $scope.products.length; i++) {
				total += $scope.products[i].price * $scope.products[i].quantity;
			}
			return total;
		}

		$scope.addToCart = function(item, num, price, quantity) {
			var $error = angular.element('#error');
			if (!item) $error.html("Please enter a product name."); 
			else if (!Number.isInteger(num)) $error.html("Please enter a valid product number.");
			else if (isNaN(price)) $error.html("Please enter a valid price.");
			else if (!Number.isInteger(quantity)) $error.html("Please enter a valid quantity."); 
			else { 

				$error.html("");

				var product = {
					item: item,
					productnum: num,
					price: price,
					quantity: quantity
				};

				$scope.products.push(product);
				$scope.item = $scope.num = $scope.price = $scope.quantity = '';
				localStorage.setItem(item, JSON.stringify(product));
				return true;
			}
			return false;
		}

	});

	myApp.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.otherwise({redirectTo: '/'});
	}]);

})();
