(function ($,_) {
	function inherits(superClass, subClass) {
		subClass.prototype = Object.create(superClass.prototype);
		subClass.prototype.constructor = subClass;
	}

	var MIN_WIDTH = 10;
	var MIN_HEIGHT = 10;
	function Camera(vector,dimension) {
		this.vector = vector || new Victor();
		this.dimension = dimension || new Dimension();
	}
	Camera.prototype = {
		get x()  {
			return this.vector.x - (this.dimension.width / 2) ;
		},
		set x(value)  {
			this.vector.x = value + (this.dimension.width / 2);;
		},
		get y()  {
			return this.vector.y - (this.dimension.height / 2);
		},
		set y(value)  {
			this.vector.y = value + (this.dimension.height / 2);;
		},
		get position() {
			return this.vector;
		},
		set position(value) {
			this.vector = value;
		}
	}

	function Scene(vector,dimension,elements) {
		this.vector = vector || new Vector();
		this.dimension = dimension || new Dimension();
		this.list = [];
		if(true){

		}
	}
	function Dimension(width, height) {
		this.width = width || MIN_WIDTH;
		this.height = height || MIN_HEIGHT;
	}

	function Element(vector,color) {
		this.vector = vector || new Victor(0,0);
		this.color  = color || '#000';
	}
	Element.prototype = {
		constructor : Element,
		get y (){
			if(this.dimension){
				return this.vector.y - (this.dimension.height / 2);
			}else{
				return this.vector.y;
			}
		},
		set y (value){
			if(this.dimension){
				this.vector.y = value + (this.dimension.height / 2);
			}else{
				this.vector.y = value;
			}
		},
		get x (){
			if(this.dimension){
				return this.vector.x - (this.dimension.width / 2);
			}else{
				return this.vector.x;
			}
		},
		set x (value){
			if(this.dimension){
				this.vector.x = value + (this.dimension.width / 2);
			}else{
				this.vector.x = value;
			}
		},
		get width (){
			return this.dimension.width;
		},
		set width (value){
			this.dimension.width = value
		},
		get height (){
			return this.dimension.height;
		},
		set height (value){
			this.dimension.height = value
		}

	}
	Element.prototype.draw = function (ctx,camera) {
		ctx.save();
		ctx.fillStyle =this.color;
		ctx.fillRect(this.x + camera.x,this.y + camera.y,this.width,this.height);
		ctx.restore();
	};

	function Rectangle(vector,dimension,color) {
		Element.call(this,vector,color);
		this.dimension = dimension || new Dimension();
	}
	inherits(Element,Rectangle);

	function Wall(vector,dimension,color) {
		Rectangle.call(this,vector,dimension,color);
	}

	inherits(Rectangle,Wall);

	$.Camera = Camera;
	$.Dimension = Dimension;
	$.Rectangle = Rectangle;
	$.Element = Element;
	$.Wall = Wall;
	$.Scene = Scene;
})(window,document);
