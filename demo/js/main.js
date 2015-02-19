var app = angular.module('app', ['E50Charts']);
app.controller('MainCtrl', function($scope) {

  var d = $scope.data = {
    "Men": {
      columns: [100,20,304,50,60],
      type: 'bar'
    },
    "Women": {
      columns: [50,25,34,550,605],
      type: 'area-spline'
    },
    "Children": {
      columns: [510,125,14,350,105],
      type: 'bar'
    },
    "Other": {
      columns: [410,325,34,150,205],
      type: 'bar'
    }
  };

  var xAxis = $scope.xAxis = {
    columns: {
      x: ['2014-10-10', '2015-10-10', '2016-10-10', '2017-10-10']
    },
    isTimeseries: true,
    tickFormat: '%Y' // the format of how you want it displayed on the chart
  };

});