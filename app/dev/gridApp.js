require('angular');

var gridApp = angular.module('gridApp', []);

var gridController = function($scope){
    this.test = "dddd";
}

gridController.$inject = ['$scope'];
gridApp.controller('gridController', gridController);

