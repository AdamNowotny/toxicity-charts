ToxicityReport
==============

Show toxicity metrics for .NET code

How to use
==========

* Install Visual Studio Code Metrics PowerTool
* Put your app assemblies with PDB files in one folder with dependencies in a "\dependencies"
* Create metrics report by running FxCopMetrics.bat in folder where the DLLs are located
* Run "FxCopConverter your_fxcop_report.xml", this will create JSON file
* Open http://toxicity.azurewebsites.net/
* Load your JSON file using the website (drag to the file control on the page)