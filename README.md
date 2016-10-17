# angular-drag-resize
Angular.js directives for dragging and resizing elements.

## Demo

https://plnkr.co/I8ebvx

## Motivation
The drag directive is taken from the angular documentation (https://docs.angularjs.org/guide/directive), which unfortunately breaks the css resize property. The resize directive found in this package allows for a draggable element to also be resized.

## Installation
Download the repo and include:
```
'<script src="../dist/angular-drag-resize.min.js"></script>'
```

Or via bower:
```
$ bower install angular-drag-resize
```

## Usage

Inject 'angular.drag.resize' into your app:

```
angular.module('myApp', ['angular.drag.resize']);
```

Then add 'draggable' and/or 'resize' to an element.

```
'<div draggable resize>
My draggable and resizeable div
</div>'
```

The resize attribute can be set to 'horizontal' or 'vertical' to restrict resizing to one dimension.

```
'<div resize="horizontal"></div>'
```

## Notes
For resizing to work, an element must have its css position as relative, fixed or absolute.

## License
MIT.
