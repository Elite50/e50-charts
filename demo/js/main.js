var app = angular.module('app', ['E50Charts']);
app.controller('MainCtrl', function($scope) {

  var d = $scope.data = {
    "Men": {
      columns: [100,20,304,50,1110],
      type: 'bar'
    },
    "Women": {
      columns: [50,25,34,550,1005],
      type: 'area-spline'
    },
    "Children": {
      columns: [510,125,14,350,1305],
      type: 'bar'
    },
    "Other": {
      columns: [410,325,34,150,1205],
      type: 'bar'
    }
  };

  var xAxis = $scope.xAxis = {
    columns: {
      x: ['2014-10-10', '2015-10-10', '2016-10-10', '2017-10-10']
    },
    isTimeseries: true,
    dateFormate: '%Y-%m-%d',
    tickFormat: '%Y' // the format of how you want it displayed on the chart
  };

  $scope.$on('newChart', function(event, chart) {
    console.log(chart);
  });

  $scope.yAxis = {
    tick: {
      format: d3.format("$,")
    }
  };

    $scope.chartTypes = {
      'bar': 'Bar',
      'step': 'Step',
      'area-step': 'Area Step',
      'line': 'Line',
      'area': 'Area',
      'spline': 'Spline',
      'area-spline': 'Area Spline',
      'scatter': 'Scatter'
    };  

});