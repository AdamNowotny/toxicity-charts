Toxicity Charts
===============

Shows code metrics for .NET code based on output from Visual Studio Code Metrics PowerTool.

All data is processed on the client and no information about the code you're checking is transfered to the website.

Why
===

There are some tools that generate code metrics for .NET code.
The problem is that they are either expensive, take a long time to setup or the graphs they generate ale not well suited to include in a presentation.

I wanted to create a toxicity chart as described by Erik Dörnenburg but for .NET code. Some existing tools helped with converting VS Metrics Powertool output to useful values, but then you had to create the graph manually in Excel.

Toxicity charts shortens the task, so all you need is the metrics file and quickly you get good looking charts giving you some hints as to what the quality of your application is.

How to use
==========

* Install Visual Studio Code Metrics PowerTool
* Create metrics XML file (scripts/FxCopMetrics.bat can be helpful)
* Open http://toxicity.azurewebsites.net/
* Load the generated file using the website (drag to the file control on the page)

Tested only in Google Chrome.

Screenshots
===========

Treemap
-------

Chart information: http://erik.doernenburg.com/2010/05/metrics-tree-maps/

Lines of code in a class determines the _size_ of the box.
The _color_ is dependent on the graph you choose:
* white - 0 (all good here)
* red - threshold (getting bad)
* black - 4 times the threshold (that's scary)

<img src="https://github.com/AdamNowotny/toxicity-charts/raw/master/docs/treemap.png" alt="Treemap chart screenshot">

Toxicity
--------

Chart information: http://erik.doernenburg.com/2008/11/how-toxic-is-your-code/

The higher the bar, the more toxic the class is. List of classes you should take a look at shown in the table.

<img src="https://github.com/AdamNowotny/toxicity-charts/raw/master/docs/toxicity.png" alt="Toxicity chart screenshot">

License
=======

This code is distributed under Apache License version 2.0

Thanks
======

* [Erik Dörnenburg](http://erik.doernenburg.com/) - descriptions of the graphs and how to calculate the values

Libraries used
==============

* [D3](http://d3js.org/) - used for treemap
* [NVD3](http://nvd3.com/) - used multibar chart for toxicity
* [AMD-feature](https://github.com/jensarps/AMD-feature) - plugin for Require-JS that adds support for feature toggles so I didn't have to use branches for experiments
* HTML 5 FileReader
* [Require-JS](http://requirejs.org/)
* [jQuery](http://jquery.com/)
* [Twitter bootstrap](http://twitter.github.com/bootstrap/)
* [Jasmine](http://pivotal.github.com/jasmine/)

Build
=====
* Install [node.js](http://nodejs.org/)
* Install [grunt](https://github.com/cowboy/grunt), [grunt-contrib](https://github.com/gruntjs/grunt-contrib)
	npm install grunt grunt-contrib
* Run default grunt target to build
	node_modules/.bin/grunt