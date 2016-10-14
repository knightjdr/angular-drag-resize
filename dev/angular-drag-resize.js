//for resizing, elements must have position: relative, fixed or absolute
//draggable elements will have their position set to fixed up first drag

angular.module('angular.drag.resize', [])
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
        link: function(scope, elem, attr) {
          var dimension = {};
          var iconPosition = adrConfig.iconPosition;
          var mode = attr.resize && adrConfig.modes.indexOf(attr.resize) > -1 ? attr.resize : adrConfig.mode;
          var position = {};
          //create button for resizing
          var btn = document.createElement("img");
          btn.className = 'resize-icon';
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
            dimension.width = elem.prop('offsetWidth');
            dimension.height = elem.prop('offsetHeight');
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
          	elem.css(newDimensions);
          	return false;
        	}
          function mouseup() {
         	  $document.unbind('mousemove', mousemove);
         		$document.unbind('mouseup', mouseup);
        	}
          elem.append(btn);
          //show button on hover
          elem.bind('mouseover', function() {
            btn.style.visibility = 'visible';
          });
          elem.bind('mouseout', function() {
            btn.style.visibility = 'hidden';
          });
        }
    };
  }])
  .directive('draggable', ['$document' , function($document) {
    return {
      restrict: 'A',
      link: function(scope, elem) {
        var position = {};
      	elem.bind('mousedown', function($event) {
          elem.css({position: 'fixed'});
        	position.x = elem.prop('offsetLeft');
        	position.y = elem.prop('offsetTop');
        	position.initialMouseX = $event.clientX;
          position.initialMouseY = $event.clientY;
        	$document.bind('mousemove', mousemove);
        	$document.bind('mouseup', mouseup);
        	return false;
        });

        function mousemove($event) {
          var dx = $event.clientX - position.initialMouseX;
        	var dy = $event.clientY - position.initialMouseY;
        	elem.css({
          	top:  position.y + dy + 'px',
          	left: position.x + dx + 'px'
          });
        	return false;
        }
        function mouseup() {
          $document.unbind('mousemove', mousemove);
         	$document.unbind('mouseup', mouseup);
        }
      }
    };
	}])
;
