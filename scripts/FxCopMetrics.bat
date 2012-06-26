@echo off
echo Put your app assemblies with PDB files in same folder as the script and dependencies in a "\dependencies" folder
"c:\Program Files (x86)\Microsoft Visual Studio 10.0\Team Tools\Static Analysis Tools\FxCop\Metrics.exe" /f:*.dll /f:*.exe /o:metrics.xml /d:dependencies