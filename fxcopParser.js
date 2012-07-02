define(['jquery', 'treemapDataBuilder'], function ($, dataBuilder) {

	var ignoredFiles = ['generated.cs', 'designer.cs', 'reference.cs', 'assemblyInfo.cs'],
		threshold = {
			'LinesOfCode': 30,
			'CyclomaticComplexity': 10,
			'ClassCoupling': 30
		};

	function fxcopParser (xmlString) {
		var xml = $($.parseXML(xmlString));
		if (!fxcopParser.isValidFile(xml)) return null;
		var json = parse(xml.find('Module'));
		json.sort(function (a, b) {
			return b.toxicity - a.toxicity;
		});
		return json;
	}

	fxcopParser.isValidFile = function (xml) {
		return xml.find('CodeMetricsReport').length !== 0;
	};

	var parse = function (xml) {
		var json = [];
		xml.find('Type').each(function (index, value) {
			var type = createType($(value));
			if (isAnyAboveLimit(type)) {
				json.push(type);
			}
		});
		return json;
	};

	var createType = function (typeNode) {
		var newType = {
			namespace: typeNode.closest('Namespace').attr('Name'),
			name: typeNode.attr('Name'),
			lines: getLines(typeNode),
			linesPerMethod: getNormalisedMetric(typeNode, 'LinesOfCode'),
			complexity: getNormalisedMetric(typeNode, 'CyclomaticComplexity'),
			coupling: getNormalisedMetric(typeNode, 'ClassCoupling')
		};
		newType.toxicity = newType.linesPerMethod + newType.complexity + newType.coupling;
		return newType;
	};

	var isAnyAboveLimit = function (properties) {
		return (properties.linesPerMethod >= 1) ||
			(properties.complexity >= 1) ||
			(properties.coupling >= 1);
	};

	var getLines = function (typeNode) {
		var linesValue = typeNode.find('> Metrics Metric[Name=LinesOfCode]').attr('Value').replace(',', '');
		return parseInt(linesValue, 10);
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