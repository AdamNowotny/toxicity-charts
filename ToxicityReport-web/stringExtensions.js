String.prototype.endsWithAny = function (suffixes) {
	var match = false;
	var fullString = this;
	suffixes.forEach(function (suffix) {
		if (fullString.endsWith(suffix)) match = true;
	});
	return match;
};

String.prototype.endsWith = function (suffix) {
	var str = (this || '');
	suffix = (suffix || '');
	return str.indexOf(suffix, str.length - suffix.length) !== -1;
};
