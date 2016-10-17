# angular-drag-resize
Angular.js directives for dragging and resizing elements.

## Demo

https://plnkr.co/I8ebvx

## Motivation
The drag directive is taken from the angular documentation (https://docs.angularjs.org/guide/directive), which unfortunately breaks the css resize property. The resize directive found in this package allows for a draggable element to also be resized.

## Installation
Download the repo and include:
<pre><code>&lt;script src="dist/angular-drag-resize.min.js"&gt;&lt;/script&gt;</code></pre>

Or via bower:
```
$ bower install angular-drag-resize
```

## Usage

Inject angular.drag.resize into your app:

```
angular.module('myApp', ['angular.drag.resize']);
```

Then add draggable and/or resize to an element.

<pre><code>&lt;div draggable resize&gt;
    My draggable and resizeable div
&lt;/div&gt;
</code></pre>

The resize attribute can be set to horizontal or vertical to restrict resizing to one dimension.


<pre><code>&lt;div resize="horizontal"&gt;&lt;/div&gt;
</code></pre>

## Notes
For resizing to work, an element must have its css position as relative, fixed or absolute.

## License
MIT.
