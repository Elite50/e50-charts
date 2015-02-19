angular.module('E50Charts', []);
angular.module('E50Charts')
  .directive('e50Chart', ["$timeout", "E50ChartFactory", function($timeout, E50ChartFactory) {
    var template = [
      '<div class="e50-charts">',
        '<div class="chart"></div>',
      '</div>'
    ];
    return {
      scope: {
        data: '=',
        xaxis: "=?",
        chart: '=?'
      },
      template: template.join(""),
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
  }]);
angular.module('E50Charts')
.factory('E50Chart', function() {

  function drawChart() {
    this.main.append('rect')
      .style('fill', 'white')
      .attr('x', 0.5)
      .attr('y', -0.5)
      .attr('width', this.width)
      .attr('height', this.height)
    .transition().duration(1500)
      .attr('x', this.width)
      .attr('width', 0)
    .remove();    
  };

  function E50Chart() {
    this.chart = null;
    this.chartSelector = '.chart';
    this.element = null;
    this.dataChartTypes = {};
    this.chartElm = null;
    this.dataIds = [];
    this.chartTypes = {
      'pie': 'Pie',
      'donut': 'Donut',
      'bar': 'Bar',
      'step': 'Step',
      'area-step': 'Area Step',
      'line': 'Line',
      'area': 'Area',
      'spline': 'Spline',
      'area-spline': 'Area Spline',
      'scatter': 'Scatter'
    };
    this.config = {
      data: {
        columns: [],
        types: {}
      },
      axis: {},
      tooltip: {
        show:true
      },
      bar: {
        width: {
          ratio: 0.5
        }
      },
      pie: {
        expand: false
      },
      donut: {
        expand: false
      },
      color: {
        pattern: ['#00aeef', "#666666", "#eaa14b", '#71ac5f']
      },
      onresized: function () {
        drawChart.call(this);
      },    
      oninit: function () {                
        drawChart.call(this);
      }      
    };
  }

  E50Chart.prototype.setElement = function(elm) {
    this.element = elm;
  };

  E50Chart.prototype.setScope = function(scope) {
    this.scope = scope;
  };

  E50Chart.prototype.setData = function(data) {
    var that = this;
    Object.keys(data).forEach(function(key) {
      if(that.dataIds.indexOf(key) === -1) {
        that.dataIds.push(key);
      }
    });
    angular.forEach(data, function(data, key) {
      var dataColumns = angular.copy(data.columns);
      dataColumns.unshift(key);
      that.config.data.columns.push(dataColumns);
      that.config.data.types[key] = data.type;
    });
  };

  E50Chart.prototype.load = function(data) {
    this.setData(data);
    this.chart.load(this.config.data);
  };

  E50Chart.prototype.unload = function(dataId) {
    this.chart.unload(dataId);  
  };

  E50Chart.prototype.enableXAxis = function(axisData) {
    if(axisData) {
      var axisValues = axisData.x;
      axisValues.unshift('x')
      this.config.data.columns.unshift(axisValues);
    }
    this.config.data.x = 'x';
    this.config.axis.x = {
      type: 'category'
    };
  };

  E50Chart.prototype.enableTimeseries = function(xFormat, outputFormat) {
    if(xFormat) {
      this.config.data.xFormat = xFormat;
    }
    this.config.axis.x = {
      type: 'timeseries',
      tick: {
        format: outputFormat || xFormat
      }
    };
  };

  E50Chart.prototype.generate = function(override) {
    angular.extend(this.config, override);
    this.chartElm = this.element.find(this.chartSelector)[0];
    this.config.bindto = this.chartElm;
    this.chart = c3.generate(this.config);
  };

  E50Chart.prototype.transform = function(chartType, dataId) {
    if(this.dataIds.indexOf(dataId) === -1) return false;
    this.chart.transform(chartType, dataId);
  };

  E50Chart.prototype.executeTransform = function(type, dataId) {
    var hasId = dataId.toLowerCase() !== "all" || !dataId;
    var action = hasId ? 'transform' : 'transformAll';
    
    if(!type) {
      alert("Please select a chart type to transform the data");
    }
    
    if(type === 'pie' || type === 'donut') {
      action = 'transformAll';
    }

    this[action](type, dataId);    
  }

  E50Chart.prototype.transformAll = function(chartType) {
    this.chart.transform(chartType, this.dataIds);
  };

  E50Chart.prototype.show = function(dataIds) {
    this.chart.show(dataIds);
  };

  E50Chart.prototype.hide = function(dataIds) {
    this.chart.hide(dataIds);
  };

  E50Chart.prototype.toggle = function(dataIds) {
    this.chart.toggle(dataIds);
  };

  E50Chart.prototype.focus = function(dataIds) {
    this.chart.focus(dataIds);
  };

  E50Chart.prototype.defocus = function(dataIds) {
    this.chart.defocus(dataIds);
  };

  E50Chart.prototype.stack = function() {
    this.chart.groups([this.dataIds]);
  };

  E50Chart.prototype.unstack = function() {
    var map = [];
    angular.forEach(this.dataIds, function(value) {
      map.push([value]);
    });
    this.chart.groups(map);
  };

  return E50Chart;
});






angular.module('E50Charts')
.factory('E50ChartFactory', ["E50Chart", function(E50Chart) {
  return {
    newInstance: function() {
      return new E50Chart();
    }
  };
}]);