define(['jquery'], function ($) {

	'use strict';
	
	var json;

	function convert (data, appName) {
		var json = {
			name: appName,
			children: []
		};
		$(data).each(function (i, d) { addNode(json, d); });
		return json;
	}

	var addNode = function (json, nodeInfo) {
		var segments = nodeInfo.namespace.split('.');
		var deepestNode = (segments.length === 0) ? json : getPathNode(segments, json);
		deepestNode.children.push(nodeInfo);
	};

	convert.getDepth = function (tree) {
		if (!tree.children) return 0;
		var maxChildDepth = 0;
		for (var i = 0; i < tree.children.length; i++) {
			var childDepth = convert.getDepth(tree.children[i]);
			maxChildDepth = Math.max(maxChildDepth, childDepth);
		}
		return maxChildDepth + 1;
	};

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
			if (child.name === name) {
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

	return convert;

});