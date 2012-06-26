define(['jquery', 'treemapDataBuilder'], function ($, jsonBuilder) {

	var ignoredFiles = ['generated.cs', 'designer.cs', 'reference.cs', 'assemblyInfo.cs'],
		threshold = {
			'LinesOfCode': 30,
			'CyclomaticComplexity': 10,
			'ClassCoupling': 30
		};

	function fxcopParser (appName, xmlString) {
		var xml = $($.parseXML(xmlString));
		if (!fxcopParser.isValidFile(xml)) return null;
		return createJson(appName, xml.find('Module'));
	}

	fxcopParser.isValidFile = function (xml) {
		return xml.find('CodeMetricsReport').length !== 0;
	};

	var createJson = function (appName, xml) {
		jsonBuilder.initRoot(appName);
		xml.find('Type').each(function (index, value) {
			addType($(value));
		});
		return jsonBuilder.json();
	};

	var addType = function (typeNode) {
		var namespaceName = typeNode.closest('Namespace').attr('Name');
		var typeName = typeNode.attr('Name');
		var properties = {
			lines: getLines(typeNode),
			linesPerMethod: getNormalisedMetric(typeNode, 'LinesOfCode'),
			complexity: getNormalisedMetric(typeNode, 'CyclomaticComplexity'),
			coupling: getNormalisedMetric(typeNode, 'ClassCoupling')
		};
		if (isAnyAboveLimit(properties)) {
			jsonBuilder.addNode(namespaceName, typeName, properties);
		}
	};

	var isAnyAboveLimit = function (properties) {
		return (properties.linesPerMethod >= 1) ||
			(properties.complexity >= 1) ||
			(properties.coupling >= 1);
	};

	var getLines = function (typeNode) {
		return typeNode.find('> Metrics Metric[Name=LinesOfCode]').attr('Value').replace(',', '');
	};

	var getNormalisedMetric = function (typeNode, metricName) {
		var result = typeNode
			.find('Member')
			.filter(isMemberValid)
			.find('Metric[Name=' + metricName + ']')
			.map(function (index, metricNode) {
				return $(metricNode).attr('Value');
			}).toArray().normalise(threshold[metricName]).sum();
		return result;
	};

	var isMemberValid = function (index) {
		var fileName = $(this).attr('File');
		return fileName && !fileName.endsWithAny(ignoredFiles);
	};

	return fxcopParser;

});