(function() {
	'use strict';

  angular
    .module('demo', ['angular.drag.resize'])
    .provider('adrConfig', function adrConfigProvider(){
      //defaults
      var defaultConfig = {
        iconPosition: [0, 0],
        mode: 'all',
        modes: ['all', 'horizontal', 'vertical']
      };
      var config = angular.extend({}, defaultConfig);
      this.$get = [function(){
        return {
          iconPosition: config.iconPosition,
          mode: config.mode,
          modes: config.modes
        };
      }];
    })
    .directive('resize', ['adrConfig', '$document', function(adrConfig, $document) {
      return {
          restrict: 'A',
          link: function(scope, element, attr) {
            var dimension = {};
            var iconPosition = adrConfig.iconPosition;
            var mode = attr.resize && adrConfig.modes.indexOf(attr.resize) > -1 ? attr.resize : adrConfig.mode;
            var position = {};
            //create button for resizing
            var btn = document.createElement("span");
            btn.style.width = '15px';
            btn.style.height = '15px';
            btn.innerHTML = "<svg>\
              <circle cx='12.5' cy='2.5' r='2' fill='#777777'></circle>\
              <circle cx='7.5' cy='7.5' r='2' fill='#777777'></circle>\
              <circle cx='12.5' cy='7.5' r='2' fill='#424242'></circle>\
              <circle cx='2.5' cy='12.5' r='2' fill='#777777'></circle>\
              <circle cx='7.5' cy='12.5' r='2' fill='#424242'></circle>\
              <circle cx='12.5' cy='12.5' r='2' fill='#212121'></circle></svg>"
            ;
            btn.style.bottom = iconPosition[0] + 'px';
            btn.style.right = iconPosition[1] + 'px';
            btn.style.position = 'absolute';
            btn.style.visibility = 'hidden';
            if(mode == 'horizontal') {
              btn.style.cursor = 'ew-resize';
            }
            else if(mode == 'vertical') {
              btn.style.cursor = 'ns-resize';
            }
            else {
              btn.style.cursor = 'nwse-resize';
            }
            //bind resize function to button;
            btn.onmousedown = function($event) {
              $event.stopImmediatePropagation();
              position.x = $event.clientX;
              position.y = $event.clientY;
              dimension.width = element.prop('offsetWidth');
              dimension.height = element.prop('offsetHeight');
            	$document.bind('mousemove', mousemove);
            	$document.bind('mouseup', mouseup);
            	return false;
          	};
          	function mousemove($event) {
              var deltaWidth = dimension.width - (position.x - $event.clientX);
            	var deltaHeight = dimension.height - (position.y - $event.clientY);
              var newDimensions = {};
              if(mode == 'horizontal') {
                newDimensions = {
                	width:  deltaWidth + 'px'
              	};
              }
              else if(mode == 'vertical') {
                newDimensions = {
                	height: deltaHeight + 'px'
              	};
              }
              else {
                newDimensions = {
                	width:  deltaWidth + 'px',
                	height: deltaHeight + 'px'
              	};
              }
            	element.css(newDimensions);
            	return false;
          	}
            function mouseup() {
           	  $document.unbind('mousemove', mousemove);
           		$document.unbind('mouseup', mouseup);
          	}
            element.append(btn);
            //show button on hover
            element.bind('mouseover', function() {
              btn.style.visibility = 'visible';
            });
            element.bind('mouseout', function() {
              btn.style.visibility = 'hidden';
            });
          }
      };
    }])
    .directive('draggable', ['$document' , function($document) {
      return {
        restrict: 'A',
        link: function(scope, element) {
          var position = {x: 0, y: 0};
        	element.bind('mousedown', function($event) {
            //element.css({position: 'fixed'});
            event.preventDefault();
            position.startX = event.pageX - position.x;
            position.startY = event.pageY - position.y;
            $document.on('mousemove', mousemove);
            $document.on('mouseup', mouseup);
          	return false;
          });
          function mousemove(event) {
            position.y = event.pageY - position.startY;
            position.x = event.pageX - position.startX;
            element.css({
              top: position.y + 'px',
              left:  position.x + 'px'
            });
          }
          function mouseup() {
            $document.off('mousemove', mousemove);
            $document.off('mouseup', mouseup);
          }
        }
      };
  	}])
  ;
})();
