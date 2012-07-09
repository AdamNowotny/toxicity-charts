define(['jquery'], function ($) {

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

	function parse (xml) {
		var json = [];
		xml.find('Type').each(function (index, value) {
			var type = createType($(value));
			if (isAnyAboveLimit(type)) {
				json.push(type);
			}
		});
		return json;
	}

	function createType (typeNode) {
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
	}

	function isAnyAboveLimit (properties) {
		return (properties.linesPerMethod >= 1) ||
			(properties.complexity >= 1) ||
			(properties.coupling >= 1);
	}

	function getLines (typeNode) {
		var linesValue = typeNode.find('> Metrics Metric[Name=LinesOfCode]').attr('Value').replace(',', '');
		return parseInt(linesValue, 10);
	}

	function getNormalisedMetric (typeNode, metricName) {
		var result = typeNode
			.find('Member')
			.filter(isMemberValid)
			.find('Metric[Name=' + metricName + ']')
			.toArray()
			.map(function extractValue (metricNode, index) {
				return $(metricNode).attr('Value');
			})
			.map(function (value) {
				return normalise(value, threshold[metricName]);
			})
			.reduce(function sum(first, second) {
				return parseFloat(first) + parseFloat(second);
			}, 0);
		return result;
	}

	function normalise(value, threshold) {
		var raw = parseInt(value, 10) / threshold;
		var normalisedValue = (raw < 1) ? 0 : raw;
		return normalisedValue;
	}

	function isMemberValid (index) {
		var fileName = $(this).attr('File');
		return fileName && !ignoredFiles.some(function fileIgnored(value) {
			return endsWith(fileName, value);
		});
	}

	function endsWith(str, suffix) {
		str = (str || '');
		suffix = (suffix || '');
		return str.indexOf(suffix, str.length - suffix.length) !== -1;
	}

	return fxcopParser;

});