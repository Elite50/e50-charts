angular.module('E50Charts')
  .directive('e50Chart', function($timeout, E50ChartFactory) {

    return {
      scope: {
        data: '=',
        xaxis: "=?",
        chart: '=?'
      },
      templateUrl: '../src/templates/bar-chart.html',
      link: function(scope, elm) {

        var chart = E50ChartFactory.newInstance();
        chart.setElement(elm);
        chart.setScope(scope);
        chart.setData(scope.data);

        if(scope.xaxis) {
          chart.enableXAxis(scope.xaxis.columns);
          if(scope.xaxis.isTimeseries) {
            chart.enableTimeseries(scope.xaxis.dateFormat, scope.xaxis.tickFormat);
          }
        }

        chart.generate();

        scope.chartTypes = chart.chartTypes;
        var ids = angular.copy(chart.dataIds);
        ids.unshift("All");
        scope.dataIds = ids;
        scope.dataId = "All";

        scope.executeTransform = chart.executeTransform.bind(chart);
        scope.stack = chart.stack.bind(chart);
        scope.unstack = chart.unstack.bind(chart);
      }
    };
  });