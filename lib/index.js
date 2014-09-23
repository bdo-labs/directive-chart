
/**
 * Module dependencies.
 */

var Chart = require('nnnick/Chart.js@v1.0.1-beta.4');

/**
 * Expose `chart`.
 */

module.exports = chart;

/**
 * Chart directive.
 *
 * @return {Object}
 */

function chart() {
  return {
    restrict: 'E',
    template: '<canvas></canvas>',
    scope: {
      chartObject: "=value"
    },
    link: link
  }
}

/**
 * Chart-element to chart.js canvas.
 *
 * @param {Object} scope
 * @param {JQLite} element
 * @param {Object} attrs
 */

function link(scope, element, attrs) {
  var canvas  = element.find('canvas')[0];
  var context = canvas.getContext('2d');
  var chart;

  var options = {
    type: attrs.type || 'Line',
    width: attrs.width || 640,
    height: attrs.height || 480
  };
  canvas.width = options.width;
  canvas.height = options.height;

  chart = new Chart(context);

  // Chart-type
  // @see http://www.chartjs.org/docs/

  scope.$watch(function(){ return element.attr('type'); }, function(value){
    if (!value) return;
    options.type = value;
    var chartType = options.type;
    chart[chartType](scope.chartObject.data, scope.chartObject.options);
  });

  scope.$watch(function() { return scope.chartObject; }, function(value) {
    if (!value) return;
    var chartType = options.type;
    chart[chartType](scope.chartObject.data, scope.chartObject.options);
  });
}

