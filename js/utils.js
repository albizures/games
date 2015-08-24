(function ($) {
	$.isUnd = function (obj) {
		return typeof obj === 'undefined';
	};
	$.rnd = function (min, max) {
		return Math.floor(min + Math.random() * (max - min));
  };
	function definePropertyNoEnumerable(name,value) {
		Object.defineProperty(Object.prototype,name,{
			enumerable : false,
			value : value
		});
	}
	definePropertyNoEnumerable('isNumber',function(){
		return typeof this.valueOf() === "number";
	});
	definePropertyNoEnumerable('isFunc',function () {
		return typeof this.valueOf() === 'function';
	});
	definePropertyNoEnumerable('isString',function () {
		return typeof this.valueOf() === 'string';
	});
	definePropertyNoEnumerable('isArray',function () {
		return !isUnd(this.length);
	});
	definePropertyNoEnumerable('isElement',function () {
		return this instanceof 'Element';
	});
	definePropertyNoEnumerable('isScene',function () {
		return this instanceof 'Scene';
	});
	definePropertyNoEnumerable('isRectangle',function () {
		return this instanceof 'Rectangle';
	});
	definePropertyNoEnumerable('isWall',function () {
		return this instanceof 'Walls'
	});

})(window);
