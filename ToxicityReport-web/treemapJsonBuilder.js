var treemapJsonBuilder = function () {

	var json;

	var init = function (appName) {
		json = {
			name: appName,
			children: []
		};
	}

	var addNode = function (nodePath, nodeName, properties) {
		var segments = nodePath.split('.');
		var node = (segments.length == 0) ? json : getClosestNode(segments, json);
		var leafNode = {
			name: nodeName
		};
		$.extend(leafNode, properties);
		node.children.push(leafNode);
	};

	var getClosestNode = function (segments, subTree) {
		var node = subTree;
		for (var level = 0; level < segments.length; level++) {
			var segmentName = segments[level];
			node = getNode(node.children, segmentName);
		};
		return node;
	};

	var getNode = function (nodes, name) {
		var node;
		nodes.forEach(function (child) {
			if (child.name == name) {
				node = child;
			};
		});
		if (!node) {
			var node = {
				name: name,
				children: []
			};
			nodes.push(node);
			nodes.sort(function (a, b) {
				return ((a.lines < b.lines) ?
	                -1 :
	                ((a.lines > b.lines) ? 1 : 0));
			});

		};
		return node;
	};

	return {
		getJSON: function () { return json; },
		initRoot: init,
		addNode: addNode
	}

} ();