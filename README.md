Toxicity Charts
===============

Shows code metrics for .NET code based on output from Visual Studio Code Metrics PowerTool.

All data is processed on the client and no information about the code you're checking is transfered to the website.

Why
===

There are some tools that generate code metrics for .NET code.
The problem is that they are either expensive, take a long time to setup or the graphs they generate ale not well suited to include in a presentation.

I wanted to create a toxicity chart as described by Erik Dörnenburg (http://erik.doernenburg.com/2008/11/how-toxic-is-your-code/) but for .NET code. Some existing tools helped with converting VS Metrics Powertool output to useful values, but then you had to create the graph manually in Excel.

Toxicity charts shortens the task, so all you need is the metrics file and quickly you get good looking charts giving you some hints as to what the quality of your application is.

How to use
==========

* Install Visual Studio Code Metrics PowerTool
* Create metrics XML file (scripts/FxCopMetrics.bat can be helpful)
* Open http://toxicity.azurewebsites.net/
* Load the generated file using the website (drag to the file control on the page)

Screenshots
===========

Treemap chart
-------------

<img src="https://github.com/AdamNowotny/toxicity-charts/raw/master/docs/treemap.png" alt="Treemap chart screenshot">

Toxicity chart
--------------

<img src="https://github.com/AdamNowotny/toxicity-charts/raw/master/docs/toxicity.png" alt="Toxicity chart screenshot">

License
=======
This code is distributed under Apache License version 2.0