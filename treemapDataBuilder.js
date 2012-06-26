define(['jquery'], function ($) {

	var json;

	var init = function (appName) {
		json = {
			name: appName,
			children: []
		};
	};

	var addNode = function (nodePath, nodeName, properties) {
		var segments = nodePath.split('.');
		var node = (segments.length === 0) ? json : getPathNode(segments, json);
		var leafNode = {
			name: nodeName
		};
		$.extend(leafNode, properties);
		node.children.push(leafNode);
	};

	function getDepth(tree) {
		if (!tree.children) return 0;
		var maxChildDepth = 0;
		for (var i = 0; i < tree.children.length; i++) {
			var childDepth = getDepth(tree.children[i]);
			maxChildDepth = Math.max(maxChildDepth, childDepth);
		}
		return maxChildDepth + 1;
	}

	var getPathNode = function (segments, subTree) {
		var node = subTree;
		for (var level = 0; level < segments.length; level++) {
			var segmentName = segments[level];
			node = getNode(node.children, segmentName) || createNode(node.children, segmentName);
		}
		return node;
	};

	var getNode = function (nodes, name) {
		var node;
		nodes.forEach(function (child) {
			if (child.name == name) {
				node = child;
			}
		});
		return node;
	};

	var createNode = function (nodes, name) {
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
		return node;
	};

	return {
		json: function () { return json; },
		getDepth: getDepth,
		initRoot: init,
		addNode: addNode
	};

});