angular.module('E50Charts')
.factory('E50ChartConfig', function() {
  return {
    overlayColor: '#ffffff',
    chartTypes : {
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
    }
  };
});