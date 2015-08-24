(function ($,_) {
	var KEY_A = 65,
			KEY_W = 87,
			KEY_S = 83,
			KEY_D = 68;
	$.game = {
		directions :[KEY_A,KEY_W,KEY_S,KEY_D],
		keypresses : {},
		events : {
			callbacks : {},
			add : function (name,prefix,callback) {
				var id = name + '.' + prefix;
				if(isUnd(this.callbacks[id])){
					this.callbacks[id] = callback;
					_.addEventListener(name,callback);
				}else{
					throw new Error();
				}
			},
			remove : function (name,prefx) {
				var id = name + '.' + prefix;
				if(!isUnd(this.callbacks[id])){
					this.callbacks[id]
					_.removeEventListener(name,this.callbacks[id]);
				}else{
					throw new Error();
				}
			}
		},
		list : [],
		update : function () {
			//console.log(this.keypresses);
			for (var index in this.keypresses) {
				if(this.keypresses[index]){
					var expo = 10
					var accions = {
						65 : function () {
							this.currentCamera.x += 1*expo;
						},
						68 : function () {
							this.currentCamera.x -= 1*expo;
						},
						87 : function () {
							this.currentCamera.y += 1*expo;
						},
						83  : function () {
							this.currentCamera.y -= 1*expo;
						}
					}
					accions[this.directions[index]].bind(this)();
				}
			}
		},
		draw : function () {
			this.clean(this.ctx);
			for (var index in this.list) {
				this.list[index].draw(this.ctx,this.currentCamera);
			}
		},
		clean : function (ctx) {
			ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		},
		end : function (fps, panic) {
			if(panic){
				var discardedTime = Math.round(MainLoop.resetFrameDelta());
        console.warn('Main loop panicked, probably because the browser tab was put in the background. Discarding ' + discardedTime + 'ms');
			}
		},
		add : function (element) {
			this.list.push(element);
		},
		resize : function () {
			this.canvas.height = $.innerHeight;
			this.canvas.width = $.innerWidth;
		},
		setScene : function (scene) {
			this.currentScene = scene;
			this.list = scene.list;
		},
		init : function () {
			$.MainLoop.setUpdate(game.update.bind(this)).setDraw(game.draw.bind(this)).setEnd(game.end.bind(this)).start();
			$.addEventListener('resize',game.resize.bind(this));
			this.canvas = _.getElementById('canvas');
			this.ctx = this.canvas.getContext('2d');
			this.resize();
			this.setScene(new Scene(new Dimension(1000,1000)));
			this.currentCamera = new Camera(new Victor(),new Dimension(this.canvas.width,this.canvas.height));
			for(var index = 50; index > 1; index--){
				this.list.push(new Wall(new Victor(rnd(0,1000 / 10 -1)* 50,rnd(0,1000 / 10 -1)* 50),new Dimension(50,50),'green'));
			}
			this.events.add('keydown','move',function (event) {
				var index = this.directions.indexOf(event.keyCode);
				if(index !== -1){
					this.keypresses[index] = true;
				}
			}.bind(this));
			this.events.add('keyup','move',function (event) {
				var index = this.directions.indexOf(event.keyCode);
				if(index !== -1){
					this.keypresses[index] = false;
				}
			}.bind(this));
		}
	}
	$.onload = game.init.bind(game);

})(window,document);
