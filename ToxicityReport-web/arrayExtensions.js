Array.prototype.normalise = function (threshold) {
	var normalised = [];
	this.forEach(function (value) {
		var raw = parseInt(value) / threshold;
		var normalisedValue = (raw < 1) ? 0 : raw;
		normalised.push(normalisedValue);
	});
	return normalised;
};

Array.prototype.sum = function () {
	var sum = 0;
	this.forEach(function (value) {
		sum = sum + parseFloat(value);
	});
	return sum;
};

