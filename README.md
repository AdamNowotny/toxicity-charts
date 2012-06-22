ToxicityReport
==============

Show toxicity metrics for .NET code

How to use
==========

* Install Visual Studio Code Metrics PowerTool
* Put your app assemblies with PDB files in "scripts" with dependencies in a "\dependencies"
* Create metrics report by running FxCopMetrics.bat in folder where the DLLs are located
* Open http://toxicity.azurewebsites.net/
* Load your XML file using the website (drag to the file control on the page)