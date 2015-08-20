require('angular');

var gridApp = angular.module('gridApp', []);

var gridController = function($scope){
    
    var tiles = [
    { 
        title: 'Tile 1', 
        size: 'wide' 
    },
    { 
        title: 'Tile 2',       
        size: 'small' 
    },
    { 
        title: 'Tile 3',   
        size: 'small' 
    },
    { 
        title: 'Tile 4',     
        size: 'wide' 
    },
    { 
        title: 'Tile 5',     
        size: 'large' 
    },
    { 
        title: 'Tile 6',      
        size: 'wide' 
    }
    ]
    this.test = tiles.map((tiles) => tiles.title)

}
gridController.$inject = ['$scope'];
gridApp.controller('gridController', gridController);
