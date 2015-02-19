angular.module('E50Charts')
.factory('E50ChartFactory', function(E50Chart) {
  return {
    newInstance: function() {
      return new E50Chart();
    }
  };
});