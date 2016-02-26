angular.module('E50Charts')
  .directive('e50Chart', function($timeout, E50ChartFactory, $rootScope) {
    var template = [
      '<div class="e50-charts">',
        '<div class="chart"></div>',
      '</div>'
    ];
    return {
      scope: {
        data: '=',
        xaxis: "=?",
        yaxis: "=?",
        chart: '@',
        override: "=?"
      },
      template: template.join(""),
      link: function(scope, elm) {

        var body = $('body');
        elm.find('.chart').hover(function() {
          body.css('overflow', 'hidden');
        }, function() {
          $timeout(function() {
            body.css('overflow', 'auto');
          }, 200);
        });

        var chart = E50ChartFactory.newInstance();
        chart.setElement(elm);
        chart.setScope(scope);
        chart.setData(scope.data);

        if(scope.xaxis) {
          chart.enableXAxis(scope.xaxis.columns);
          if(scope.xaxis.isTimeseries) {
            chart.enableTimeseries(scope.xaxis.dateFormat, scope.xaxis.tickFormat, scope.xaxis.tickCount);
          }
        }

        if(scope.yaxis) {
          chart.config.axis.y = scope.yaxis;
        }

        chart.generate(scope.override);

        scope.chartTypes = chart.chartTypes;
        var ids = angular.copy(chart.dataIds);
        ids.unshift("All");
        scope.dataIds = ids;
        scope.dataId = "All";

        scope.executeTransform = chart.executeTransform.bind(chart);
        scope.stack = chart.stack.bind(chart);
        scope.unstack = chart.unstack.bind(chart);

        if(scope.chart) {
          $rootScope.$broadcast(scope.chart, chart);
        }
      }
    };
  });
