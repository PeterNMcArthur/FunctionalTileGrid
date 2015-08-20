require('angular');

var gridApp = angular.module('gridApp', []);

var gridController = function($scope){
    
    var animals = [
      { name: 'Fluffykins', species: 'rabbit' },
      { name: 'Caro',       species: 'dog' },
      { name: 'Hamilton',   species: 'dog' },
      { name: 'Harold',     species: 'fish' },
      { name: 'Ursula',     species: 'cat' },
      { name: 'Jimmy',      species: 'fish' }
    ]
    this.test = animals.map((animal) => animal.species)

}
gridController.$inject = ['$scope'];
gridApp.controller('gridController', gridController);
